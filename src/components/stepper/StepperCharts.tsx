import { BarItem } from "./types";

export function CircularProgress({ value, max, size = 240 }: { value: number; max: number; size?: number }) {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5a0" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={12} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-black font-golos" style={{ color: "#00f5a0", textShadow: "0 0 20px rgba(0,245,160,0.5)", lineHeight: 1 }}>
          {value.toLocaleString("ru")}
        </div>
        <div className="text-sm text-white/40 mt-1 font-rubik">шагов сегодня</div>
        <div className="text-xs text-white/25 mt-0.5 font-rubik">цель {max.toLocaleString("ru")}</div>
      </div>
    </div>
  );
}

export function BarChart({ data, maxSteps, showDay }: {
  data: BarItem[];
  maxSteps: number;
  showDay?: boolean;
}) {
  return (
    <div className="flex items-end gap-1 h-28">
      {data.map((item, i) => {
        const pct = Math.min(item.steps / maxSteps, 1) * 100;
        const isGoal = item.steps >= item.goal;
        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${Math.max(pct, 3)}%`,
                  background: isGoal
                    ? "linear-gradient(180deg, #00f5a0 0%, rgba(0,245,160,0.2) 100%)"
                    : "linear-gradient(180deg, rgba(168,85,247,0.7) 0%, rgba(168,85,247,0.15) 100%)",
                  animation: `barGrow 0.5s ease-out ${i * 0.04}s both`,
                  transformOrigin: "bottom",
                }}
              />
            </div>
            {showDay && <span className="text-[9px] text-white/30 font-rubik mt-1">{String(item.day ?? "")}</span>}
          </div>
        );
      })}
    </div>
  );
}
