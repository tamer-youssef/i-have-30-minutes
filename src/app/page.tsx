"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Task, tasks, Duration, Location, Goal } from "@/data/tasks";
import { dailyChallenges, getDailyChallengeIndex } from "@/data/dailies";
import { getRandomOption, findAnotherTask, handleFindTask, randomize, diceSymbols } from "@/lib/task-functions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const [diceSymbol, setDiceSymbol] = useState(getRandomOption(diceSymbols));
  const [dailyChallenge, setDailyChallenge] = useState("");

  useEffect(() => {
    setIsMounted(true);
    // Get today's challenge
    const today = new Date();
    const index = getDailyChallengeIndex(today, dailyChallenges.length);
    setDailyChallenge(dailyChallenges[index]);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex flex-col items-center justify-center fixed top-4 left-0 right-0 mx-auto px-4 sm:px-2 text-center text-muted-foreground">
        <div className="text-foreground">Today&apos;s Challenge</div>
        <div>{dailyChallenge}</div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-2">
        {selectedTask ? (
          <div className="w-full max-w-[480px] min-h-[480px] justify-center flex flex-col">
            <div className="space-y-6 sm:space-y-8">
              <Button 
                variant="secondary" 
                className="text-foreground text-sm rounded-none"
                onClick={() => setSelectedTask(null)}
              >
                ← Try again
              </Button>

              <p className="text-2xl sm:text-4xl min-h-[160px] flex items-center justify-center">{selectedTask.description}</p>

              <Button 
                className="w-full !py-6 text-md rounded-none"
                size="lg"
                onClick={(e) => findAnotherTask(e, tasks, minutes, location, goal, selectedTask, isTaskCycling, setIsTaskCycling, setSelectedTask)}
                disabled={isTaskCycling}
              >
                Give me another task ↻
              </Button>
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

              <Button 
                size="icon"
                variant="secondary"
                className="p-6 text-3xl sm:text-2xl rounded-none"
                disabled={isRandomizing}
                onClick={() => randomize(minutesOptions, locationOptions, goalOptions, isRandomizing, setIsRandomizing, setMinutes, setLocation, setGoal, setSelectedTask, setDiceSymbol)}
              >
                {diceSymbol}
              </Button>

              <Button 
                variant="default"
                size="lg"
                onClick={(e) => handleFindTask(e, tasks, minutes, location, goal, selectedTask, isTaskCycling, setIsTaskCycling, setSelectedTask)}
                className="flex-1 !p-6 text-md rounded-none"
              >
                Give me a task →
              </Button>

            </div>
          </div>
        )}
      </div>
      <footer className="flex flex-col items-center fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-muted-foreground">
        <div>Want to see something added? <Link href="https://linkedin.com/in/tamerable" className="text-foreground hover:underline">Text me!</Link></div>
        <div>I Have 30 Minutes | Built with ⚡️ by <Link href="https://tamerable.com" className="text-foreground hover:underline">Tamer</Link></div>
      </footer>
    </div>
  );
}
