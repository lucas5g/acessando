import React from "react";

export function Card({ children }: Readonly<React.PropsWithChildren>) {
  return (

    <div
      className="bg-gray-700 rounded p-4 border border-gray-400 space-y-4">
      {children}
    </div>
  );
}