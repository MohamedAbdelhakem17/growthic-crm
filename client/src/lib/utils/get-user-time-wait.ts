export type WaitVariant = "success" | "warning" | "destructive";

export interface WaitResult {
  minutes: number;
  variant: WaitVariant;
}

export function getUserTimeWait(isoTime: string): WaitResult {
  const start = new Date(isoTime).getTime();
  const now = Date.now();
  const minutes = Math.floor((now - start) / 1000 / 60);

  let variant: WaitVariant;
  if (minutes <= 10) {
    variant = "success";
  } else if (minutes <= 15) {
    variant = "warning";
  } else {
    variant = "destructive";
  }

  return { minutes, variant };
}
