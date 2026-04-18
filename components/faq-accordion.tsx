"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/site-data";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <article key={item.question} className="border-b border-white/10 overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left hover:text-signal transition-colors"
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/90">{item.question}</span>
              <span className="text-signal font-mono">{open ? "[ - ]" : "[ + ]"}</span>
            </button>
            <div className={`faq-answer ${open ? "is-open" : ""}`}>
              <p className="pb-6 text-sm leading-7 text-fog/90 max-w-3xl border-l-[1px] border-signal/40 pl-4">{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
