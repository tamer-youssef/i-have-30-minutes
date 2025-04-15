"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Task, tasks, Duration, Location, Goal } from "@/data/tasks";
import { getRandomOption, findAnotherTask, handleFindTask, randomize } from "@/lib/task-functions";

export default function Home() {
  const minutesOptions: Duration[] = [5, 10, 15, 30];
  const locationOptions: Location[] = ["work", "home", "the gym", "school"];
  const goalOptions: Goal[] = ["energize", "relax", "focus", "learn"];

  const [minutes, setMinutes] = useState<string>(getRandomOption(minutesOptions).toString());
  const [location, setLocation] = useState<Location>(getRandomOption(locationOptions));
  const [goal, setGoal] = useState<Goal>(getRandomOption(goalOptions));
  const [isMounted, setIsMounted] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskCycling, setIsTaskCycling] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-2">
        {selectedTask ? (
          <div className="w-full max-w-[480px] min-h-[480px] justify-center flex flex-col">
            <div className="space-y-6 sm:space-y-8">

              <button 
                onClick={() => setSelectedTask(null)} 
                className="text-sm bg-muted-foreground/20 text-foreground px-4 py-2 rounded-none hover:bg-foreground/30 transition-colors"
              >
                ← Try again
              </button>

              <p className="text-2xl sm:text-4xl min-h-[200px] flex items-center justify-center">{selectedTask.description}</p>

              <button 
                onClick={(e) => findAnotherTask(e, tasks, minutes, location, goal, selectedTask, isTaskCycling, setIsTaskCycling, setSelectedTask)}
                disabled={isTaskCycling}
                className="bg-foreground w-full text-background px-6 py-3 rounded-none font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                Give me another task ↻
              </button>

            </div>
          </div>
        ) : (
          <div className="w-full max-w-[480px]">
            <div className="text-2xl sm:text-4xl text-muted-foreground">
              I have{""}
              <Select value={minutes} onValueChange={setMinutes}>
                <SelectTrigger className="inline-flex text-foreground p-0 mx-2 sm:mx-4 border-0 !border-b-2 !border-blue-500 hover:!bg-blue-500/30 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:!border-blue-500 active:!border-blue-500 text-2xl sm:text-4xl bg-transparent [&>span]:!bg-transparent transition-colors [&>button]:!bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background rounded-none text-2xl sm:text-4xl">
                  {minutesOptions.map((num) => (
                    <SelectItem 
                      key={num} 
                      value={num.toString()}
                      className="text-xl sm:text-2xl hover:!bg-blue-500/30 data-[state=checked]:!bg-blue-500/30"
                    >
                      {num.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {""}minutes
            </div>

            <div className="text-2xl sm:text-4xl text-muted-foreground">
              at{""}
              <Select value={location} onValueChange={(value: string) => setLocation(value as Location)}>
                <SelectTrigger className="inline-flex text-foreground p-0 ml-2 sm:ml-4 border-0 !border-b-2 !border-green-500 hover:!bg-green-500/30 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:!border-green-500 active:!border-green-500 text-2xl sm:text-4xl bg-transparent [&>span]:!bg-transparent transition-colors [&>button]:!bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background rounded-none text-2xl sm:text-4xl">
                  {locationOptions.map((location) => (
                    <SelectItem 
                      key={location} 
                      value={location}
                      className="text-xl sm:text-2xl hover:!bg-green-500/30 data-[state=checked]:!bg-green-500/30"
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-2xl sm:text-4xl text-muted-foreground">
              and want to{""}
              <Select value={goal} onValueChange={(value: string) => setGoal(value as Goal)}>
                <SelectTrigger className="inline-flex text-foreground p-0 ml-2 sm:ml-4 border-0 !border-b-2 !border-purple-500 hover:!bg-purple-500/30 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:!border-purple-500 active:!border-purple-500 text-2xl sm:text-4xl bg-transparent [&>span]:!bg-transparent transition-colors [&>button]:!bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background rounded-none text-2xl sm:text-4xl">
                  {goalOptions.map((goal) => (
                    <SelectItem 
                      key={goal} 
                      value={goal}
                      className="text-xl sm:text-2xl hover:!bg-purple-500/30 data-[state=checked]:!bg-purple-500/30"
                    >
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-row justify-between gap-2 mt-6 sm:mt-8">
              <button 
                onClick={() => randomize(minutesOptions, locationOptions, goalOptions, isRandomizing, setIsRandomizing, setMinutes, setLocation, setGoal, setSelectedTask)}
                disabled={isRandomizing}
                className="bg-foreground/20 text-foreground px-6 py-3 rounded-none font-medium hover:bg-foreground/30 transition-colors disabled:opacity-50 w-12 flex items-center justify-center"
              >
                ↻
              </button>
              <button 
                onClick={(e) => handleFindTask(e, tasks, minutes, location, goal, selectedTask, isTaskCycling, setIsTaskCycling, setSelectedTask)}
                className="bg-foreground text-background px-6 py-3 rounded-none font-medium hover:bg-foreground/90 transition-colors flex-1"
              >
                Give me a task →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
