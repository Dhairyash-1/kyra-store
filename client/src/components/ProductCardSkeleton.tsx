const ProductCardSkeleton = () => {
  return (
    <div className="flex min-w-[150px] animate-pulse flex-col rounded-lg bg-white">
      {/* Product Image Section */}
      <div className="relative block overflow-hidden rounded-t-lg bg-gray-5">
        {/* Top Action Button */}
        <div className="absolute right-4 top-4 z-10 hidden group-hover:block">
          {/* Placeholder for the top action button */}
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
        </div>

        {/* Product Image Placeholder */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-10">
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gray-300"></div>
        </div>

        {/* Bottom Action Button */}
        <div className="absolute bottom-4 left-1/2 z-10 hidden w-[80%] -translate-x-1/2 group-hover:block">
          {/* Placeholder for the bottom action button */}
          <div className="h-8 w-full rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-grow flex-col gap-2 p-4">
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>{" "}
        {/* Brand name placeholder */}
        <div className="h-4 w-2/3 rounded bg-gray-300"></div>{" "}
        {/* Product name placeholder */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-24 rounded bg-gray-300"></div>{" "}
          {/* Sale price placeholder */}
          <div className="h-3 w-16 rounded bg-gray-300"></div>{" "}
          {/* Strikethrough price placeholder */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
