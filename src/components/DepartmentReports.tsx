import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Mail,
  FileBarChart
} from "lucide-react";

const DepartmentReports = () => {
  // Mock department data with realistic metrics
  const departmentData = [
    {
      name: "Engineering",
      totalEmployees: 35,
      participationRate: 89,
      averageScore: 92,
      completionRate: 85,
      lowPerformers: 2, // Users with <75% attempt ratio
      nonParticipants: 4, // Users who haven't attempted current quiz
      trend: "up"
    },
    {
      name: "Marketing",
      totalEmployees: 28,
      participationRate: 75,
      averageScore: 87,
      completionRate: 71,
      lowPerformers: 5,
      nonParticipants: 7,
      trend: "down"
    },
    {
      name: "Sales",
      totalEmployees: 42,
      participationRate: 81,
      averageScore: 83,
      completionRate: 78,
      lowPerformers: 8,
      nonParticipants: 8,
      trend: "up"
    },
    {
      name: "HR",
      totalEmployees: 15,
      participationRate: 93,
      averageScore: 91,
      completionRate: 87,
      lowPerformers: 1,
      nonParticipants: 1,
      trend: "up"
    },
    {
      name: "Finance",
      totalEmployees: 22,
      participationRate: 68,
      averageScore: 79,
      completionRate: 64,
      lowPerformers: 7,
      nonParticipants: 7,
      trend: "down"
    }
  ];

  const alertRequiredDepartments = departmentData.filter(dept => 
    dept.lowPerformers > 0 || dept.nonParticipants > 5
  );

  const handleSendReminders = (department: string, type: 'non-participants' | 'low-performers') => {
    console.log(`Sending ${type} reminders to ${department} department`);
    // In real app, this would trigger email notifications via Supabase Edge Function
  };

  const exportReport = () => {
    console.log("Exporting department reports...");
    // In real app, this would generate and download a PDF/Excel report
  };

  return (
    <div className="space-y-6">
      {/* Alert Section */}
      {alertRequiredDepartments.length > 0 && (
        <Alert className="border-destructive bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Attention Required:</strong> {alertRequiredDepartments.length} department(s) have employees with low participation or performance rates.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportReport}>
              <FileBarChart className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSendReminders('All', 'non-participants')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Quiz Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Department Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departmentData.map((dept) => (
          <Card key={dept.name} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {dept.name}
                </div>
                <div className="flex items-center gap-2">
                  {dept.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <Badge variant="secondary">
                    {dept.totalEmployees} employees
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Participation Rate</div>
                  <div className="text-2xl font-bold text-primary">{dept.participationRate}%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Average Score</div>
                  <div className="text-2xl font-bold text-success">{dept.averageScore}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{dept.completionRate}%</span>
                </div>
                <Progress value={dept.completionRate} />
              </div>

              {/* Issues Section */}
              <div className="space-y-3 pt-3 border-t">
                {dept.lowPerformers > 0 && (
                  <div className="flex items-center justify-between p-2 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-sm">
                        {dept.lowPerformers} employees with &lt;75% attempt ratio
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSendReminders(dept.name, 'low-performers')}
                    >
                      Alert
                    </Button>
                  </div>
                )}

                {dept.nonParticipants > 0 && (
                  <div className="flex items-center justify-between p-2 bg-warning/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-warning" />
                      <span className="text-sm">
                        {dept.nonParticipants} employees haven't attempted current quiz
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSendReminders(dept.name, 'non-participants')}
                    >
                      Email
                    </Button>
                  </div>
                )}

                {dept.lowPerformers === 0 && dept.nonParticipants <= 2 && (
                  <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">Department performing well!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {departmentData.reduce((sum, dept) => sum + dept.totalEmployees, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Employees</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {Math.round(departmentData.reduce((sum, dept) => sum + dept.participationRate, 0) / departmentData.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Participation</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {departmentData.reduce((sum, dept) => sum + dept.lowPerformers, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Low Performers</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-destructive">
                {departmentData.reduce((sum, dept) => sum + dept.nonParticipants, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Non-Participants</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentReports;