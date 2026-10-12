import AnalyticsCharts from "@/components/Dashboard/AnalyticsCharts";

export const metadata = {
  title: "Analytics | MediCare Connect",
};

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">
          My Analytics
        </h1>
        <p className="text-sm text-ink/50 mt-1">
          Overview of your appointment history and statistics
        </p>
      </div>
      <AnalyticsCharts />
    </div>
  );
}
