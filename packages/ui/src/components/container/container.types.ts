import { ComponentPropsWithRef, ElementType } from "react";

// The common HTML tags Container is used with day-to-day. Pinned as literal
// overloads in container.tsx so the `as` prop actually autocompletes them —
// anything outside this list still works via the generic fallback overload,
// it just won't autocomplete.
export type CommonHtmlTag =
  | "div"
  | "span"
  | "button"
  | "a"
  | "form"
  | "label"
  | "input"
  | "textarea"
  | "select"
  | "option"
  | "ul"
  | "ol"
  | "li"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "nav"
  | "aside"
  | "main"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "img"
  | "table"
  | "thead"
  | "tbody"
  | "tr"
  | "td"
  | "th";

export type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
} & ComponentPropsWithRef<T>;
