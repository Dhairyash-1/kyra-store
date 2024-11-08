import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export default function CategoryCard({
  title = "Casual Wear",
  image = "../assets/men-wear.png",
  href = "#",
}: CategoryCardProps) {
  return (
    <Link
      to={href}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#f3f3f3] transition-all hover:shadow-lg"
    >
      {/* Background Category Text */}
      <div className="absolute inset-0  flex items-center justify-center p-4">
        <span className="absolute -right-[2px] top-[20px] select-none text-5xl font-bold text-[#e5e5e5]">
          {title.split(" ")[0]}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative h-full w-full p-2">
        <img
          src={image}
          alt={title}
          className="object-cover  transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Category Label */}
      <div className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2">
        <div className="rounded-md bg-white px-4 py-2 text-center shadow-md">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
