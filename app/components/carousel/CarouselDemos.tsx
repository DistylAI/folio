"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";
import { cn } from "@/lib/utils";

function Slide({ n, className }: { n: number; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-border bg-secondary",
        className,
      )}
    >
      <span className="text-3xl font-semibold text-muted-foreground tabular-nums">
        {n}
      </span>
    </div>
  );
}

// Single item per view, with an "Item X of Y" counter wired to the Embla api.
export function BasicCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-[15rem]">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <Slide n={i + 1} className="aspect-square" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Item {current} of {count}
      </p>
    </div>
  );
}

// Multiple items per view via basis-* on each CarouselItem.
export function MultiCarousel({ per }: { per: 2 | 3 }) {
  const basis = per === 2 ? "basis-1/2" : "basis-1/3";
  return (
    <div className="w-full max-w-sm">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem key={i} className={basis}>
              <Slide n={i + 1} className="aspect-square" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Vertical axis -- content gets a fixed height; items size as a fraction of it.
export function VerticalCarousel() {
  return (
    <div className="w-full max-w-[15rem]">
      <Carousel
        orientation="vertical"
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="h-[15rem]">
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i} className="basis-1/2">
              <Slide n={i + 1} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
