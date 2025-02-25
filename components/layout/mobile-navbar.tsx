import React from "react";
import { Logo } from "@/components/ui/logo";

export function MobileNavbar() {
  return (
    <nav className="md:hidden w-full bg-black px-4 py-2">
      <Logo width={28} height={28} />
    </nav>
  );
} 