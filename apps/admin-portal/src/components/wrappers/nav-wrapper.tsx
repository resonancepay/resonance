"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { NavWrapperType } from "../component.type";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const NavWrapper = ({ item }: { item: NavWrapperType }) => {
  const Icon = item.icon;
  const pathname = usePathname();
  const hasSubItems = item.subItem.length > 0;
  const hasActiveSubItem = item.subItem.some((sub) => sub.href === pathname);
  const [expanded, setExpanded] = useState(hasActiveSubItem);

  // The sidebar persists across client-side navigations (it never
  // remounts), so `expanded`'s initial value only reflects the pathname at
  // first mount. Re-sync it whenever the route lands on one of this item's
  // sub-pages, so navigating between top-level sections doesn't leave a
  // previously-active submenu stuck open/highlighted.
  useEffect(() => {
    if (hasActiveSubItem) setExpanded(true);
  }, [hasActiveSubItem]);

  const isActive =
    !hasSubItems &&
    !!item.href &&
    (pathname === item.href || pathname.startsWith(`${item.href}/`));
  const highlighted = hasActiveSubItem || isActive;

  return (
    <Container className="mb-2">
      <Container
        as="button"
        type="button"
        onClick={() => (hasSubItems ? setExpanded((prev) => !prev) : item.clickAction())}
        className={[
          "w-full px-2 py-2.5 flex items-center gap-2 rounded-xl cursor-pointer",
          highlighted ? "bg-brand-bg-bold" : "",
        ].join(" ")}
      >
        <Icon size={20} className="text-brand-secondary-text-icons" />
        <Text
          variant="button"
          className={`flex-1 text-left ${highlighted ? "text-inverted" : "text-primary"}`}
        >
          {item.label}
        </Text>
        {hasSubItems && (
          <ChevronDownIcon
            size={16}
            className={highlighted ? "text-inverted" : "text-secondary"}
          />
        )}
      </Container>

      <AnimatePresence initial={false}>
        {hasSubItems && expanded && (
          <motion.div
            key="sub-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Container className="mt-2 flex flex-col gap-3 pl-9">
              {item.subItem.map((sub, index) => {
                const isActive = sub.href === pathname;

                return (
                  <Container
                    key={index}
                    as="button"
                    type="button"
                    onClick={sub.action}
                    className="flex items-center gap-2 text-left cursor-pointer"
                  >
                    <Container className="size-1.5 rounded-full bg-primary shrink-0" />
                    <Text
                      variant="button"
                      tone={isActive ? "primary" : "secondary"}
                    >
                      {sub.label}
                    </Text>
                  </Container>
                );
              })}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};
