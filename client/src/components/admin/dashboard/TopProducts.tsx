import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Men Grey Hoodie",
    price: "$49.90",
    units: "204",
    image: "/placeholder.svg",
  },
  {
    name: "Women Striped T-Shirt",
    price: "$34.90",
    units: "155",
    image: "/placeholder.svg",
  },
  {
    name: "Women White T-Shirt",
    price: "$40.90",
    units: "120",
    image: "/placeholder.svg",
  },
  {
    name: "Men White T-Shirt",
    price: "$49.90",
    units: "204",
    image: "/placeholder.svg",
  },
  {
    name: "Women Red T-Shirt",
    price: "$34.90",
    units: "155",
    image: "/placeholder.svg",
  },
];

export function TopProducts() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Units Sold</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <img
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.units}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
