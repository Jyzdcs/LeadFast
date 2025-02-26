"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";

interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  className?: string;
  width?: string;
}

interface DisplayCardProps {
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  data?: Array<Record<string, any>>;
  columns?: TableColumn[];
  onClick?: () => void;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  onClick,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 dark:bg-slate-800 dark:border-slate-700 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  onRowClick?: (item: any) => void;
}

export default function DisplayCards({ cards, onRowClick }: DisplayCardsProps) {
  const [activeCard, setActiveCard] = useState<DisplayCardProps | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const defaultCards: DisplayCardProps[] = [
    {
      id: "1",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 before:left-0 before:top-0",
      data: [
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
      ],
      columns: [
        { key: "name", header: "Name" },
        { key: "value", header: "Value", align: "right" as const },
      ],
    },
    {
      id: "2",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 before:left-0 before:top-0",
      data: [
        { id: 1, name: "Item 3", value: 300 },
        { id: 2, name: "Item 4", value: 400 },
      ],
      columns: [
        { key: "name", header: "Name" },
        { key: "value", header: "Value", align: "right" as const },
      ],
    },
    {
      id: "3",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
      data: [
        { id: 1, name: "Item 5", value: 500 },
        { id: 2, name: "Item 6", value: 600 },
      ],
      columns: [
        { key: "name", header: "Name" },
        { key: "value", header: "Value", align: "right" as const },
      ],
    },
  ];

  const displayCards = cards || defaultCards;

  const handleCardClick = (card: DisplayCardProps) => {
    setActiveCard(card);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
        {displayCards.map((cardProps, index) => (
          <DisplayCard
            key={cardProps.id || index}
            {...cardProps}
            onClick={() => handleCardClick(cardProps)}
          />
        ))}
      </div>

      {activeCard && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="right"
            className="w-full max-w-[90vw] overflow-x-auto sm:max-w-[1200px] p-0"
          >
            <div className="sticky top-0 z-10 bg-background p-6 border-b">
              <SheetHeader>
                <SheetTitle>{activeCard.title}</SheetTitle>
                <SheetDescription>{activeCard.description}</SheetDescription>
              </SheetHeader>
            </div>

            <div className="p-6 overflow-x-auto">
              <Table className="border-collapse table-auto">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {activeCard.columns?.map((column, index) => (
                      <TableHead
                        key={index}
                        className={cn(
                          column.className,
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCard.data?.map((item, rowIndex) => (
                    <TableRow
                      key={item.id || rowIndex}
                      className={cn(onRowClick && "cursor-pointer")}
                      onClick={() => onRowClick?.(item)}
                    >
                      {activeCard.columns?.map((column, colIndex) => {
                        if (colIndex === 0) {
                          return (
                            <TableCell key={colIndex} className="max-w-[300px]">
                              <div className="flex items-center gap-3">
                                {item.image && (
                                  <img
                                    className="rounded-full flex-shrink-0"
                                    src={item.image}
                                    width={40}
                                    height={40}
                                    alt={item[column.key] || ""}
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium truncate">
                                    {item[column.key]}
                                  </div>
                                  {item.username && (
                                    <span className="mt-0.5 text-xs text-muted-foreground truncate block">
                                      {item.username}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell
                            key={colIndex}
                            className={cn(
                              column.className,
                              column.align === "center" && "text-center",
                              column.align === "right" && "text-right"
                            )}
                          >
                            {column.key === "linkedin" ? (
                              <span className="truncate inline-block max-w-full dark:text-blue-400">
                                {String(item[column.key] || "")}
                              </span>
                            ) : (
                              String(item[column.key] || "")
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
