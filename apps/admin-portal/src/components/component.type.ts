import { ComponentType } from "react";

interface InnerSubItem {
  label: string;
  action: () => void;
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
}
