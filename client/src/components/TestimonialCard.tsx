import { Star } from "lucide-react";

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
    <div className="h-full rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative">
        <div className="mb-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400" fill="#FDB813" />
          ))}
        </div>

        <p className="relative z-10 mb-6 text-gray-600">{testimonial}</p>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-black"
            />
            <div className="absolute inset-0 rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </div>

          <div>
            <h4 className="font-bold text-black">{name}</h4>
            <p className="text-sm text-gray-500">{profession}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;
