import { ReactNode } from "react";

export type TagVariant =
  | "success"
  | "danger"
  | "warning"
  | "disabled"
  | "neutral"
  | "blue"
  | "indigo"
  | "pink"
  | "purple"
  | "gray"
  | "outline"
  | "persian-red"
  | "monostone"
  | "moss-green"
  | "mangenta";

export interface TagProps {
  label: string;
  variant?: TagVariant;
  // A custom icon renders inline as-is (e.g. a site icon on "outline"). Omit
  // it to get the variant's own built-in icon (if it has one, e.g. the
  // success check), shown inside a filled circle instead.
  icon?: ReactNode;
  // Swaps in a spinning icon inside the same filled-circle treatment as a
  // built-in icon — usable on any variant, not just the ones with a default.
  loading?: boolean;
  className?: string;
}
