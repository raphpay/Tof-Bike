"use client";

import { Button } from "@relume_io/relume-ui";

export function Header5() {
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h1 className="text-text-alternative lg:text-10xl mb-5 text-6xl font-bold md:mb-6 md:text-9xl">
              Ride Into Adventure with Our Bikes
            </h1>
            <p className="text-text-alternative md:text-md">
              Discover the joy of cycling with our wide selection of bikes and
              accessories. Whether you're looking to purchase or rent, we have
              everything you need to hit the road.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Shop">Shop</Button>
              <Button title="Learn More" variant="secondary-alt">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
