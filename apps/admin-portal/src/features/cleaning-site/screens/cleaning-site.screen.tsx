"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Button, Container } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import { CleaningSiteFilterContent } from "../components/cleaning-site-filter-content";
import { AddSiteDrawer } from "../components/drawer/add-site-drawer";
import { CleaningSiteTable } from "../table/cleaning-site.table";
import { useCleaningSiteScreen } from "../hooks/useCleaningSite";

export const CleaningSiteScreen = () => {
  useSetBreadcrumb([{ label: "Cleaning Sites", href: "/cleaning-sites" }]);
  const { sites, isLoading, count, addSiteOpen, openAddSite, closeAddSite } =
    useCleaningSiteScreen();

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All cleaning sites"
        count={count}
        renderFilterContent={({ onCancel, onSave }) => (
          <CleaningSiteFilterContent onCancel={onCancel} onSave={onSave} />
        )}
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
        <CleaningSiteTable data={sites} isLoading={isLoading} />
      </Container>

      <AddSiteDrawer
        isOpen={addSiteOpen}
        onClose={closeAddSite}
        onSave={closeAddSite}
      />
    </Container>
  );
};
