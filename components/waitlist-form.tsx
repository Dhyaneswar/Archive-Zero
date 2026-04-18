"use client";

import { useState } from "react";
import { waitlistBenefits } from "@/lib/site-data";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="border-t border-signal/30 pt-8 mt-8">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="editorial-kicker">// Join the Archive</p>
          <h2 className="editorial-heading mt-4">First access on every drop. No noise. No spam.</h2>
          <ul className="mt-6 space-y-3">
            {waitlistBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 font-mono text-[0.7rem] text-fog/60">
                <span className="text-signal">›</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-mono text-signal text-sm tracking-widest uppercase">// Access Granted</p>
              <p className="mt-3 text-fog/60 text-sm">You will be notified before each drop opens.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                className="lux-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="button-primary w-full"
                onClick={() => { if (email) setSubmitted(true); }}
              >
                Request Access ›››
              </button>
              <p className="font-mono text-[0.58rem] text-fog/30 text-center tracking-wider">
                No spam. Drop notifications only. Leave anytime.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
