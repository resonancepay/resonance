import { ComponentType } from "react";

interface InnerSubItem {
  label: string;
  action: () => void;
  href?: string;
}

export interface NavIconProps {
  size?: number;
  className?: string;
}

export interface NavWrapperType {
  label: string;
  clickAction: () => void;
  subItem: InnerSubItem[];
  icon: ComponentType<NavIconProps>;
  href?: string;
}
