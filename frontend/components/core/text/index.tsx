import React from "react";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
type TextWeight =
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  children: React.ReactNode;
}

export const Text = ({
  size = "base",
  weight = "normal",
  children,
  className = "",
}: TextProps) => {
  const sizeClasses: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const weightClasses: Record<TextWeight, string> = {
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  const combinedClasses = `${sizeClasses[size]} ${weightClasses[weight]} ${className}`;

  return <p className={combinedClasses}>{children}</p>;
};
