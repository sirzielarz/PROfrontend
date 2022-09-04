import { SetStateAction, useEffect, useState } from "react";

function useLoading(loading: boolean, delay = 500) {
  const [isLoading, setIsLoading] = useState(loading);

  useEffect((): any => {
    return setTimeout(() => setIsLoading(true), delay);
  }, [loading]);

  return isLoading;
}
declare function setTimeout(handler: () => void, timeout: number): number;
declare function setTimeout<Args extends any[]>(
  handler: (...args: Args) => void,
  timeout?: number,
  ...args: Args
): number;
