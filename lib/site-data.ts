export type ProductStatus = "current" | "archived" | "upcoming";
export type ProductCategory = "hoodie" | "crewneck" | "tee" | "sweatpants";

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  dropNumber: number;
  dropName: string;
  emotion: string;
  price: number;
  edition: string;
  status: ProductStatus;
  category: ProductCategory;
  palette: string[];
  sizes: string[];
  description: string;
  story: string;
  scarcityNote: string;
  fit: string;
  materials: string[];
  care: string[];
  trust: string[];
  images: {
    primary: string;
    secondary: string;
    gallery: string[];
  };
}

export interface Drop {
  number: number;
  name: string;
  emotion: string;
  status: "released" | "current" | "locked";
  summary: string;
  palette: string;
  popupDescription: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LookbookScene {
  ambientLabel: string;
  callouts: Array<{
    align?: "left" | "right";
    from: { x: number; y: number };
    label: string;
    to: { x: number; y: number };
    via: { x: number; y: number };
  }>;
  caption: string;
  chapter: string;
  eyebrow: string;
  id: string;
  image: string;
  metrics: string[];
  narrative: string;
  title: string;
}

export const navItems = [
  { href: "/shop", label: "Current Drop" },
  { href: "/archive", label: "Archive" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
] as const;

export const heroScenes = {
  home: "/images/pexels-atahandemir-10848147.jpg",
  freedom: "/images/pexels-lureofadventure-10762295.jpg",
  archive: "/images/pexels-nikita-vinogradov-135942982-10289628.jpg",
  craft: "/images/pexels-psrvsky-pi-54155085-30005323.jpg"
} as const;

export const products: Product[] = [
  {
    slug: "prologue-hoodie",
    name: "Prologue Hoodie",
    shortName: "Hoodie",
    dropNumber: 0,
    dropName: "Prologue",
    emotion: "Unfinished Becoming",
    price: 280,
    edition: "017 / 500",
    status: "current",
    category: "hoodie",
    palette: ["Bone", "Taupe", "Washed Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A heavyweight opening statement cut with sculptural ease, dense rib structure, and an intentionally quiet finish.",
    story: "Drop 0 is the first breath of Archive Zero. It does not arrive loud. It opens in restraint: unfinished edges, soft weight, and the feeling of standing in motion before language catches up.",
    scarcityNote: "500 pieces only. Once this chapter closes, it becomes archive and never returns.",
    fit: "Relaxed through the body with a dropped shoulder and a measured cropped hem for architectural drape.",
    materials: [
      "450 GSM / 13.5 oz brushed cotton fleece",
      "Dense rib cuffs and hem with structured recovery",
      "Double-layer hood with weighted fall"
    ],
    care: [
      "Wash cold with similar neutrals",
      "Lay flat or tumble low to protect the hand-feel",
      "Steam lightly to restore drape"
    ],
    trust: [
      "Edition-numbered interior label",
      "Cut and sewn in limited production",
      "Archive card and care slip included"
    ],
    images: {
      primary: "/images/pexels-gasparzaldo-8484771.jpg",
      secondary: "/images/pexels-robshumski-6102505.jpg",
      gallery: [
        "/images/pexels-gasparzaldo-8484771.jpg",
        "/images/pexels-robshumski-6102505.jpg",
        "/images/pexels-psrvsky-pi-54155085-30005323.jpg"
      ]
    }
  },
  {
    slug: "longing-crewneck",
    name: "Longing Crewneck",
    shortName: "Crewneck",
    dropNumber: 1,
    dropName: "Longing",
    emotion: "Distance With Warmth",
    price: 240,
    edition: "101 / 500",
    status: "upcoming",
    category: "crewneck",
    palette: ["Dusty Plum", "Faded Burgundy", "Stone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A dense crewneck shaped by distance, softness, and a held romantic gravity.",
    story: "Longing sits one chapter beyond Prologue. The surface stays controlled while the color carries the ache.",
    scarcityNote: "Not yet released. Join the waitlist to receive first notice when this emotion opens.",
    fit: "Relaxed boxy silhouette with a slightly raised neck and weighted sleeve volume.",
    materials: [
      "430 GSM brushed cotton loopback",
      "Garment dyed for tonal depth",
      "Interior numbering patch"
    ],
    care: [
      "Wash cold inside out",
      "Dry low or line dry",
      "Do not bleach"
    ],
    trust: [
      "Limited-run manufacturing ledger",
      "Edition number assignment at fulfillment",
      "Future archive registration"
    ],
    images: {
      primary: "/images/pexels-lureofadventure-10762295.jpg",
      secondary: "/images/pexels-nikita-vinogradov-135942982-10289628.jpg",
      gallery: [
        "/images/pexels-lureofadventure-10762295.jpg",
        "/images/pexels-nikita-vinogradov-135942982-10289628.jpg",
        "/images/pexels-psrvsky-pi-54155085-30005323.jpg"
      ]
    }
  },
  {
    slug: "rage-tee",
    name: "Rage Tee",
    shortName: "Tee",
    dropNumber: 2,
    dropName: "Rage",
    emotion: "Controlled Force",
    price: 120,
    edition: "322 / 500",
    status: "archived",
    category: "tee",
    palette: ["Burnt Black", "Oxblood", "Rust"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A dense premium jersey tee with weight, dry hand, and a precise box cut.",
    story: "Rage is not noise. It is containment. The silhouette stays exact while the color absorbs the heat.",
    scarcityNote: "Archived. Released once and held permanently in the timeline.",
    fit: "Boxy body with a compact collar and dropped sleeve.",
    materials: [
      "280 GSM heavyweight jersey",
      "Compact neckline rib",
      "Pigment-dyed finish"
    ],
    care: [
      "Machine wash cold",
      "Dry low",
      "Avoid high heat pressing"
    ],
    trust: [
      "Sold-out archive entry",
      "Edition identifier kept in the archive ledger",
      "No restock policy"
    ],
    images: {
      primary: "/images/pexels-atahandemir-10848147.jpg",
      secondary: "/images/pexels-psrvsky-pi-54155085-30005323.jpg",
      gallery: [
        "/images/pexels-atahandemir-10848147.jpg",
        "/images/pexels-psrvsky-pi-54155085-30005323.jpg",
        "/images/pexels-nikita-vinogradov-135942982-10289628.jpg"
      ]
    }
  },
  {
    slug: "clarity-sweatpant",
    name: "Clarity Sweatpant",
    shortName: "Sweatpant",
    dropNumber: 6,
    dropName: "Clarity",
    emotion: "Quiet Resolve",
    price: 220,
    edition: "013 / 500",
    status: "upcoming",
    category: "sweatpants",
    palette: ["Warm Stone", "Smoke", "Bone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A precision-cut sweatpant with volume through the leg and a calm, grounded finish.",
    story: "Clarity strips away noise. It lands in stillness, weight, and a silhouette that feels settled.",
    scarcityNote: "Locked in the timeline until Drop 6 opens.",
    fit: "Relaxed leg with a tuned ankle and structured seat.",
    materials: [
      "430 GSM fleece",
      "Waxed drawcord hardware in muted bronze",
      "Edition patch at the interior waistband"
    ],
    care: [
      "Wash cold",
      "Line dry for best structure",
      "Steam to recover the silhouette"
    ],
    trust: [
      "Future release reservation available",
      "Edition cap fixed at 500",
      "Craft notes included"
    ],
    images: {
      primary: "/images/pexels-zkadoshi-36085970.jpg",
      secondary: "/images/pexels-jsantiagoph-33557391.jpg",
      gallery: [
        "/images/pexels-zkadoshi-36085970.jpg",
        "/images/pexels-jsantiagoph-33557391.jpg",
        "/images/pexels-psrvsky-pi-54155085-30005323.jpg"
      ]
    }
  }
];

export const drops: Drop[] = [
  { number: 0, name: "Prologue", emotion: "Becoming", status: "current", summary: "The archive begins in restraint.", palette: "Bone / Taupe / Washed Charcoal", popupDescription: "Drop 0 is the prologue — the opening breath before the emotional arc begins. Heavyweight cotton fleece, sculptural drape, and numbered scarcity. This is not trend. This is the first artifact." },
  { number: 1, name: "Longing", emotion: "Distance", status: "locked", summary: "Soft warmth held at arm's length.", palette: "Dusty Plum / Faded Burgundy", popupDescription: "Longing captures the ache of distance. Garment-dyed loopback fleece in plum and burgundy tones. 500 pieces. The color carries what words fail to hold." },
  { number: 2, name: "Rage", emotion: "Force", status: "released", summary: "Dense heat, contained within exact form.", palette: "Oxblood / Rust / Burnt Black", popupDescription: "Rage is not noise — it is containment. Pigment-dyed heavyweight jersey with a precise box cut. This drop has closed permanently and lives only in the archive." },
  { number: 3, name: "Revenge", emotion: "Afterimage", status: "locked", summary: "A sharper silhouette with colder restraint.", palette: "Wine / Iron / Smoke", popupDescription: "Revenge arrives in sharper lines and cooler temperatures. The silhouette tightens. The palette turns metallic. 500 numbered pieces when it opens." },
  { number: 4, name: "Grief", emotion: "Weight", status: "locked", summary: "Lower light, longer hems, slower movement.", palette: "Ash / Bone / Espresso", popupDescription: "Grief lowers the hemline and deepens the weight. Heavier fabrics, slower construction, longer silhouettes. This is the heaviest chapter in the arc." },
  { number: 5, name: "Silence", emotion: "Pause", status: "locked", summary: "Muted volume and stripped-back detail.", palette: "Stone / Fog / Cocoa", popupDescription: "Silence removes everything unnecessary. Stripped-back details, muted colorways, and the quietest construction in the archive. 500 pieces of absolute stillness." },
  { number: 6, name: "Clarity", emotion: "Resolve", status: "locked", summary: "Precise lines and grounded proportion.", palette: "Warm Stone / Smoke", popupDescription: "Clarity arrives after the storm. Clean construction, precise proportions, and warm neutral tones. The arc begins to resolve." },
  { number: 7, name: "Peace", emotion: "Release", status: "locked", summary: "Open structure and expanded space.", palette: "Ivory / Sand / Soft Taupe", popupDescription: "Peace opens the structure. Wider cuts, lighter weights, expanded space between seams. The archive breathes for the first time." },
  { number: 8, name: "Rebirth", emotion: "Return", status: "locked", summary: "Light returns with sharper contrast.", palette: "Champagne / Plum / Bone", popupDescription: "Rebirth marks the return of contrast. Lighter fabrication meets sharper tailoring. The archive remembers everything it carried and begins again." },
  { number: 9, name: "The Unknown", emotion: "End", status: "locked", summary: "The final chapter. The archive closes itself deliberately.", palette: "Obsidian / Fog / Bronze", popupDescription: "The Unknown is the final drop. The archive closes itself intentionally. The last 500 pieces carry the defining truth: You are who you define yourself to be." }
];

export const faqItems: FaqItem[] = [
  {
    question: "What makes each drop limited?",
    answer: "Every emotion is released once. Each drop is capped at 500 pieces and never reproduced after it closes."
  },
  {
    question: "Are the garments numbered?",
    answer: "Yes. Every piece carries its edition number and is recorded as part of the archive sequence."
  },
  {
    question: "What is Drop 0?",
    answer: "Drop 0 is the prologue. It opens the archive with a feedback-led release before the emotional arc moves forward."
  },
  {
    question: "Will sold out drops return?",
    answer: "No. Once a drop sells through, it remains archive only."
  },
  {
    question: "What does THE UNKNOWN mean?",
    answer: "The Unknown is the final chapter. It marks the intentional ending of the brand after the tenth and last drop."
  },
  {
    question: "How does sizing work?",
    answer: "Each product page includes exact fit notes, intended silhouette, and the size range available for that chapter."
  },
  {
    question: "How should I care for the garments?",
    answer: "Cold wash, low agitation, and lower heat are recommended to protect weight, drape, and pigment depth."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes. International shipping availability and delivery windows are shown at checkout."
  },
  {
    question: "What happens when the brand ends?",
    answer: "Archive Zero closes intentionally. The final drop completes the sequence, and the archive remains as a finite body of work."
  }
];

export const lookbookScenes: LookbookScene[] = [
  {
    id: "threshold",
    chapter: "Act I / Threshold",
    eyebrow: "Scene 01 / First Contact",
    title: "The garment enters like weather before it reads like product.",
    narrative:
      "We begin in air, distance, and silence. The frame opens slowly, the silhouette arrives without rush, and Archive Zero feels less like a store than a world you cross into.",
    caption: "Freedom is introduced as space, horizon, and a body moving without performance.",
    ambientLabel: "Open horizon / low wind / bronze light",
    image: "/images/lookbook-coast.png",
    metrics: [
      "Slow shutter reveal over the full viewport",
      "Parallax depth keeps the body ahead of the sky",
      "Typography arrives after the image, never before it"
    ],
    callouts: [
      {
        label: "Silhouette entry point",
        from: { x: 13, y: 27 },
        via: { x: 26, y: 31 },
        to: { x: 46, y: 47 }
      },
      {
        label: "Wind line across hem",
        from: { x: 84, y: 24 },
        via: { x: 74, y: 36 },
        to: { x: 58, y: 64 },
        align: "right"
      }
    ]
  },
  {
    id: "inspection",
    chapter: "Act II / Inspection",
    eyebrow: "Scene 02 / Material Memory",
    title: "The camera closes in until stitching, weight, and numbering become the story.",
    narrative:
      "This is the tactile chapter. Cloth is treated like evidence. The tracking lines move with intention, mapping the exact points where construction turns into meaning.",
    caption: "Luxury becomes believable when the surface can hold scrutiny without losing emotion.",
    ambientLabel: "Macro texture / low contrast / tactile shadow",
    image: "/images/product-closeup.png",
    metrics: [
      "Drawn schematic lines target seams and archive markers",
      "Backdrop blur panels float above UHD texture",
      "Copy transitions feel measured rather than theatrical"
    ],
    callouts: [
      {
        label: "Numbered edition marker",
        from: { x: 18, y: 22 },
        via: { x: 30, y: 26 },
        to: { x: 44, y: 40 }
      },
      {
        label: "Weighted seam construction",
        from: { x: 82, y: 33 },
        via: { x: 68, y: 39 },
        to: { x: 54, y: 56 },
        align: "right"
      }
    ]
  },
  {
    id: "drift",
    chapter: "Act III / Drift",
    eyebrow: "Scene 03 / Movement Study",
    title: "Motion takes over and the garment starts speaking through drape, not description.",
    narrative:
      "Now the page moves with the body. The image glides deeper than the interface, the copy feels suspended, and the whole sequence behaves like a scene from a campaign film instead of a gallery wall.",
    caption: "The product stops posing and begins to move through atmosphere.",
    ambientLabel: "Urban drift / softened reflections / suspended tempo",
    image: "/images/product-hoodie.png",
    metrics: [
      "Foreground copy glides separately from the background scene",
      "Shadows and highlights move like a slow camera track",
      "Glass metadata stays present without boxing the composition"
    ],
    callouts: [
      {
        label: "Drape release across shoulder",
        from: { x: 12, y: 29 },
        via: { x: 28, y: 38 },
        to: { x: 48, y: 45 }
      },
      {
        label: "Volume carried through sleeve",
        from: { x: 86, y: 20 },
        via: { x: 70, y: 34 },
        to: { x: 60, y: 58 },
        align: "right"
      }
    ]
  },
  {
    id: "archive",
    chapter: "Act IV / Archive",
    eyebrow: "Scene 04 / Final Registration",
    title: "What remains is not just a look, but an object entering the archive with intention.",
    narrative:
      "The last scene slows down and holds the subject in stillness. After movement comes memory. After desire comes record. Archive Zero closes every frame as if it might be the last time it appears.",
    caption: "Rarity becomes emotional when the story ends deliberately.",
    ambientLabel: "Still portrait / ceremonial light / final hold",
    image: "/images/archive-portrait.png",
    metrics: [
      "The ending scene favors stillness over spectacle",
      "The final copy settles into a clean, controlled hold",
      "Every motion cue resolves toward memory and closure"
    ],
    callouts: [
      {
        label: "Archive registration focus",
        from: { x: 17, y: 20 },
        via: { x: 32, y: 28 },
        to: { x: 50, y: 40 }
      },
      {
        label: "Collector-grade finish",
        from: { x: 83, y: 28 },
        via: { x: 70, y: 39 },
        to: { x: 61, y: 64 },
        align: "right"
      }
    ]
  }
];

export const manifestoQuotes = [
  "You are who you define yourself to be.",
  "Finite garments for infinite states.",
  "What the archive keeps becomes part of the self."
];

export const waitlistBenefits = [
  "Early notice before each drop opens",
  "Access to future edition reservations",
  "Release letters and archive notes"
];

export const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" }
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getRelatedProducts(product: Product) {
  return products.filter((candidate) => candidate.slug !== product.slug).slice(0, 3);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}
