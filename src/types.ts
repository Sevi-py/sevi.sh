import type { ComponentType } from "react";
import type { IconType } from "react-icons";

export type Icon = IconType | ComponentType<{ className?: string }>;

