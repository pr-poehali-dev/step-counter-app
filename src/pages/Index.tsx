import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab, NAV_ITEMS } from "@/components/stepper/types";
import {
  HomeScreen,
  HistoryScreen,
  GoalsScreen,
  AchievementsScreen,
  SocialScreen,
  SettingsScreen,
} from "@/components/stepper/StepperScreens";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");

  const screens: Record<Tab, JSX.Element> = {
    home: <HomeScreen />,
    history: <HistoryScreen />,
    goals: <GoalsScreen />,
    achievements: <AchievementsScreen />,
    social: <SocialScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Атмосферные градиенты */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#00f5a0" }} />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#a855f7" }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ background: "#3b82f6" }} />
      </div>

      <div className="w-full max-w-md relative">
        <style>{`
          @keyframes barGrow {
            from { transform: scaleY(0); opacity: 0; }
            to { transform: scaleY(1); opacity: 1; }
          }
          .animate-fade-up {
            animation: fadeUp 0.4s ease-out both;
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .text-neon-green { color: #00f5a0; }
        `}</style>

        {/* Контент */}
        <div key={tab} className="overflow-y-auto animate-fade-up" style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "100px" }}>
          {screens[tab]}
        </div>

        {/* Нижняя навигация */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-3 pb-3">
          <div className="rounded-2xl px-2 py-2" style={{ background: "rgba(20,22,30,0.85)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-around">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200"
                  style={{ background: tab === item.id ? "rgba(0,245,160,0.1)" : "transparent" }}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    style={{ color: tab === item.id ? "#00f5a0" : "rgba(255,255,255,0.3)" }}
                  />
                  <span className="text-[9px] font-rubik font-medium" style={{ color: tab === item.id ? "#00f5a0" : "rgba(255,255,255,0.25)" }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
