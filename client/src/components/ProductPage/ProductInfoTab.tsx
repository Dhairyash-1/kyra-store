import { StarIcon } from "lucide-react";
import { FC } from "react";

import ReviewCard from "../ReviewCard.tsx";
import ReviewForm from "../ReviewForm.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";

import userIcon from "@/assets/t4.jpeg";
import { sampleReviews } from "@/constants/index.ts";
interface ProductInfoTabPropType {
  description: string;
  additionalInfo: object;
}

const ProductInfoTab: FC<ProductInfoTabPropType> = ({
  additionalInfo,
  description,
}) => {
  return (
    <div className="mt-10">
      <Tabs defaultValue="reviews" className="bg-transparent">
        <TabsList className="flex justify-start  bg-transparent sm:gap-4  ">
          <TabsTrigger value="description" className="relative pb-2 text-base">
            {/* Black Line only on active */}
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent transition-all data-[state=active]:bg-black" />
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additionalInfo"
            className="relative pb-2 text-base"
          >
            {/* Black Line only on active */}
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent transition-all data-[state=active]:bg-black" />
            Additional Information
          </TabsTrigger>
          <TabsTrigger value="reviews" className="relative pb-2 text-base">
            {/* Black Line only on active */}
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent  transition-all data-[state=active]:bg-black" />
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p className="mb-4 font-normal">{description.slice(0, 336)}</p>
          <p className="font-normal">{description.slice(337, 1000)}</p>
        </TabsContent>

        <TabsContent value="additionalInfo">
          <div className="grid  gap-2">
            {Object.entries(additionalInfo).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-bold capitalize text-dark-500">
                  {key}:
                </span>
                <span className="ml-2 text-dark-80">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <h3 className="mt-4 text-xl font-bold">Customer Reviews</h3>
          <div className="mt-4 flex flex-col gap-6">
            {sampleReviews.map((review) => (
              <ReviewCard key={review.postDate} {...review} />
            ))}
          </div>
          <ReviewForm onSubmit={() => {}} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductInfoTab;
