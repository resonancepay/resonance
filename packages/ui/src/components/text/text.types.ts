import { ComponentPropsWithoutRef, ElementType } from "react";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "bodyLarge"
  | "bodyRegular"
  | "bodySmall"
  | "bodyXSmall"
  | "button"
  | "buttonXS";

export type TextProps<T extends ElementType> = {
  variant?: TextVariant;
  as?: T;
} & ComponentPropsWithoutRef<T>;
