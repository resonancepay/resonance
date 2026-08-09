import { useState } from "react";
import { useSites } from "./site.hooks";

export const useCleaningSiteScreen = () => {
  const { data, isLoading, isError } = useSites();
  const [addSiteOpen, setAddSiteOpen] = useState(false);

  const sites = data ?? [];

  return {
    sites,
    isLoading,
    isError,
    count: sites.length,
    addSiteOpen,
    openAddSite: () => setAddSiteOpen(true),
    closeAddSite: () => setAddSiteOpen(false),
  };
};
