"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BlurImage({ className, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      className={cn(
        className,
        "transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        isLoading ? "scale-105 blur-lg opacity-0" : "scale-100 blur-0 opacity-100"
      )}
      onLoad={(e) => {
        setLoading(false);
        if (props.onLoad) props.onLoad(e);
      }}
    />
  );
}
