export type Tab = "home" | "history" | "goals" | "achievements" | "social" | "settings";

export interface BarItem {
  day?: string | number;
  steps: number;
  goal: number;
}

export const weekData: BarItem[] = [
  { day: "Пн", steps: 8420, goal: 10000 },
  { day: "Вт", steps: 11250, goal: 10000 },
  { day: "Ср", steps: 6800, goal: 10000 },
  { day: "Чт", steps: 9300, goal: 10000 },
  { day: "Пт", steps: 12100, goal: 10000 },
  { day: "Сб", steps: 7600, goal: 10000 },
  { day: "Вс", steps: 4200, goal: 10000 },
];

export const monthData: BarItem[] = [
  { day: 1, steps: 9200, goal: 10000 }, { day: 2, steps: 7800, goal: 10000 },
  { day: 3, steps: 11400, goal: 10000 }, { day: 4, steps: 6500, goal: 10000 },
  { day: 5, steps: 10200, goal: 10000 }, { day: 6, steps: 8900, goal: 10000 },
  { day: 7, steps: 12300, goal: 10000 }, { day: 8, steps: 5600, goal: 10000 },
  { day: 9, steps: 9800, goal: 10000 }, { day: 10, steps: 7200, goal: 10000 },
  { day: 11, steps: 11100, goal: 10000 }, { day: 12, steps: 8400, goal: 10000 },
  { day: 13, steps: 10600, goal: 10000 }, { day: 14, steps: 6100, goal: 10000 },
  { day: 15, steps: 9500, goal: 10000 }, { day: 16, steps: 13200, goal: 10000 },
  { day: 17, steps: 7700, goal: 10000 }, { day: 18, steps: 10900, goal: 10000 },
  { day: 19, steps: 8300, goal: 10000 }, { day: 20, steps: 11600, goal: 10000 },
  { day: 21, steps: 5900, goal: 10000 }, { day: 22, steps: 8742, goal: 10000 },
];

export const achievements = [
  { id: 1, icon: "🏃", title: "Первый шаг", desc: "1 000 шагов", unlocked: true, date: "1 марта" },
  { id: 2, icon: "🔥", title: "На разогреве", desc: "5 000 шагов за день", unlocked: true, date: "5 марта" },
  { id: 3, icon: "⚡", title: "Молния", desc: "10 000 шагов за день", unlocked: true, date: "12 марта" },
  { id: 4, icon: "🎯", title: "В цель", desc: "7 дней подряд", unlocked: true, date: "18 марта" },
  { id: 5, icon: "🏆", title: "Чемпион", desc: "30 дней подряд", unlocked: false, date: "" },
  { id: 6, icon: "🌙", title: "Ночной бегун", desc: "Шаги после 22:00", unlocked: false, date: "" },
  { id: 7, icon: "🌍", title: "Путешественник", desc: "100 км за месяц", unlocked: false, date: "" },
  { id: 8, icon: "💎", title: "Легенда", desc: "365 дней подряд", unlocked: false, date: "" },
];

export const friends = [
  { id: 1, name: "Алексей К.", avatar: "АК", steps: 9850, rank: 1, color: "#f97316", isMe: false },
  { id: 2, name: "Мария С.", avatar: "МС", steps: 9200, rank: 2, color: "#a855f7", isMe: false },
  { id: 3, name: "Вы", avatar: "ВЫ", steps: 8742, rank: 3, color: "#00f5a0", isMe: true },
  { id: 4, name: "Дмитрий П.", avatar: "ДП", steps: 7100, rank: 4, color: "#3b82f6", isMe: false },
  { id: 5, name: "Анна В.", avatar: "АВ", steps: 5430, rank: 5, color: "#ec4899", isMe: false },
];

export const challenges = [
  { id: 1, title: "Неделя актива", desc: "70 000 шагов за 7 дней", progress: 62, participants: 12, daysLeft: 3 },
  { id: 2, title: "Утренние прогулки", desc: "Шагать до 9:00 — 5 дней", progress: 80, participants: 8, daysLeft: 2 },
];

export const notificationsList = [
  { id: 1, time: "09:00", text: "Время двигаться! Уже 9 утра", active: true },
  { id: 2, time: "12:00", text: "Обеденная прогулка поможет достичь цели", active: true },
  { id: 3, time: "18:00", text: "Вечерняя прогулка — отличная идея!", active: false },
  { id: 4, time: "21:00", text: "Итоги дня — проверь прогресс", active: true },
];

export const NAV_ITEMS: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "history", icon: "BarChart2", label: "История" },
  { id: "goals", icon: "Target", label: "Цели" },
  { id: "achievements", icon: "Award", label: "Награды" },
  { id: "social", icon: "Users", label: "Друзья" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];
