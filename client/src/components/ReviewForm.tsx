// @ts-nocheck
import { StarIcon } from "lucide-react";
import { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0); // Rating state
  const [title, setTitle] = useState(""); // Title state
  const [description, setDescription] = useState(""); // Description state

  // Function to handle star rating change
  const handleStarClick = (value) => {
    setRating(value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ rating, title, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* Star Rating */}
      <div>
        <label className="mb-2 block text-lg font-semibold">
          Rate this product
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <StarIcon
              key={value}
              className={`h-8 w-8 cursor-pointer ${
                value <= rating ? "text-[#ffa600]" : "text-black"
              } `}
              fill={value <= rating ? "orange" : "none"}
              onClick={() => handleStarClick(value)}
            />
          ))}
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-semibold">Review Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your review a title"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-500"
        />
      </div>

      {/* Review Description */}
      <div>
        <label className="block text-sm font-semibold">Your Review</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dark-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="rounded-md bg-dark-500 px-6 py-2 font-normal text-light-500 hover:bg-gray-800 focus:outline-none"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
