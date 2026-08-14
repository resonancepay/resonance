"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Button, Container } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import { CleaningSiteFilterContent } from "../components/cleaning-site-filter-content";
import { AddSiteDrawer } from "../components/drawer/add-site-drawer";
import { EditSiteDrawer } from "../components/drawer/edit-site-drawer";
import { ViewSiteDrawer } from "../components/drawer/view-site-drawer";
import { CleaningSiteTable } from "../table/cleaning-site.table";
import { useCleaningSiteScreen } from "../hooks/useCleaningSite";

export const CleaningSiteScreen = () => {
  useSetBreadcrumb([{ label: "Cleaning Sites", href: "/cleaning-sites" }]);
  const {
    sites,
    isLoading,
    count,
    addSiteOpen,
    openAddSite,
    closeAddSite,
    editingSite,
    openEditSite,
    closeEditSite,
    viewingSite,
    openViewSite,
    closeViewSite,
    handleToggleSiteStatus,
    togglingSiteId,
    handleExport,
    isExporting,
  } = useCleaningSiteScreen();

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All cleaning sites"
        count={count}
        renderFilterContent={({ onCancel, onSave }) => (
          <CleaningSiteFilterContent onCancel={onCancel} onSave={onSave} />
        )}
        onExport={handleExport}
        isExporting={isExporting}
        extraAction={
          <Button
            leftIcon={<AddIcon className="text-inverted" size={16} />}
            onClick={openAddSite}
          >
            Add Site
          </Button>
        }
      />
      <Container className="flex-1 min-h-0">
        <CleaningSiteTable
          data={sites}
          isLoading={isLoading}
          onViewSite={openViewSite}
          onEditSite={openEditSite}
          onToggleStatus={handleToggleSiteStatus}
          togglingSiteId={togglingSiteId}
        />
      </Container>

      <AddSiteDrawer
        isOpen={addSiteOpen}
        onClose={closeAddSite}
        onSave={closeAddSite}
      />

      <EditSiteDrawer
        site={editingSite}
        onClose={closeEditSite}
        onSave={closeEditSite}
      />

      <ViewSiteDrawer site={viewingSite} onClose={closeViewSite} />
    </Container>
  );
};
