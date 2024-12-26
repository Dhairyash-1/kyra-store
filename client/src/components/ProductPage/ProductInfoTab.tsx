import { FC } from "react";

import ReviewCard from "../ReviewCard.tsx";
import ReviewForm from "../ReviewForm.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";

import { sampleReviews } from "@/constants/index.ts";

const renderValue = (value: any) => {
  if (Array.isArray(value)) {
    // Render array as a comma-separated list
    return value.join(", ");
  } else if (typeof value === "object" && value !== null) {
    // Render nested objects as key-value pairs
    return (
      <div className="space-y-2">
        {Object.entries(value).map(([subKey, subValue]) => (
          <div
            key={subKey}
            className="flex flex-col sm:flex-row sm:justify-between"
          >
            <span className="font-bold capitalize text-dark-500 sm:w-1/3">
              {subKey
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </span>
            <span className="mt-1 text-dark-80 sm:ml-2 sm:mt-0 sm:w-2/3">
              {renderValue(subValue)}
            </span>
          </div>
        ))}
      </div>
    );
  } else {
    // Render scalar values directly
    return value;
  }
};
interface ProductInfoTabPropType {
  description: string;
  additionalInfo: object;
}

const ProductInfoTab: FC<ProductInfoTabPropType> = ({
  additionalInfo,
  description,
}) => {
  console.log(additionalInfo);
  const parsedAdditionalInfo =
    typeof additionalInfo === "string"
      ? JSON.parse(additionalInfo)
      : additionalInfo;

  return (
    <Tabs defaultValue="reviews" className="mt-10 bg-transparent">
      <div className="relative">
        <TabsList className="flex w-full bg-transparent sm:justify-start">
          {["Description", "Additional Information", "Reviews"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "")}
              className="relative min-w-max flex-shrink-0 whitespace-nowrap px-4 pb-2 text-sm font-medium transition-all sm:text-base"
            >
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent transition-all data-[state=active]:bg-black" />
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="description" className="mt-6">
        <p className="mb-4 text-sm font-normal sm:text-base">
          {description.slice(0, 336)}
        </p>
        <p className="text-sm font-normal sm:text-base">
          {description.slice(337, 1000)}
        </p>
      </TabsContent>

      <TabsContent value="additionalinformation" className="mt-6">
        <div className="space-y-4">
          {Object.entries(parsedAdditionalInfo).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:justify-between"
            >
              {/* Key (formatted to user-friendly text) */}
              <span className="font-bold capitalize text-dark-500 sm:w-1/3">
                {key
                  .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              {/* Value */}
              <span className="mt-1 text-dark-80 sm:ml-2 sm:mt-0 sm:w-2/3">
                {renderValue(value)}
              </span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <h3 className="text-lg font-bold sm:text-xl">Customer Reviews</h3>
        <div className="mt-4 flex flex-col gap-4 sm:gap-6">
          {sampleReviews.map((review) => (
            <ReviewCard key={review.postDate} {...review} />
          ))}
        </div>
        <ReviewForm onSubmit={() => {}} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductInfoTab;
