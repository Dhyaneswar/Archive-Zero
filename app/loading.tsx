export default function Loading() {
  return (
    <div className="page-section">
      <div className="glass-panel rounded-[2rem] p-8 md:p-10">
        <p className="editorial-kicker">Loading / Archive Zero</p>
        <h2 className="editorial-heading mt-4">Entering the archive.</h2>
        <div className="mt-8 h-px w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-bronze" />
        </div>
      </div>
    </div>
  );
}
