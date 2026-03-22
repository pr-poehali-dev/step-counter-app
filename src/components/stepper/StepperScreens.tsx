import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CircularProgress, BarChart } from "./StepperCharts";
import {
  weekData,
  monthData,
  achievements,
  friends,
  challenges,
  notificationsList,
  BarItem,
} from "./types";

export function HomeScreen() {
  const steps = 8742;
  const goal = 10000;
  const distance = (steps * 0.0008).toFixed(1);
  const calories = Math.floor(steps * 0.04);
  const minutes = Math.floor(steps / 100);
  const percent = Math.round((steps / goal) * 100);

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div>
          <div className="text-white/40 text-sm font-rubik">Добрый день,</div>
          <div className="text-xl font-bold font-golos">Александр 👋</div>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <Icon name="Bell" size={18} className="text-white/60" />
          </div>
          <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-neon-green border border-background" style={{ background: "#00f5a0" }} />
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="text-white/30 text-xs font-rubik uppercase tracking-widest">Воскресенье, 22 марта 2026</div>
      </div>

      <div className="flex justify-center animate-fade-up">
        <div className="relative">
          <div className="absolute inset-4 rounded-full blur-3xl opacity-20" style={{ background: "#00f5a0" }} />
          <CircularProgress value={steps} max={goal} />
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="flex justify-between text-xs text-white/40 font-rubik mb-2">
          <span>Прогресс дня</span>
          <span style={{ color: "#00f5a0" }}>{percent}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: `${percent}%`, background: "linear-gradient(90deg, #00f5a0, #a855f7)", transition: "width 1s ease-out" }} />
        </div>
        <div className="text-center mt-2 text-xs text-white/30 font-rubik">Осталось {(goal - steps).toLocaleString("ru")} шагов до цели</div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 mt-5">
        {[
          { icon: "MapPin", label: "Км", value: distance, color: "#3b82f6" },
          { icon: "Flame", label: "Ккал", value: calories, color: "#f97316" },
          { icon: "Clock", label: "Мин", value: minutes, color: "#a855f7" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4 flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1" style={{ background: `${stat.color}20` }}>
              <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
            </div>
            <div className="text-xl font-bold font-golos text-white">{stat.value}</div>
            <div className="text-[11px] text-white/40 font-rubik">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold font-golos">Эта неделя</span>
            <span className="text-xs text-white/40 font-rubik">Среднее: 8 524</span>
          </div>
          <BarChart data={weekData} maxSteps={13000} showDay />
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="glass rounded-2xl p-4" style={{ border: "1px solid rgba(0,245,160,0.15)" }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,245,160,0.1)" }}>
              <span className="text-lg">💡</span>
            </div>
            <div>
              <div className="text-sm font-semibold font-golos" style={{ color: "#00f5a0" }}>Умное напоминание</div>
              <div className="text-xs text-white/50 font-rubik mt-0.5">Вы близки к цели! Короткая прогулка в 15 минут поможет закрыть день на отлично.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoryScreen() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data: BarItem[] = period === "week" ? weekData : monthData.map(d => ({ ...d, day: String(d.day) }));
  const maxSteps = Math.max(...data.map(d => d.steps));
  const avg = Math.round(data.reduce((a, d) => a + d.steps, 0) / data.length);
  const best = maxSteps;
  const goalDays = data.filter(d => d.steps >= d.goal).length;

  return (
    <div className="flex flex-col pb-4 px-5">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-black font-golos">История</h1>
        <p className="text-white/40 text-sm font-rubik mt-0.5">Твоя активность</p>
      </div>

      <div className="glass rounded-2xl p-1 flex mb-5">
        {(["week", "month"] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className="flex-1 py-2 text-sm font-semibold font-rubik rounded-xl transition-all duration-300"
            style={{ background: period === p ? "#00f5a0" : "transparent", color: period === p ? "#111" : "rgba(255,255,255,0.4)" }}
          >
            {p === "week" ? "Неделя" : "Месяц"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Среднее", value: avg.toLocaleString("ru"), sub: "шагов/день" },
          { label: "Рекорд", value: best.toLocaleString("ru"), sub: "шагов" },
          { label: "Цели", value: `${goalDays}/${data.length}`, sub: "дней" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-3 text-center">
            <div className="text-base font-black font-golos" style={{ background: "linear-gradient(135deg,#00f5a0,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div className="text-[10px] text-white/30 font-rubik mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 mb-5">
        <div className="text-sm font-semibold font-golos mb-4">Активность</div>
        <BarChart data={data} maxSteps={maxSteps + 1000} showDay={period === "week"} />
        {period === "month" && (
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-white/30 font-rubik">1</span>
            <span className="text-[10px] text-white/30 font-rubik">11</span>
            <span className="text-[10px] text-white/30 font-rubik">22</span>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <span className="text-sm font-semibold font-golos">Подробно</span>
        </div>
        <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
          {[...data].reverse().map((d, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: d.steps >= d.goal ? "#00f5a0" : "rgba(255,255,255,0.15)" }} />
                <span className="text-sm font-rubik text-white/70">
                  {period === "week" ? String((d as BarItem).day ?? "") : `${String((d as BarItem).day ?? "")} марта`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-golos" style={{ color: d.steps >= d.goal ? "#00f5a0" : "white" }}>
                  {d.steps.toLocaleString("ru")}
                </span>
                {d.steps >= d.goal && <span className="text-xs" style={{ color: "#00f5a0" }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GoalsScreen() {
  const [goal, setGoal] = useState(10000);
  const goalOptions = [6000, 8000, 10000, 12000, 15000, 20000];
  const steps = 8742;
  const percent = Math.round((steps / goal) * 100);

  return (
    <div className="flex flex-col pb-4 px-5">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-black font-golos">Цели</h1>
        <p className="text-white/40 text-sm font-rubik mt-0.5">Персональный план</p>
      </div>

      <div className="glass rounded-3xl p-6 mb-5" style={{ border: "1px solid rgba(0,245,160,0.2)" }}>
        <div className="text-center mb-5">
          <div className="text-xs text-white/40 font-rubik uppercase tracking-widest mb-1">Ежедневная цель</div>
          <div className="text-5xl font-black font-golos" style={{ color: "#00f5a0", textShadow: "0 0 20px rgba(0,245,160,0.4)" }}>{goal.toLocaleString("ru")}</div>
          <div className="text-sm text-white/40 font-rubik">шагов</div>
        </div>
        <div className="flex justify-between text-xs text-white/40 font-rubik mb-2">
          <span>Сегодня</span>
          <span style={{ color: "#00f5a0" }}>{percent}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: `${Math.min(percent, 100)}%`, background: "linear-gradient(90deg,#00f5a0,#a855f7)" }} />
        </div>
        <div className="text-center mt-2 text-xs text-white/30 font-rubik">{steps.toLocaleString("ru")} из {goal.toLocaleString("ru")}</div>
      </div>

      <div className="glass rounded-2xl p-4 mb-5">
        <div className="text-sm font-semibold font-golos mb-4">Выбери цель</div>
        <div className="grid grid-cols-3 gap-2">
          {goalOptions.map((g) => (
            <button key={g} onClick={() => setGoal(g)}
              className="py-3 rounded-xl text-sm font-bold font-golos transition-all duration-200"
              style={{
                background: goal === g ? "#00f5a0" : "rgba(255,255,255,0.05)",
                color: goal === g ? "#111" : "rgba(255,255,255,0.5)",
                transform: goal === g ? "scale(1.04)" : "scale(1)",
                boxShadow: goal === g ? "0 0 20px rgba(0,245,160,0.3)" : "none",
              }}
            >
              {g >= 1000 ? `${g / 1000}к` : g}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mb-5">
        <div className="text-sm font-semibold font-golos mb-4">Дополнительные цели</div>
        <div className="space-y-4">
          {[
            { label: "Расстояние", value: "8.0 км", target: "10 км", icon: "MapPin", color: "#3b82f6", progress: 80 },
            { label: "Калории", value: "350 ккал", target: "500 ккал", icon: "Flame", color: "#f97316", progress: 70 },
            { label: "Активное время", value: "87 мин", target: "120 мин", icon: "Clock", color: "#a855f7", progress: 73 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}20` }}>
                <Icon name={item.icon} size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold font-rubik text-white/70">{item.label}</span>
                  <span className="text-xs text-white/40 font-rubik">{item.value} / {item.target}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4" style={{ border: "1px solid rgba(168,85,247,0.2)" }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <div className="text-sm font-semibold font-golos" style={{ color: "#a855f7" }}>Совет дня</div>
            <div className="text-xs text-white/50 font-rubik mt-1">Научные данные показывают, что 10 000 шагов в день снижают риск сердечно-сосудистых заболеваний на 40%.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementsScreen() {
  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);

  return (
    <div className="flex flex-col pb-4 px-5">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-black font-golos">Достижения</h1>
        <p className="text-white/40 text-sm font-rubik mt-0.5">{unlocked.length} из {achievements.length} разблокировано</p>
      </div>

      <div className="glass rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black font-golos" style={{ background: "linear-gradient(135deg,#00f5a0,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {unlocked.length}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold font-golos mb-1.5">Прогресс коллекции</div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${(unlocked.length / achievements.length) * 100}%`, background: "linear-gradient(90deg,#00f5a0,#a855f7)" }} />
            </div>
            <div className="text-xs text-white/30 font-rubik mt-1">{achievements.length - unlocked.length} ещё впереди</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/40 font-rubik uppercase tracking-widest mb-3">Получены</div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {unlocked.map((ach, i) => (
          <div key={ach.id} className="glass rounded-2xl p-4 animate-fade-up" style={{ border: "1px solid rgba(0,245,160,0.15)", animationDelay: `${i * 0.08}s` }}>
            <div className="text-3xl mb-2">{ach.icon}</div>
            <div className="text-sm font-bold font-golos" style={{ color: "#00f5a0" }}>{ach.title}</div>
            <div className="text-xs text-white/50 font-rubik mt-0.5">{ach.desc}</div>
            <div className="text-[10px] text-white/25 font-rubik mt-2">{ach.date}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-white/40 font-rubik uppercase tracking-widest mb-3">Впереди</div>
      <div className="grid grid-cols-2 gap-3">
        {locked.map((ach) => (
          <div key={ach.id} className="glass rounded-2xl p-4 opacity-40">
            <div className="text-3xl mb-2" style={{ filter: "grayscale(1)" }}>{ach.icon}</div>
            <div className="text-sm font-bold font-golos text-white/60">{ach.title}</div>
            <div className="text-xs text-white/40 font-rubik mt-0.5">{ach.desc}</div>
            <div className="mt-2"><Icon name="Lock" size={12} className="text-white/30" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialScreen() {
  const maxSteps = Math.max(...friends.map(f => f.steps));

  return (
    <div className="flex flex-col pb-4 px-5">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-black font-golos">Друзья</h1>
        <p className="text-white/40 text-sm font-rubik mt-0.5">Соревнуйся и побеждай</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden mb-5">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-semibold font-golos">Лидерборд</span>
          <span className="text-xs text-white/40 font-rubik">Сегодня</span>
        </div>
        {friends.map((f) => (
          <div key={f.id} className="flex items-center gap-3 px-4 py-3 border-b border-white/5" style={{ background: f.isMe ? "rgba(255,255,255,0.03)" : "transparent" }}>
            <div className="w-7 h-7 flex items-center justify-center text-xs font-black font-golos rounded-full shrink-0"
              style={{ background: f.rank === 1 ? "#f59e0b" : f.rank === 2 ? "#9ca3af" : f.rank === 3 ? "#f97316" : "rgba(255,255,255,0.1)", color: f.rank <= 3 ? "#111" : "rgba(255,255,255,0.4)" }}>
              {f.rank}
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-golos shrink-0" style={{ background: `${f.color}25`, color: f.color }}>
              {f.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold font-golos" style={{ color: f.isMe ? "#00f5a0" : "white" }}>
                {f.name}{f.isMe ? " ← вы" : ""}
              </div>
              <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full rounded-full" style={{ width: `${(f.steps / maxSteps) * 100}%`, background: f.color, transition: "width 1s ease-out" }} />
              </div>
            </div>
            <div className="text-sm font-bold font-golos text-white/80 shrink-0">{f.steps.toLocaleString("ru")}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-white/40 font-rubik uppercase tracking-widest mb-3">Челленджи</div>
      <div className="space-y-3 mb-5">
        {challenges.map((ch) => (
          <div key={ch.id} className="glass rounded-2xl p-4" style={{ border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-bold font-golos" style={{ color: "#a855f7" }}>{ch.title}</div>
                <div className="text-xs text-white/50 font-rubik mt-0.5">{ch.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 font-rubik">{ch.daysLeft} дн.</div>
                <div className="text-[10px] text-white/25 font-rubik">{ch.participants} чел.</div>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${ch.progress}%`, background: "linear-gradient(90deg,#a855f7,#ec4899)" }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-white/30 font-rubik">Прогресс</span>
              <span className="text-xs font-bold font-golos" style={{ color: "#a855f7" }}>{ch.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white/5" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
        <Icon name="Plus" size={16} className="text-white/40" />
        <span className="text-sm font-rubik text-white/40">Создать челлендж</span>
      </button>
    </div>
  );
}

export function SettingsScreen() {
  const [notifs, setNotifs] = useState(notificationsList);
  const [name, setName] = useState("Александр");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("180");

  return (
    <div className="flex flex-col pb-4 px-5">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-black font-golos">Настройки</h1>
        <p className="text-white/40 text-sm font-rubik mt-0.5">Профиль и уведомления</p>
      </div>

      <div className="glass rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(0,245,160,0.1)", boxShadow: "0 0 20px rgba(0,245,160,0.15)" }}>
            👤
          </div>
          <div>
            <div className="text-lg font-bold font-golos">{name}</div>
            <div className="text-xs text-white/40 font-rubik">Уровень: Активист</div>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-full" style={{ background: s <= 3 ? "#00f5a0" : "rgba(255,255,255,0.1)" }} />)}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Имя", value: name, setter: setName },
            { label: "Вес (кг)", value: weight, setter: setWeight },
            { label: "Рост (см)", value: height, setter: setHeight },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs text-white/40 font-rubik block mb-1">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm font-rubik text-white focus:outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden mb-5">
        <div className="p-4 border-b border-white/5">
          <div className="text-sm font-semibold font-golos">Умные напоминания</div>
          <div className="text-xs text-white/40 font-rubik mt-0.5">Когда напоминать о прогулке</div>
        </div>
        {notifs.map((n) => (
          <div key={n.id} className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: n.active ? "rgba(0,245,160,0.1)" : "rgba(255,255,255,0.05)" }}>
                <Icon name="Bell" size={14} style={{ color: n.active ? "#00f5a0" : "rgba(255,255,255,0.3)" }} />
              </div>
              <div>
                <div className="text-sm font-semibold font-golos">{n.time}</div>
                <div className="text-xs text-white/40 font-rubik">{n.text}</div>
              </div>
            </div>
            <button
              onClick={() => setNotifs(prev => prev.map(nn => nn.id === n.id ? { ...nn, active: !nn.active } : nn))}
              className="w-11 h-6 rounded-full relative transition-all duration-300"
              style={{ background: n.active ? "#00f5a0" : "rgba(255,255,255,0.1)" }}
            >
              <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300"
                style={{ left: n.active ? "calc(100% - 1.375rem)" : "2px" }} />
            </button>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {[
          { icon: "Shield", label: "Конфиденциальность", color: "#3b82f6" },
          { icon: "Share2", label: "Поделиться прогрессом", color: "#a855f7" },
          { icon: "Download", label: "Экспорт данных", color: "#f97316" },
          { icon: "HelpCircle", label: "Поддержка", color: "#ec4899" },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${item.color}20` }}>
                <Icon name={item.icon} size={15} style={{ color: item.color }} />
              </div>
              <span className="text-sm font-rubik text-white/80">{item.label}</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/25" />
          </div>
        ))}
      </div>
    </div>
  );
}
