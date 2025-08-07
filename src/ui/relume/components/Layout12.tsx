"use client";

export function Layout12() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Discover the Best Bicycles and Unmatched Service at Our Shop
            </h1>
            <p className="md:text-md mb-6 md:mb-8">
              At our bicycle shop, we pride ourselves on offering top-quality
              bikes tailored to your needs. Our expert staff is always ready to
              provide personalized advice and support.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="text-md mb-3 leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Quality Bikes
                </h6>
                <p>
                  We offer a wide selection of high-performance bicycles for
                  every rider.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="text-md mb-3 leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Expert Staff
                </h6>
                <p>
                  Our knowledgeable team is here to help you find the perfect
                  bike.
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
