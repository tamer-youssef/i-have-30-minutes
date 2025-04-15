export type Duration = 5 | 10 | 15 | 30;
export type Location = "work" | "home" | "the gym" | "school";
export type Goal = "energize" | "relax" | "focus" | "learn";

export type Task = {
  description: string;
  durations: Duration[];
  locations: Location[];
  goals: Goal[];
};

export const tasks: Task[] = [
  // 5-minute tasks
  {
    description: "Do 3 sets of 20 jumping jacks",
    durations: [5],
    locations: ["work", "school", "home"],
    goals: ["energize", "focus"]
  },
  {
    description: "Watch the first search result for 'TED-Ed' on YouTube",
    durations: [5],
    locations: ["work", "school", "home", "the gym"],
    goals: ["learn"]
  },
  {
    description: "Write down 3 must-do for tomorrow, and 1 thing you're looking forward to",
    durations: [5],
    locations: ["work", "school"],
    goals: ["focus", "learn"]
  },
  {
    description: "Play today's Wordle, try to solve it under 4 guesses",
    durations: [5],
    locations: ["home", "work", "school", "the gym"],
    goals: ["focus", "learn"]
  },
  {
    description: "Clean up 3 items from your workspace",
    durations: [5, 10, 15],
    locations: ["home", "work"],
    goals: ["relax", "focus"]
  },

  // 10-minute tasks
  {
    description: "Grab a snack you've never tried before from the nearest supermarket",
    durations: [10, 15],
    locations: ["work", "school", "the gym"],
    goals: ["energize", "focus"]
  },
  {
    description: "Brew yourself a cup of coffee",
    durations: [5, 10],
    locations: ["home", "work"],
    goals: ["energize", "focus"]
  },

  // 15-minute tasks
  {
    description: "Complete a Wim Hof breathing session",
    durations: [10, 15],
    locations: ["home", "work", "school"],
    goals: ["energize", "focus"]
  },
  {
    description: "Do 3 sets of pushups, squats, and planks",
    durations: [15],
    locations: ["the gym", "home"],
    goals: ["energize"]
  },

  // 30-minute tasks
  {
    description: "Text a friend and ask them what they did today",
    durations: [15, 30],
    locations: ["work", "school", "home"],
    goals: ["focus", "relax"]
  },
  {
    description: "Pick a random person and make them your imaginary rival for the session",
    durations: [30],
    locations: ["the gym"],
    goals: ["focus", "energize"]
  },
  {
    description: "Cook a meal you haven't made before",
    durations: [30],
    locations: ["home"],
    goals: ["learn", "relax"]
  },
  {
    description: "Watch a YouTube crime documentary",
    durations: [30],
    locations: ["home", "work", "school"],
    goals: ["learn", "relax"]
  },
  {
    description: "Write a 3-minute motivational speech then record yourself delivering it",
    durations: [30],
    locations: ["home"],
    goals: ["learn", "energize"]
  },
]; 