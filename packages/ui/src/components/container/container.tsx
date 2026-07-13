import { ElementType, ReactElement } from "react";
import { CommonHtmlTag, ContainerProps } from "./container.types";

// Overloads pinned to concrete literal tags so editor autocomplete can
// enumerate them for the `as` prop — a single generic signature (below)
// can't be expanded into completions by the TS language service.
export function Container<T extends CommonHtmlTag>(
  props: ContainerProps<T>,
): ReactElement;
export function Container<T extends ElementType = "div">(
  props: ContainerProps<T>,
): ReactElement;
export function Container<T extends ElementType = "div">({
  as,
  children,
  ...props
}: ContainerProps<T>) {
  const Tag = as || "div";
  return <Tag {...props}>{children}</Tag>;
}
