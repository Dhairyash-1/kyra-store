import { StarIcon } from "lucide-react";

interface ReviewCardPropType {
  userIcon: string;
  userName: string;
  rating: number;
  reviewTitle: string;
  reviewContent: string;
  postDate: string;
}

const ReviewCard = ({
  userIcon,
  userName,
  rating,
  reviewTitle,
  reviewContent,
  postDate,
}: ReviewCardPropType) => {
  const stars = Array(rating)
    .fill(false)
    .map((_, index) => index < rating);

  return (
    <div className="mt-4   border-b p-4">
      <div className="flex items-center gap-4">
        <img
          src={userIcon}
          alt="user avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h4 className="text-base font-normal">{userName}</h4>
          <div className="flex gap-2">
            {stars.map((isFilled, index) => (
              <StarIcon
                key={index}
                fill={isFilled ? "orange" : "gray"}
                size={18}
                color={isFilled ? "orange" : "gray"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-base font-bold">{reviewTitle}</h3>
        <p className="font-normal text-dark-80">{reviewContent}</p>
        <p className="font-normal">
          <span className="text-normal text-gray-90">Posted on</span> {postDate}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
