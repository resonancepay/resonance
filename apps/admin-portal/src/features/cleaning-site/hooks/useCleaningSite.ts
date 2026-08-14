import { useState } from "react";
import { useExportSites, useSites, useToggleSiteStatus } from "./site.hooks";
import { Site } from "../types/site.type";
import { useToast } from "@/shared/toast";
import { downloadCsv } from "@/shared/utils/download-csv";

export const useCleaningSiteScreen = () => {
  const { data, isLoading, isError } = useSites();
  const [addSiteOpen, setAddSiteOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [viewingSite, setViewingSite] = useState<Site | null>(null);
  const { addToast } = useToast();

  const {
    mutate: toggleStatus,
    isPending: isTogglingStatus,
    variables: togglingSite,
  } = useToggleSiteStatus();

  const { mutate: exportSitesMutate, isPending: isExporting } =
    useExportSites(
      (csv) => {
        downloadCsv(
          csv,
          `cleaning-sites-${new Date().toISOString().slice(0, 10)}.csv`,
        );
        addToast({
          variant: "success",
          title: "Export ready",
          description: "Your cleaning sites export has downloaded.",
        });
      },
      (e) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.";

        addToast({
          variant: "error",
          title: "Export failed",
          description: message,
        });
      },
    );

  const sites = data ?? [];

  const handleToggleSiteStatus = (site: Site) => {
    toggleStatus(site, {
      onSuccess: () => {
        addToast({
          variant: "success",
          title: site.is_active ? "Site suspended" : "Site activated",
          description: `${site.site_name} was ${
            site.is_active ? "suspended" : "activated"
          }.`,
        });
      },
      onError: (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.";

        addToast({
          variant: "error",
          title: "Could not update status",
          description: message,
        });
      },
    });
  };

  return {
    sites,
    isLoading,
    isError,
    count: sites.length,
    addSiteOpen,
    openAddSite: () => setAddSiteOpen(true),
    closeAddSite: () => setAddSiteOpen(false),
    editingSite,
    openEditSite: (site: Site) => setEditingSite(site),
    closeEditSite: () => setEditingSite(null),
    viewingSite,
    openViewSite: (site: Site) => setViewingSite(site),
    closeViewSite: () => setViewingSite(null),
    handleToggleSiteStatus,
    togglingSiteId: isTogglingStatus ? togglingSite?.site_id : null,
    handleExport: () => exportSitesMutate(),
    isExporting,
  };
};
