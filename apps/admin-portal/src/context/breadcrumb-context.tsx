"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbContextValue {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setTitle: (title: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbsState] = useState<BreadcrumbItem[]>([]);
  const [title, setTitleState] = useState("");

  const setBreadcrumbs = useCallback((items: BreadcrumbItem[]) => {
    setBreadcrumbsState(items);
  }, []);

  const setTitle = useCallback((value: string) => {
    setTitleState(value);
  }, []);

  const value = useMemo(
    () => ({ breadcrumbs, title, setBreadcrumbs, setTitle }),
    [breadcrumbs, title, setBreadcrumbs, setTitle],
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbContext(): BreadcrumbContextValue {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) {
    throw new Error(
      "useBreadcrumbContext must be used inside <BreadcrumbProvider>",
    );
  }
  return ctx;
}
