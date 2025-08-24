
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

const PerformanceAnalytics = () => {
  // Empty data arrays - will be populated from database
  const departmentScoreData: any[] = [];
  const weeklyParticipationData: any[] = [];
  const quizCompletionData: any[] = [];
  const performanceTrendData: any[] = [];

  // Chart configuration
  const chartConfig = {
    participation: {
      label: "Participation",
      color: "hsl(var(--primary))",
    },
    completion: {
      label: "Completion Rate",
      color: "hsl(var(--chart-2))",
    },
    score: {
      label: "Average Score",
      color: "hsl(var(--chart-3))",
    },
  };

  const handleRefreshData = () => {
    console.log("Refreshing analytics data...");
    // In real app, this would trigger a data refresh
  };

  const handleExportReport = () => {
    console.log("Exporting analytics report...");
    // In real app, this would generate and download an analytics report
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Performance Analytics</h2>
          <p className="text-muted-foreground mt-1">Visual insights into quiz performance and engagement</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Department Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {departmentScoreData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <PieChart className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">Pie Chart Will Appear Here</p>
                <p className="text-sm text-center mt-2">
                  Department performance data will be visualized once quiz data is available
                </p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-64">
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <RechartsPieChart data={departmentScoreData}>
                    {departmentScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Weekly Participation Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Participation Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyParticipationData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">Bar Chart Will Appear Here</p>
                <p className="text-sm text-center mt-2">
                  Weekly participation trends will be shown once users start taking quizzes
                </p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={weeklyParticipationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="participants" fill="var(--color-participation)" />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Quiz Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Quiz Completion Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quizCompletionData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <Calendar className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">Completion Chart Will Appear Here</p>
                <p className="text-sm text-center mt-2">
                  Quiz completion rates and patterns will be displayed here
                </p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={quizCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="completionRate" fill="var(--color-completion)" />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Performance Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Overall Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {performanceTrendData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <TrendingUp className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">Trend Line Will Appear Here</p>
                <p className="text-sm text-center mt-2">
                  Performance trends over time will be visualized once sufficient data is collected
                </p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="avgScore" 
                    stroke="var(--color-score)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Key Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Participants</p>
                  <p className="text-xl font-bold text-primary">0</p>
                  <Badge variant="outline" className="mt-1">No data yet</Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  <p className="text-xl font-bold text-success">0%</p>
                  <Badge variant="outline" className="mt-1">Awaiting data</Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Performance Score</p>
                  <p className="text-xl font-bold text-warning">0%</p>
                  <Badge variant="outline" className="mt-1">No scores yet</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;
