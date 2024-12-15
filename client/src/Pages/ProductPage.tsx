import { HeartIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BreadCrumb from "@/components/BreadCrumb";
import CartButton from "@/components/CartButton";
import FullPageLoader from "@/components/FullPageLoader";
import ProductInfoTab from "@/components/ProductPage/ProductInfoTab";
import QuantityController from "@/components/QuantityController";
import { useToast } from "@/hooks/use-toast";
import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { useGetProductBySlugQuery } from "@/services/productApi";

const getPrices = (selectedColor: any, selectedSizeId: number | null) => {
  if (!selectedColor) return { price: null, listPrice: null };

  let price = selectedColor.price;
  let listPrice = selectedColor.listPrice;

  if (selectedSizeId) {
    const selectedSize = selectedColor.sizes.find(
      (size: any) => size.id === selectedSizeId
    );
    if (selectedSize) {
      price = selectedSize.price || price;
      listPrice = selectedSize.listPrice || listPrice;
    }
  }

  return { price, listPrice }; // Return both price and listPrice
};

const ProductPage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { toast } = useToast();
  const [imgIndex, setImgIndex] = useState(0);
  const [hoverImageColorId, setHoverImageColorId] = useState<number | null>(
    null
  );
  const [currentVariantId, setCurrentVariantId] = useState<number | null>(null);
  const selectedVariantId = location.state.variantId;
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const { handleAddToCart, items } = useCart();
  const { handleAddToWishlist, wishlistProductIds } = useWishlist();

  const { data, isLoading, error } = useGetProductBySlugQuery({
    slug: slug || "",
  });

  const product = data?.data;

  const productColors = useMemo(() => product?.colors || [], [product]);

  useEffect(() => {
    if (productColors?.length > 0 && selectedColorId === null) {
      const firstColorId = productColors[0]?.id;
      if (firstColorId) {
        setSelectedColorId(firstColorId);
      }
    }
  }, [selectedColorId, productColors]);

  useEffect(() => {
    if (selectedColorId && selectedSizeId) {
      const color = productColors?.find(
        (color) => color.id === selectedColorId
      );
      if (color) {
        const size = color.sizes.find((size) => size.id === selectedSizeId);

        if (size) {
          setCurrentVariantId(size.variantId);
          console.log("var", size.variantId);
        }
      }
    }
  }, [selectedColorId, selectedSizeId, productColors]);

  useEffect(() => {
    if (selectedVariantId && productColors.length > 0) {
      for (const color of productColors) {
        const matchingSize = color.sizes.find(
          (size) => size.variantId === selectedVariantId
        );
        if (matchingSize) {
          setSelectedColorId(color.id);
          setSelectedSizeId(matchingSize.id);
          break;
        }
      }
    }
  }, [selectedVariantId, productColors]);

  if (isLoading) return <FullPageLoader />;
  if (error) return <div className="text-red-500">Error loading product</div>;
  if (!product || productColors.length === 0) {
    return <div>No product found</div>;
  }
  const { id, name, brand, description, additionalInfo } = product;
  const selectedColor = productColors.find(
    (color) => color.id === selectedColorId
  );

  const images = selectedColor?.images || [];
  const sizes = selectedColor?.sizes || [];
  const currentImage = hoverImageColorId
    ? productColors.find((color) => color.id === hoverImageColorId)?.images[0]
    : images[imgIndex];

  const currentProduct = items.find((item) => item.id === currentVariantId);
  const isWishlist = wishlistProductIds.includes(id);
  const { price, listPrice } = getPrices(selectedColor, selectedSizeId);

  function handleProductAddToCart() {
    if (!selectedColorId || !selectedSizeId) {
      toast({ title: "Please select both color and size", variant: "default" });
      return;
    }

    if (currentVariantId) {
      const cartItem = {
        id: currentVariantId,
        name,
        slug: slug as string,
        productId: id,
        color: {
          id: selectedColorId,
          name: selectedColor?.name as string,
        },
        size: {
          id: selectedSizeId,
          name: sizes.find((size) => size.id === selectedSizeId)
            ?.name as string,
        },
        image: selectedColor?.images[0].url as string,
        price,
        quantity: 1,
      };
      handleAddToCart(cartItem);
    }
  }

  return (
    <div className="mt-8 xl:px-20">
      <BreadCrumb path={name} />

      <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row">
        {/* Left Section: Images */}
        <div className="w-full lg:w-[40%]">
          <div className="flex items-center justify-center ">
            <img
              src={currentImage?.url}
              alt={`Product ${name}`}
              className="h-auto max-h-[500px] w-full object-contain"
            />
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setImgIndex(i)}
                className={`flex  h-24 w-24 cursor-pointer items-center justify-center rounded-md border ${
                  imgIndex === i ? "border-dark-500" : "border-gray-300"
                } `}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  className="aspect-square h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 lg:w-[60%]">
          <h1 className="text-2xl font-bold sm:text-3xl">{brand}</h1>
          <h5 className="mt-2 text-lg font-normal sm:text-xl">{name}</h5>

          <div className="mt-2 flex gap-4">
            <span className="text-xl font-semibold sm:text-2xl">₹{price}</span>
            <span className="text-gray-400 line-through sm:text-xl">
              ₹{listPrice}
            </span>
          </div>

          <p className="mt-4 text-gray-700 sm:text-base md:text-lg">
            {description.slice(0, 220)}...
          </p>

          {/* Color Options */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Color</h4>
            <div className="mt-4 flex items-center gap-4">
              {productColors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => {
                    setSelectedColorId(color.id);
                    setImgIndex(0);
                  }}
                  className={`
                  group relative cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${
                    selectedColorId === color.id
                      ? " scale-105 "
                      : "hover:scale-105"
                  }
                   `}
                  onMouseEnter={() => setHoverImageColorId(color.id)}
                  onMouseLeave={() => setHoverImageColorId(null)}
                >
                  <div
                    className={`
                    flex h-14 w-14 items-center
                    justify-center overflow-hidden 
                    rounded-sm transition-all duration-300
                    ${
                      selectedColorId === color.id
                        ? "border-2 border-black"
                        : "border border-transparent"
                    }
                      ${
                        hoverImageColorId === color.id
                          ? "opacity-80"
                          : "opacity-100"
                      }
                    `}
                  >
                    <img
                      src={color.images[0].url}
                      alt={color.name}
                      className="h-full w-full  object-cover"
                    />
                  </div>
                  {/* Selected Color Name */}
                  {selectedColorId === color.id && (
                    <div className="absolute left-1/2 mb-2 mt-1 w-full -translate-x-1/2 transform text-center">
                      <p className=" text-xs text-gray-700 opacity-100 transition-opacity duration-300">
                        {color.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mt-10">
            <h4 className="text-lg font-semibold">Size</h4>
            <div className="mt-4 flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  className={`rounded-md border px-4 py-2 ${
                    selectedSizeId === size.id
                      ? "border-dark-500 bg-dark-500 text-white"
                      : "border-gray-300 bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedSizeId(size.id)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}

          <div className="mt-10 flex h-12 items-center gap-16 sm:gap-8">
            {/* Quantity Controller */}
            <QuantityController product={currentProduct} />
            {/* Add to Cart Button */}
            <CartButton
              product={currentProduct}
              handleProductAddToCart={handleProductAddToCart}
            />
            {/* Wishlist Button */}
            <div
              onClick={() => handleAddToWishlist(id)}
              className="flex h-full  w-auto items-center justify-center rounded-lg border-2 border-dark-500 px-2 py-2 sm:px-4"
            >
              <HeartIcon
                strokeWidth={1.8}
                fill={isWishlist ? "red" : "none"}
                size={32}
                className={`${
                  isWishlist ? "text-red-500" : "text-dark-500"
                } cursor-pointer`}
              />
            </div>
          </div>
        </div>
      </div>
      <ProductInfoTab
        description={description}
        additionalInfo={additionalInfo}
      />
    </div>
  );
};

export default ProductPage;
