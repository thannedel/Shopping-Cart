import { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

export const useLocalStorage = <T,>(key: string): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state, key]);

  return [state, setState];
};
