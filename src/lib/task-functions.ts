import { Task, Duration, Location, Goal } from "@/data/tasks";

export const getRandomOption = <T>(options: T[]): T => {
  return options[Math.floor(Math.random() * options.length)];
};

export const randomize = async (
  minutesOptions: Duration[],
  locationOptions: Location[],
  goalOptions: Goal[],
  isRandomizing: boolean,
  setIsRandomizing: (value: boolean) => void,
  setMinutes: (value: string) => void,
  setLocation: (value: Location) => void,
  setGoal: (value: Goal) => void,
  setSelectedTask: (task: Task | null) => void
) => {
  if (isRandomizing) return;
  setIsRandomizing(true);
  setSelectedTask(null);
  
  for (let i = 0; i < 7; i++) {
    await new Promise(resolve => setTimeout(resolve, 150));
    setMinutes(getRandomOption(minutesOptions).toString());
    setLocation(getRandomOption(locationOptions));
    setGoal(getRandomOption(goalOptions));
  }
  
  setIsRandomizing(false);
};

export const findTask = async (
  tasks: Task[],
  minutes: string,
  location: Location,
  goal: Goal,
  selectedTask: Task | null,
  isAnotherTask: boolean = false,
  isTaskCycling: boolean,
  setIsTaskCycling: (value: boolean) => void,
  setSelectedTask: (task: Task | null) => void
) => {
  if (isTaskCycling) return;
  setIsTaskCycling(true);

  const minutesNum = parseInt(minutes) as Duration;
  const allPossibleTasks = tasks.filter(task => 
    task.durations.includes(minutesNum) &&
    task.locations.includes(location) &&
    task.goals.includes(goal) &&
    task !== selectedTask // Exclude current task
  );

  if (isAnotherTask) {
    // Do visual cycling only when finding another task
    for (let i = 0; i < 7; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      if (allPossibleTasks.length === 0) {
        // If no exact match, find tasks that match at least 2 criteria
        const partialMatches = tasks.filter(task => {
          let matches = 0;
          if (task.durations.includes(minutesNum)) matches++;
          if (task.locations.includes(location)) matches++;
          if (task.goals.includes(goal)) matches++;
          return matches >= 2 && task !== selectedTask; // Exclude current task
        });
        if (partialMatches.length > 0) {
          setSelectedTask(getRandomOption(partialMatches));
        } else if (selectedTask) {
          // If no other tasks available, keep the current task
          setIsTaskCycling(false);
          return;
        }
      } else {
        setSelectedTask(getRandomOption(allPossibleTasks));
      }
    }
  } else {
    // Initial task selection - no animation
    if (allPossibleTasks.length === 0) {
      // If no exact match, find tasks that match at least 2 criteria
      const partialMatches = tasks.filter(task => {
        let matches = 0;
        if (task.durations.includes(minutesNum)) matches++;
        if (task.locations.includes(location)) matches++;
        if (task.goals.includes(goal)) matches++;
        return matches >= 2;
      });
      if (partialMatches.length > 0) {
        setSelectedTask(getRandomOption(partialMatches));
      }
    } else {
      setSelectedTask(getRandomOption(allPossibleTasks));
    }
  }
  
  setIsTaskCycling(false);
};

export const findAnotherTask = (
  e: React.MouseEvent<HTMLButtonElement>,
  tasks: Task[],
  minutes: string,
  location: Location,
  goal: Goal,
  selectedTask: Task | null,
  isTaskCycling: boolean,
  setIsTaskCycling: (value: boolean) => void,
  setSelectedTask: (task: Task | null) => void
) => {
  e.preventDefault();
  findTask(tasks, minutes, location, goal, selectedTask, true, isTaskCycling, setIsTaskCycling, setSelectedTask);
};

export const handleFindTask = (
  e: React.MouseEvent<HTMLButtonElement>,
  tasks: Task[],
  minutes: string,
  location: Location,
  goal: Goal,
  selectedTask: Task | null,
  isTaskCycling: boolean,
  setIsTaskCycling: (value: boolean) => void,
  setSelectedTask: (task: Task | null) => void
) => {
  e.preventDefault();
  findTask(tasks, minutes, location, goal, selectedTask, false, isTaskCycling, setIsTaskCycling, setSelectedTask);
}; 