"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

interface CartItem {
  slug: string;
  name: string;
  edition: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  setQuantity: (slug: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const STORAGE_KEY = "archive-zero-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored) as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      count,
      subtotal,
      isDrawerOpen,
      addItem: (incoming) => {
        startTransition(() => {
          setItems((current) => {
            const existingIndex = current.findIndex(
              (item) => item.slug === incoming.slug && item.size === incoming.size && item.color === incoming.color
            );

            if (existingIndex === -1) {
              return [...current, incoming];
            }

            return current.map((item, index) =>
              index === existingIndex ? { ...item, quantity: item.quantity + incoming.quantity } : item
            );
          });
          setIsDrawerOpen(true);
        });
      },
      removeItem: (slug, size, color) => {
        startTransition(() => {
          setItems((current) =>
            current.filter((item) => !(item.slug === slug && item.size === size && item.color === color))
          );
        });
      },
      setQuantity: (slug, size, color, quantity) => {
        startTransition(() => {
          setItems((current) =>
            current.flatMap((item) => {
              if (item.slug !== slug || item.size !== size || item.color !== color) {
                return [item];
              }

              if (quantity <= 0) {
                return [];
              }

              return [{ ...item, quantity }];
            })
          );
        });
      },
      clear: () => {
        startTransition(() => {
          setItems([]);
        });
      },
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false)
    };
  }, [isDrawerOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
