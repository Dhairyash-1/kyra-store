import { StarIcon } from "lucide-react";

interface TestimonialCardProp {
  testimonial: string;
  name: string;
  profession: string;
  image: string;
}
const TestimonialCard = ({
  testimonial,
  name,
  profession,
  image,
}: TestimonialCardProp) => {
  return (
    <div className="flex h-auto flex-col items-start space-y-4 rounded-md  bg-white p-8 shadow-sm">
      <div className="flex">
        <StarIcon fill="#FFA500" color="#FFA500" />
        <StarIcon fill="#FFA500" color="#FFA500" />
        <StarIcon fill="#FFA500" color="#FFA500" />
        <StarIcon fill="#FFA500" color="#FFA500" />
        <StarIcon fill="#FFA500" color="#FFA500" />
      </div>
      <p className="text-base font-normal text-dark-500">{testimonial}</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="h-8 w-8 rounded-full" />
        <div>
          <h5 className="text-xl font-bold">{name}</h5>
          <span className="text-sm font-medium text-gray-90">{profession}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
