"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { NavWrapperType } from "../component.type";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const NavWrapper = ({ item }: { item: NavWrapperType }) => {
  const Icon = item.icon;
  const [expanded, setExpanded] = useState(false);
  const hasSubItems = item.subItem.length > 0;

  return (
    <Container className="mb-2">
      <Container
        as="button"
        type="button"
        onClick={() => (hasSubItems ? setExpanded((prev) => !prev) : item.clickAction())}
        className={[
          "w-full px-2 py-2.5 flex items-center gap-2 rounded-xl cursor-pointer",
          expanded ? "bg-brand-bg-bold" : "",
        ].join(" ")}
      >
        <Icon size={20} className="text-brand-secondary-text-icons" />
        <Text
          variant="button"
          className={`flex-1 text-left ${expanded ? "text-inverted" : "text-primary"}`}
        >
          {item.label}
        </Text>
        {hasSubItems && (
          <ChevronDownIcon
            size={16}
            className={expanded ? "text-inverted" : "text-secondary"}
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
              {item.subItem.map((sub, index) => (
                <Container
                  key={index}
                  as="button"
                  type="button"
                  onClick={sub.action}
                  className="flex items-center gap-2 text-left cursor-pointer"
                >
                  <Container className="size-1.5 rounded-full bg-primary shrink-0" />
                  <Text variant="button" tone="primary">
                    {sub.label}
                  </Text>
                </Container>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};
