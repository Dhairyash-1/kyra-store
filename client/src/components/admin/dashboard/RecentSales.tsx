import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "₹2497",
    status: "Paid",
  },
  {
    name: "Anand G.",
    date: "23.05.2023",
    amount: "₹5542",
    status: "Pending",
  },
  {
    name: "Kartik S.",
    date: "23.05.2023",
    amount: "₹8990",
    status: "Paid",
  },
  {
    name: "Rakesh S.",
    date: "22.05.2023",
    amount: "₹5294",
    status: "Pending",
  },
  {
    name: "Anup S.",
    date: "22.05.2023",
    amount: "₹7052",
    status: "Paid",
  },
];

export function RecentSales() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.name}>
            <TableCell className="font-medium">{transaction.name}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.status === "Paid" ? "default" : "secondary"
                }
              >
                {transaction.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
