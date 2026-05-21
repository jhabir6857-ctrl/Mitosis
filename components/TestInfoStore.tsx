"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type LastVisited = "costs" | "preparation" | null;

interface TestInfoStore {
  lastVisited: LastVisited;
  setLastVisited: (page: "costs" | "preparation") => void;
}

const TestInfoContext = createContext<TestInfoStore>({
  lastVisited: null,
  setLastVisited: () => {},
});

const STORAGE_KEY = "mitosis_last_test_page";

export function TestInfoStoreProvider({ children }: { children: React.ReactNode }) {
  const [lastVisited, setLastVisitedState] = useState<LastVisited>(null);

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LastVisited;
      if (stored === "costs" || stored === "preparation") {
        setLastVisitedState(stored);
      }
    } catch {}
  }, []);

  const setLastVisited = useCallback((page: "costs" | "preparation") => {
    setLastVisitedState(page);
    try {
      localStorage.setItem(STORAGE_KEY, page);
    } catch {}
  }, []);

  return (
    <TestInfoContext.Provider value={{ lastVisited, setLastVisited }}>
      {children}
    </TestInfoContext.Provider>
  );
}

export function useTestInfoStore() {
  return useContext(TestInfoContext);
}

/** Returns the OPPOSITE of what was last visited — the "suggested next" page */
export function useSuggestedNext(): "costs" | "preparation" {
  const { lastVisited } = useTestInfoStore();
  return lastVisited === "costs" ? "preparation" : "costs";
}
