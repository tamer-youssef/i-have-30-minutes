// Simple hash function to convert date to a number between 0 and length-1
export const getDailyChallengeIndex = (date: Date, length: number) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // Create a unique number for each day
    const dayNumber = year * 10000 + month * 100 + day;
    return dayNumber % length;
  };

export const dailyChallenges = [
  "Use your non-dominant hand for something you normally do (e.g., brushing teeth)",
  "Go the entire day without using social media",
  "Commute a different way than you usually do",
  "Tip your delivery guy more than you usually do",
  "Turn off dark mode on your mobile device",
  "Make a playlist with songs you’ve never heard before, based only on titles.",
  "Eat without YouTube, TikTok, or Instagram for the day",
  "Take a new profile picture",
  "Write down a decision you’ve been avoiding; make the decision today",
  "Do whatever you want today, maybe come up with your own challenge?",
  "Hide a small note with a kind message for someone to find later.",
  "Let someone else choose what you eat today",
  "Ask someone what they were doing at your age",
  "Take a boring photo and try to make it look cinematic",
  "Write an email to yourself 1 year from today",
  "Unsubscribe from emails you mark as read",
  "Wear that one pair of shoes that's been collecting dust",
]; 