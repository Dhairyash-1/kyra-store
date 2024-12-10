import jacket from "../assets/bestseller/blue-jacket.png";
import shirt from "../assets/bestseller/casual-printed-multicolor-shirt.png";
import frock from "../assets/bestseller/kids-frock.png";
import kidsJacked from "../assets/bestseller/kids-jacket.png";
import girlwear from "../assets/bestseller/kindpng_1614831.png";
import shoes from "../assets/bestseller/puma-black-shoes.png";
import tshirt from "../assets/bestseller/red-tshirt.png";
import handBag from "../assets/bestseller/women-hand-held-bag.png";
import ethnicWear from "../assets/ethnic-wear.png";
import festivewear from "../assets/festive-wear.png";
import formalwear from "../assets/formal-wear.png";
import kidsWear from "../assets/kids-wear.png";
import menWear from "../assets/men-wear.png";
import person1 from "../assets/t1.jpeg";
import person2 from "../assets/t2.jpeg";
import person3 from "../assets/t3.jpeg";
import person4 from "../assets/t4.jpeg";
import westernWear from "../assets/western-wear.png";

export const sampleReviews = [
  {
    userIcon: person4, // Add image URL here
    userName: "John Doe",
    rating: 5,
    reviewTitle: "Great product, but could be better",
    reviewContent:
      "I really like the product, but there are a few things that could be improved. The fabric is soft, and the fit is perfect. However, the stitching on the sleeves could be more durable.",
    postDate: "March 25, 2024",
  },
  {
    userIcon: person3, // Add image URL here
    userName: "Sarah Lee",
    rating: 5,
    reviewTitle: "Amazing quality and fit!",
    reviewContent:
      "I absolutely love this product! It fits perfectly, and the quality is top-notch. I've worn it multiple times already, and it hasn't shown any signs of wear. Definitely recommend!",
    postDate: "April 14, 2024",
  },
  {
    userIcon: person1, // Add image URL here
    userName: "Michael Smith",
    rating: 3,
    reviewTitle: "Decent, but not great",
    reviewContent:
      "The product is okay for the price, but the material feels a bit cheap. It's not as comfortable as I expected, but it's wearable. I'd say it's good for casual wear but not for long days.",
    postDate: "May 3, 2024",
  },
];

export const productCategories = [
  {
    id: 1,
    title: "Casual Wear",
    image: menWear,
    href: "/",
  },
  {
    id: 4,
    title: "Western Wear",
    image: westernWear,
    href: "/",
  },

  {
    id: 3,
    title: "Kids Wear",
    image: kidsWear,
    href: "/",
  },
  {
    id: 24,
    title: "Festive Wear",
    image: festivewear,
    href: "/",
  },
  {
    id: 247,
    title: "Formal Wear",
    image: formalwear,
    href: "/",
  },

  {
    id: 2,
    title: "Ethnic Wear",
    image: ethnicWear,
    href: "/",
  },
];

export const bestSellerProducts = [
  {
    id: 5,
    brand: "Gucci",
    title: "Leather Handbag",
    price: "250",
    salePrice: "200",
    image: handBag,
    href: "#",
  },
  {
    id: 3,
    brand: "Nike",
    title: "Black Running Shoes",
    price: "100",
    salePrice: "80",
    image: shoes,
    href: "#",
  },
  {
    id: 8,
    brand: "Puma",
    title: "Kids' Hooded Jacket",
    price: "60",
    salePrice: "45",
    image: kidsJacked,
    href: "#",
  },
  {
    id: 7,
    brand: "Adidas",
    title: "Winter Jacket",
    price: "120",
    salePrice: "90",
    image: jacket,
    href: "#",
  },

  {
    id: 6,
    brand: "H&M",
    title: "Girls' Pink Dress",
    price: "45",
    salePrice: "35",
    image: girlwear,
    href: "#",
  },

  {
    id: 4,
    brand: "Zara",
    title: "Floral Summer Frock",
    price: "70",
    salePrice: "55",
    image: frock,
    href: "#",
  },

  {
    id: 1,
    brand: "US POLO",
    title: "Casual Multicolor Printed Shirt",
    price: "50",
    salePrice: "40",
    image: shirt,
    href: "#",
  },
  {
    id: 2,
    brand: "HRX",
    title: "Red Cotton T-Shirt",
    price: "30",
    salePrice: "20",
    image: tshirt,
    href: "#",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    profession: "Fashion Designer",
    testimonial:
      "Absolutely love the quality and style! The collection perfectly matches my wardrobe and exceeded my expectations.",
    rating: 5,
    image: person1, // Placeholder image URL
  },
  {
    id: 25,
    name: "Michael Brown",
    profession: "Software Engineer",
    testimonial:
      "Great shopping experience. The customer service team was really helpful and the clothes arrived quickly.",
    rating: 4,
    image: person2,
  },
  {
    id: 2,
    name: "Michael Brown",
    profession: "Software Engineer",
    testimonial:
      "Great shopping experience. The customer service team was really helpful and the clothes arrived quickly.",
    rating: 4,
    image: person2,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    profession: "Marketing Specialist",
    testimonial:
      "I was impressed by the variety and quality. The collection has something for every occasion. Highly recommend!",
    rating: 5,
    image: person3,
  },
  {
    id: 4,
    name: "David Lee",
    profession: "Graphic Designer",
    testimonial:
      "Good quality but slightly limited sizing options. Overall, I’m happy with my purchase and would shop here again.",
    rating: 3,
    image: person4,
  },
  {
    id: 5,
    name: "Emma Wilson",
    profession: "Photographer",
    testimonial:
      "The designs are unique and stylish. I get compliments every time I wear their clothes, other accessories. Definitely worth it!",
    rating: 4,
    image: person2,
  },
];
