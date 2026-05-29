import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
                rounded-lg
               
                bg-white
                bg-surface
                p-4
                shadow-md
                ${className}
            `}
    >
      {children}
    </div>
  );
}
