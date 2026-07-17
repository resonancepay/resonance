"use client";

import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumbContext } from "./breadcrumb-context";

export function useSetBreadcrumb(breadcrumbs: BreadcrumbItem[], title?: string) {
  const { setBreadcrumbs, setTitle } = useBreadcrumbContext();
  const key = JSON.stringify(breadcrumbs);
  const resolvedTitle = title ?? breadcrumbs[breadcrumbs.length - 1]?.label ?? "";

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
    setTitle(resolvedTitle);
    return () => {
      setBreadcrumbs([]);
      setTitle("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, resolvedTitle, setBreadcrumbs, setTitle]);
}
