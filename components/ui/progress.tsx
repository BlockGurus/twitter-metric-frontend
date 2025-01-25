"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: "rgb(59, 130, 246)", // blue-500
      }}
    />
  </div>
));

Progress.displayName = "Progress";

export { Progress };
