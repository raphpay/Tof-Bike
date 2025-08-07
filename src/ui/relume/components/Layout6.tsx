"use client";

export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Discover Our Featured Bikes: Quality, Performance, and Style Await
              You!
            </h1>
            <p className="md:text-md mb-6 md:mb-8">
              Explore our handpicked selection of top-performing bikes designed
              for every rider. Whether you're commuting or hitting the trails,
              we have the perfect bike for you.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="text-md mb-3 leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Mountain Bikes
                </h6>
                <p>
                  Built for rugged terrains, our mountain bikes offer durability
                  and performance.
                </p>
              </div>
              <div>
                <h6 className="text-md mb-3 leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Road Bikes
                </h6>
                <p>
                  Experience speed and efficiency with our lightweight and
                  aerodynamic road bikes.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="rounded-image w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
