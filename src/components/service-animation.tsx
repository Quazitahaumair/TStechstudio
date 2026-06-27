import type { Service } from "@/data/services";

/**
 * Pure CSS-driven animated "models" that visually represent each service.
 * No external libraries — all keyframes live in styles.css.
 */

function BrowserAnim() {
  return (
    <div className="relative h-full w-full rounded-xl border border-border bg-secondary/40 p-3">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-2/3 overflow-hidden rounded bg-brand/30">
          <div className="h-full w-full animate-[shimmer_2s_linear_infinite] bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--brand)_60%,transparent),transparent)] bg-[length:200%_100%]" />
        </div>
        <div className="h-2 w-full rounded bg-muted-foreground/20" />
        <div className="h-2 w-5/6 rounded bg-muted-foreground/20" />
        <div className="mt-3 flex gap-2">
          <span className="inline-block h-6 w-20 rounded-md bg-gradient-brand" />
          <span className="inline-block h-6 w-2 self-center animate-[caret-blink_1s_steps(1)_infinite] bg-brand" />
        </div>
      </div>
    </div>
  );
}

function PhoneAnim() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-float relative h-40 w-24 rounded-[1.4rem] border-2 border-border bg-secondary/50 p-2 shadow-glow">
        <div className="mx-auto mb-2 h-1.5 w-8 rounded-full bg-muted-foreground/40" />
        <div className="space-y-1.5">
          <div className="h-10 rounded-lg bg-gradient-brand" />
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-7 rounded-md bg-muted-foreground/15"
                style={{ animation: `pulse-soft 2.4s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignAnim() {
  return (
    <div className="relative grid h-full w-full grid-cols-2 grid-rows-2 gap-2 rounded-xl border border-border bg-secondary/40 p-3">
      {["bg-brand/40", "bg-teal/40", "bg-muted-foreground/20", "bg-brand/25"].map((c, i) => (
        <div
          key={i}
          className={`rounded-lg ${c}`}
          style={{ animation: `pulse-soft 3s ease-in-out ${i * 0.3}s infinite` }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-float rounded-md border-2 border-teal bg-background" />
    </div>
  );
}

function RocketAnim() {
  return (
    <div className="flex h-full w-full items-end justify-center gap-2 rounded-xl border border-border bg-secondary/40 p-4">
      {[0.2, 0.5, 0.35, 0.7, 0.45].map((_, i) => (
        <div
          key={i}
          className="w-4 origin-bottom rounded-t bg-gradient-brand"
          style={{
            height: "100%",
            animation: `bar-grow 1.8s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
      <span className="ml-1 animate-float text-2xl">🚀</span>
    </div>
  );
}

function BrandAnim() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-border bg-secondary/40">
      <div className="animate-spin-slow absolute h-28 w-28 rounded-full border border-dashed border-brand/50" />
      <div
        className="absolute h-20 w-20 rounded-full border border-dashed border-teal/50"
        style={{ animation: "spin-slow 10s linear infinite reverse" }}
      />
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-lg font-bold text-brand-foreground shadow-glow">
        TS
      </div>
    </div>
  );
}

function NetworkAnim() {
  const nodes = [
    [20, 30],
    [80, 25],
    [50, 55],
    [25, 80],
    [78, 78],
  ];
  return (
    <div className="relative h-full w-full rounded-xl border border-border bg-secondary/40">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {[
          [0, 2],
          [1, 2],
          [2, 3],
          [2, 4],
          [0, 1],
        ].map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="color-mix(in oklab, var(--brand) 50%, transparent)"
            strokeWidth="0.7"
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{ animation: `dash 1.6s ease-out ${i * 0.2}s forwards` }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.2"
            fill="var(--teal)"
            style={{ animation: `pulse-soft 2.4s ease-in-out ${i * 0.25}s infinite` }}
          />
        ))}
      </svg>
    </div>
  );
}

const MAP = {
  browser: BrowserAnim,
  phone: PhoneAnim,
  design: DesignAnim,
  rocket: RocketAnim,
  brand: BrandAnim,
  network: NetworkAnim,
} as const;

export function ServiceAnimation({
  type,
  className = "",
}: {
  type: Service["animation"];
  className?: string;
}) {
  const Comp = MAP[type];
  return (
    <div className={`h-44 w-full ${className}`}>
      <Comp />
    </div>
  );
}
