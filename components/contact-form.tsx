"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-6 lg:border-l lg:border-white/20 lg:pl-10 relative before:hidden lg:before:block before:absolute before:left-0 before:top-0 before:w-4 before:h-[1px] before:bg-signal after:hidden lg:after:block after:absolute after:left-0 after:bottom-0 after:w-4 after:h-[1px] after:bg-white/20"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <input className="lux-input" placeholder="Name" aria-label="Name" />
        <input className="lux-input" placeholder="Email" type="email" aria-label="Email" />
      </div>
      <input className="lux-input" placeholder="Subject" aria-label="Subject" />
      <textarea className="lux-textarea min-h-40" placeholder="Message" aria-label="Message" />
      <button type="submit" className="button-primary w-full">
        {submitted ? "Message Held" : "Send Inquiry"}
      </button>
      <p className="text-sm leading-7 text-fog/72">
        {submitted
          ? "Your note is held with the archive. Expect a considered reply."
          : "Press inquiries, wholesale conversations, and archive questions are welcomed."}
      </p>
    </form>
  );
}
