"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Clock,
  MessageCircle,
  Zap,
  X,
  TimerReset,
  MessagesSquare,
} from "lucide-react";
import get from "lodash.get";

/* -------------------------------------------------------------------------- */
/*                               STATIC CONTENT                               */
/* -------------------------------------------------------------------------- */
const QUOTES = [
  "The journey of a thousand miles begins with one step.",
  "What you do today can improve all your tomorrows.",
  "Dreams don't work unless you do.",
  "Discipline is choosing between what you want now and what you want most.",
  "Your only limit may be your mind.",
  "Do something today that your future self will thank you for.",
  "Great things never come from comfort zones.",
  "The harder the battle, the sweeter the victory.",
  "Push yourself because no one else is going to do it for you.",
  "Wake up. Work hard. Repeat.",
];

const JOKES = [
  "Why do programmers mix up Halloween and Christmas? Oct 31 = Dec 25.",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
];

const STORIES = [
  "A developer coded 1 hour daily for 365 days. Year 1: basic apps. Year 2: full SaaS. Year 3: 6-figure business.",
];

const WORDS_OF_DAY = [
  {
    word: "Iterate",
    meaning: "Repeat to improve",
    example: "Ship fast, iterate faster.",
  },
  {
    word: "Optimize",
    meaning: "Make best use",
    example: "Optimize your focus daily.",
  },
  {
    word: "Refactor",
    meaning: "Improve structure",
    example: "Refactor your process.",
  },
];

/* -------------------------------------------------------------------------- */

interface TrackerProps {
  sessionId?: string;
}

