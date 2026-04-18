export function EditionBadge({ eyebrow, value }: { eyebrow: string; value: string }) {
  return (
    <div className="text-right">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-fog/40">{eyebrow}</p>
      <p className="font-mono text-xl text-bone mt-1">{value}</p>
    </div>
  );
}
