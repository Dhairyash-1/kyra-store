import { CardMetric } from "@/components/admin/dashboard/CardMetrics";
import { DashboardHeader } from "@/components/admin/dashboard/Header";
import { Overview } from "@/components/admin/dashboard/Overview";
import { RecentSales } from "@/components/admin/dashboard/RecentSales";
import { DashboardShell } from "@/components/admin/dashboard/Shell";
import { TopProducts } from "@/components/admin/dashboard/TopProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard",
  description: "E-commerce admin dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardMetric
          title="Total Revenue"
          value="$10.54"
          description="Total profit today"
          trend="+2.45%"
          trendType="positive"
        />
        <CardMetric
          title="Orders"
          value="1,056"
          description="Total orders"
          trend="+15.35%"
          trendType="positive"
        />
        <CardMetric
          title="Unique Visits"
          value="5,420"
          description="Visitors today"
          trend="+10.35%"
          trendType="positive"
        />
        <CardMetric
          title="Existing Users"
          value="9,653"
          description="Total users"
          trend="+22.45%"
          trendType="positive"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Last 7 Days Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