export default function MotivationalTracker({
  sessionId = "default",
}: TrackerProps) {
  const STORAGE_KEY = `motivational-tracker-${sessionId}`;

  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [lastGreeted, setLastGreeted] = useState<Date | null>(null);
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"quote" | "joke" | "story">(
    "quote",
  );
  const [wordOfDay, setWordOfDay] = useState(WORDS_OF_DAY[0]);

  // useEffect(() => {
  //   const TAB_ID = crypto.randomUUID();

  //   // Register tab
  //   const register = () => {
  //     const tabs = JSON.parse(sessionStorage.getItem("openTabs") || "[]");
  //     tabs.push(TAB_ID);
  //     sessionStorage.setItem("openTabs", JSON.stringify(tabs));
  //   };

  //   // Unregister tab
  //   const unregister = () => {
  //     const tabs = JSON.parse(sessionStorage.getItem("openTabs") || "[]");
  //     const newTabs = tabs.filter((id: string) => id !== TAB_ID);

  //     if (newTabs.length === 0) {
  //       // ⭐ Last tab closed → full reset
  //       sessionStorage.removeItem(STORAGE_KEY);
  //       sessionStorage.removeItem("openTabs");
  //     } else {
  //       sessionStorage.setItem("openTabs", JSON.stringify(newTabs));
  //     }
  //   };

  //   register();
  //   window.addEventListener("beforeunload", unregister);
  //   return () => window.removeEventListener("beforeunload", unregister);
  // }, [sessionId]);

  /* --------------------------- LOAD FROM LOCALSTORAGE --------------------------- */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setSessionStartTime(data.sessionStartTime || Date.now());
        setSessionSeconds(
          Math.floor(
            (Date.now() - (data.sessionStartTime || Date.now())) / 1000,
          ),
        );
        setLastGreeted(data.lastGreeted ? new Date(data.lastGreeted) : null);
        setContent(data.content || "");
        setContentType(data.contentType || "quote");
        setShowContent(data.showContent || false);
        setIsVisible(data.isVisible !== false);
        setWordOfDay(data.wordOfDay || WORDS_OF_DAY[0]);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [STORAGE_KEY]);

  /* --------------------------- AUTO SAVE --------------------------- */
  useEffect(() => {
    const interval = setInterval(
      () => {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            sessionStartTime,
            sessionSeconds,
            lastGreeted: lastGreeted?.toISOString(),
            content,
            contentType,
            showContent,
            isVisible,
            wordOfDay,
          }),
        );
      },
      2 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [
    STORAGE_KEY,
    sessionStartTime,
    sessionSeconds,
    lastGreeted,
    content,
    contentType,
    showContent,
    isVisible,
    wordOfDay,
  ]);

  /* --------------------------- SAVE ON CLOSE --------------------------- */
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          sessionStartTime,
          sessionSeconds,
          lastGreeted: lastGreeted?.toISOString(),
          content,
          contentType,
          showContent,
          isVisible,
          wordOfDay,
        }),
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [
    STORAGE_KEY,
    sessionStartTime,
    sessionSeconds,
    lastGreeted,
    content,
    contentType,
    showContent,
    isVisible,
    wordOfDay,
  ]);

 
  const getRandomContent = useCallback(() => {
    const type = ["quote", "joke", "story"][
      Math.floor(Math.random() * 3)
    ] as typeof contentType;
  
    setContentType(type);
  
    if (type === "quote")
      return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    if (type === "joke")
      return JOKES[Math.floor(Math.random() * JOKES.length)];
  
    return STORIES[Math.floor(Math.random() * STORIES.length)];
  }, []);  

  const showMotivation = useCallback(() => {
    setIsVisible(true);
    setShowContent(true);
    setLastGreeted(new Date());
    setContent(getRandomContent());
    setWordOfDay(
      WORDS_OF_DAY[Math.floor(Math.random() * WORDS_OF_DAY.length)]
    );
  }, [getRandomContent]);  

   /* --------------------------- TIMER --------------------------- */
   useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    const firstMotivation = setTimeout(() => {
      if (!lastGreeted) showMotivation();
    }, 30_000);

    const motivationInterval = setInterval(() => showMotivation(), 600_000);

    return () => {
      clearInterval(timer);
      clearInterval(motivationInterval);
      clearTimeout(firstMotivation);
    };
  }, [sessionStartTime, lastGreeted, showMotivation]);

  const resetSession = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSessionStartTime(Date.now());
    setSessionSeconds(0);
    setLastGreeted(null);
    setContent("");
    setShowContent(false);
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const nextGreetingSeconds = 600 - (sessionSeconds % 600);
  const progress = ((600 - nextGreetingSeconds) / 600) * 100;

  if (!isVisible) return null;

  return (
    <div className="xs:right-4 xs:w-80 from-primary/10 to-secondary/10 dark:bg-card/80 animate-in slide-in-from-bottom-4 fixed right-0 bottom-4 z-50 w-full rounded-2xl border border-gray-300 bg-gradient-to-br p-0 shadow-2xl backdrop-blur-sm duration-500 sm:right-6 sm:bottom-6 dark:border-gray-700">
      {/* Header */}
      <div className="rounded-t-2xl border-b bg-white/60 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/60">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/50 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 dark:border-emerald-900/50 dark:from-emerald-700/40 dark:to-blue-700/40">
              <Clock className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                Code Chisel
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {formatTime(sessionSeconds)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-lg p-1 transition hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Next Motivation</span>
            <span>{Math.floor(nextGreetingSeconds / 60)}m</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-300/40 dark:bg-gray-700/50">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-1000 dark:from-emerald-400 dark:to-blue-500"
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      {showContent && lastGreeted && (
        <div className="no-scrollbar max-h-64 overflow-y-auto bg-white/60 p-4 backdrop-blur-sm dark:bg-gray-900/40">
          <div className="mb-3 flex items-start gap-2">
            <MessagesSquare className="text-primary mt-1 h-5 w-5" />
            <div className="flex-1">
              <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 px-2 py-1 text-xs font-bold text-emerald-800 uppercase dark:from-emerald-700/40 dark:to-blue-700/40 dark:text-emerald-200">
                {contentType === "quote"
                  ? "💡 Quote"
                  : contentType === "joke"
                    ? "😂 Joke"
                    : "📖 Story"}
              </span>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              &quot;{content}&ldquo;
              </p>
            </div>
          </div>

          {/* Productivity */}
          <div className="mt-3 rounded-xl border border-emerald-200/50 bg-gradient-to-r from-emerald-50/80 to-blue-50/80 p-3 dark:border-emerald-800/50 dark:from-emerald-900/30 dark:to-blue-900/30">
            <div className="mb-1 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                Productivity Boost
              </span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              {sessionSeconds >= 600
                ? "🎉 10-minute streak! Keep it up!"
                : sessionSeconds >= 300
                  ? "⚡ 5-minute focus achieved!"
                  : "🚀 Stay focused for next reward!"}
            </p>
          </div>

          {/* Word of Day */}
          <div className="mt-4 border-t border-gray-300/40 pt-3 dark:border-gray-700/40">
            <span className="text-xs font-bold text-orange-700 uppercase dark:text-orange-300">
              Word of Day
            </span>
            <div className="mt-1 space-y-1 text-xs">
              <div className="font-bold text-orange-900 dark:text-orange-200">
                {wordOfDay.word}
              </div>
              <div className="text-gray-700 italic dark:text-gray-400">
              &quot;{wordOfDay.meaning}&ldquo;
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-200">
                → {wordOfDay.example}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {showContent && (
        <div className="flex flex-col gap-2 rounded-b-2xl border-t border-gray-300 bg-gray-100/70 p-3 sm:flex-row sm:gap-1 dark:border-gray-700 dark:bg-gray-800/70">
          <button
            onClick={resetSession}
            className="flex flex-1 items-center justify-center space-x-1 rounded-lg bg-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
          >
            <TimerReset className="h-4 w-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => showMotivation()}
            className="from-primary dark:from-primary flex-1 rounded-lg bg-gradient-to-r to-purple-600 px-2 py-1.5 text-xs font-bold text-white dark:to-purple-600"
          >
            ✨ New
          </button>
        </div>
      )}
    </div>
  );
}
