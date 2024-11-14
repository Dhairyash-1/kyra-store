import {
  CircleDollarSignIcon,
  CreditCardIcon,
  HeadphonesIcon,
  PackageIcon,
} from "lucide-react";

const indicators = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Free shipping for order above $100",
    icon: <PackageIcon size={36} />,
  },
  {
    id: 2,
    title: "Money Guarantee",
    description: "within 30 days for an exchange",
    icon: <CircleDollarSignIcon size={36} />,
  },
  {
    id: 3,
    title: "Online Support",
    description: "24 hours a day, 7 days a week",
    icon: <HeadphonesIcon size={36} />,
  },
  {
    id: 4,
    title: "Flexible Payment",
    description: "Pay with multiple credit card",
    icon: <CreditCardIcon size={36} />,
  },
];

const TrustIndicators = () => {
  return (
    <section className="mt-24 grid items-center lg:px-20 gap-4 py-8 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 ">
      {indicators.map((item) => (
        <div
          className="flex flex-col items-center gap-[12px] sm:items-start"
          key={item.id}
        >
          {item.icon}
          <h4 className="text-xl font-extrabold">{item.title}</h4>
          <p className="text-base font-normal">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default TrustIndicators;
