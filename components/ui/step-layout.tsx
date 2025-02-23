interface StepLayoutProps {
  children: React.ReactNode;
  navigationButtons: React.ReactNode;
}

export function StepLayout({ children, navigationButtons }: StepLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-48px)] md:h-[calc(100vh-96px)] overflow-hidden">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="pb-24">
          {children}
        </div>
      </div>

      {/* Fixed navigation */}
      <div className="fixed inset-x-0 bottom-0 py-4 bg-white border-t">
        <div className="flex justify-between items-center w-full px-12">
          {navigationButtons}
        </div>
      </div>
    </div>
  );
} 