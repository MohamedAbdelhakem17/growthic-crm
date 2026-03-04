import { useEffect, useRef, useState } from "react";

export default function CallCounter({ start }: { start: boolean }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!start) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setSeconds(0);
    };
  }, [start]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`font-mono text-3xl font-light my-3 px-8 py-4 rounded-2xl border-2 transition-colors duration-300 ${
        start
          ? "text-primary border-primary/30 bg-primary/5"
          : "text-muted-foreground border-border bg-accent/40"
      }`}
    >
      {formatTime(seconds)}
    </div>
  );
}
