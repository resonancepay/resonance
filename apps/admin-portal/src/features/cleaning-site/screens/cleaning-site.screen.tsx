"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Button, Container } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import { useState } from "react";
import { CleaningSiteFilterContent } from "../components/cleaning-site-filter-content";
import { AddSiteDrawer } from "../components/drawer/add-site-drawer";
import { CleaningSiteTable } from "../table/cleaning-site.table";

export const CleaningSiteScreen = () => {
  useSetBreadcrumb([{ label: "Cleaning Sites", href: "/cleaning-sites" }]);
  const [addSiteOpen, setAddSiteOpen] = useState(false);

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All cleaning sites"
        count={12}
        renderFilterContent={({ onCancel, onSave }) => (
          <CleaningSiteFilterContent onCancel={onCancel} onSave={onSave} />
        )}
        extraAction={
          <Button
            leftIcon={<AddIcon className="text-inverted" size={16} />}
            onClick={() => setAddSiteOpen(true)}
          >
            Add Site
          </Button>
        }
      />
      <Container className="flex-1 min-h-0">
        <CleaningSiteTable />
      </Container>

      <AddSiteDrawer
        isOpen={addSiteOpen}
        onClose={() => setAddSiteOpen(false)}
        onSave={() => setAddSiteOpen(false)}
      />
    </Container>
  );
};
