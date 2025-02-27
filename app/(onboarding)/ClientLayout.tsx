"use client";

import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { BrandCard } from "@/components/layout/brand-card";
import { ToastProvider } from "@/components/ui/use-toast";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen lg:min-h-[100dvh] font-['Arial, Helvetica, sans-serif']">
        {/* Left Section - Form */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <MobileNavbar />
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        </div>

        {/* Right Section - Brand Card */}
        <div className="hidden lg:flex lg:w-2/4 p-6">
          <BrandCard />
        </div>
      </div>
    </ToastProvider>
  );
}
