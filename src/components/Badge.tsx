import { ReactNode } from "react";

function Badge({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="bg-green-100 text-green-500 rounded-2xl px-4 py-1 capitalize">
        {children}
      </span>
    </>
  );
}

export default Badge;
