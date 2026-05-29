export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Base colour */}
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 107, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 107, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Top radial blue glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(45, 107, 255, 0.14) 0%, transparent 65%)",
        }}
      />

      {/* Bottom subtle gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(7, 10, 15, 0.8), transparent)",
        }}
      />
    </div>
  );
}
