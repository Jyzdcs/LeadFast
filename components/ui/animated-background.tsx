'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, Transition, motion } from 'framer-motion';
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from 'react';

interface ItemProps {
  id: number | string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

type AnimatedBackgroundProps = {
  items: ItemProps[];
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  iconClassName?: string;
};

export default function AnimatedBackground({
  items,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
  iconClassName,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:grid-cols-1">
      {items.map((item, index) => {
        const id = `card-${index}`;

        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onMouseLeave: () => handleSetActiveId(null),
            }
          : {
              onClick: () => handleSetActiveId(id),
            };

        return (
          <div
            key={index}
            className={cn("relative inline-flex")}
            aria-selected={activeId === id}
            data-checked={activeId === id ? 'true' : 'false'}
            {...interactionProps}
          >
            <AnimatePresence initial={false}>
              {activeId === id && (
                <motion.div
                  layoutId={`background-${uniqueId}`}
                  className={cn('absolute inset-0', className)}
                  transition={transition}
                  initial={{ opacity: defaultValue ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className='z-10 flex select-none flex-col space-y-1 p-4 w-full'>
              <div className="flex items-center gap-3">
                <div className={cn("flex-shrink-0", iconClassName)}>
                  {item.icon}
                </div>
                <div>
                  <h3 className='text-base font-medium text-zinc-800 dark:text-zinc-50'>
                    {item.title}
                  </h3>
                  <p className='text-base text-zinc-600 dark:text-zinc-400'>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
