import { ComponentType } from "react";
import { Container } from "../container";
import { Text } from "../text";
import {
  DangerIcon,
  InactiveIcon,
  PendingIcon,
  RetryIcon,
  SuccessIcon,
} from "../../icons";
import { TagProps, TagVariant } from "./tag.types";

interface VariantConfig {
  bg: string;
  text: string;
  border?: string;
  // Literal Tailwind class strings only — Tailwind's scanner needs these to
  // appear as-is in source, so they can't be built from the other fields at
  // runtime (see the same note in table-status.tsx).
  iconBg: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
}

const VARIANT_CONFIG: Record<TagVariant, VariantConfig> = {
  success: {
    bg: "bg-success-bg-light",
    text: "text-success-text-icons",
    iconBg: "bg-success-text-icons",
    icon: SuccessIcon,
  },
  danger: {
    bg: "bg-danger-bg-light",
    text: "text-danger-text-icons",
    iconBg: "bg-danger-text-icons",
    icon: DangerIcon,
  },
  warning: {
    bg: "bg-warning-bg-light",
    text: "text-warning-text-icons",
    iconBg: "bg-warning-text-icons",
    icon: PendingIcon,
  },
  disabled: {
    bg: "bg-muted",
    text: "text-secondary",
    iconBg: "bg-secondary",
    icon: InactiveIcon,
  },
  neutral: {
    bg: "bg-yinmn-blue-bg-light",
    text: "text-yinmn-blue-text-icons",
    iconBg: "bg-yinmn-blue-text-icons",
    icon: InactiveIcon,
  },
  blue: {
    bg: "bg-blue-bg-light",
    text: "text-blue-text-icons",
    iconBg: "bg-blue-text-icons",
  },
  indigo: {
    bg: "bg-indigo-bg-light",
    text: "text-indigo-text-icons",
    iconBg: "bg-indigo-text-icons",
  },
  pink: {
    bg: "bg-pink-bg-light",
    text: "text-pink-text-icons",
    iconBg: "bg-pink-text-icons",
  },
  purple: {
    bg: "bg-purple-bg-light",
    text: "text-purple-text-icons",
    iconBg: "bg-purple-text-icons",
  },
  gray: {
    bg: "bg-muted",
    text: "text-secondary",
    iconBg: "bg-secondary",
  },
  outline: {
    bg: "bg-surface",
    text: "text-primary",
    border: "border border-border",
    iconBg: "bg-primary",
  },
  "persian-red": {
    bg: "bg-persian-red-bg-light",
    text: "text-persian-red-text-icons",
    iconBg: "bg-persian-red-text-icons",
  },
  monostone: {
    bg: "bg-monostone-bg-light",
    text: "text-monostone-text-icons",
    iconBg: "bg-monostone-text-icons",
  },
  "moss-green": {
    bg: "bg-moss-green-bg-light",
    text: "text-moss-green-text-icons",
    iconBg: "bg-moss-green-text-icons",
  },
  mangenta: {
    bg: "bg-mangenta-bg-light",
    text: "text-mangenta-text-icons",
    iconBg: "bg-mangenta-text-icons",
  },
};

export function Tag({
  label,
  variant = "gray",
  icon,
  loading,
  className,
}: TagProps) {
  const config = VARIANT_CONFIG[variant];
  const DefaultIcon = config.icon;

  const builtInIcon = loading ? (
    <RetryIcon size={10} className="text-inverted animate-spin" />
  ) : DefaultIcon ? (
    <DefaultIcon size={10} className="text-inverted" />
  ) : null;

  // A caller-supplied icon renders plain (it carries its own color); a
  // built-in or loading icon renders inside a filled circle of the
  // variant's own color.
  const iconNode = icon ?? builtInIcon;
  const isBuiltIn = !icon && builtInIcon;

  return (
    <Container
      className={[
        "inline-flex items-center rounded-full gap-1",
        iconNode ? "pl-1 pr-2.5 py-px" : "px-2.5 py-1",
        config.bg,
        config.border,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {iconNode &&
        (isBuiltIn ? (
          <Container
            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${config.iconBg}`}
          >
            {iconNode}
          </Container>
        ) : (
          <Container className="flex items-center shrink-0">
            {iconNode}
          </Container>
        ))}
      <Text variant="buttonXS" className={config.text}>
        {label}
      </Text>
    </Container>
  );
}
