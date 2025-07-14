import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Trophy,
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - will be replaced with real data from Supabase
  const adminStats = {
    totalEmployees: 127,
    activeQuizzes: 6,
    avgCompletionRate: 78,
    avgScore: 85,
    thisWeekParticipants: 98
  };

  const employeeData = [
    { id: 1, name: "John Smith", email: "john.smith@lge.com", points: 1250, rank: 1, lastActive: "2024-01-14" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@lge.com", points: 1180, rank: 2, lastActive: "2024-01-14" },
    { id: 3, name: "Mike Chen", email: "m.chen@lge.com", points: 1120, rank: 3, lastActive: "2024-01-13" },
    { id: 4, name: "Lisa Park", email: "lisa.park@lge.com", points: 1050, rank: 4, lastActive: "2024-01-14" },
    { id: 5, name: "David Wilson", email: "d.wilson@lge.com", points: 980, rank: 5, lastActive: "2024-01-12" }
  ];

  const quizData = [
    { id: 1, week: 1, title: "LG History & Values", participants: 120, avgScore: 88, status: "Completed" },
    { id: 2, week: 2, title: "Product Knowledge Basics", participants: 115, avgScore: 82, status: "Completed" },
    { id: 3, week: 3, title: "Customer Service Excellence", participants: 108, avgScore: 91, status: "Completed" },
    { id: 4, week: 4, title: "Technical Fundamentals", participants: 85, avgScore: 79, status: "Active" },
    { id: 5, week: 5, title: "Innovation & Technology", participants: 0, avgScore: 0, status: "Scheduled" },
    { id: 6, week: 6, title: "Leadership Skills", participants: 0, avgScore: 0, status: "Draft" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">LG Quiz Platform - Admin</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">Administrator</Badge>
              <span className="text-sm font-medium">{user.name}</span>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Employees</p>
                      <p className="text-2xl font-bold">{adminStats.totalEmployees}</p>
                    </div>
                    <Users className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Quizzes</p>
                      <p className="text-2xl font-bold text-foreground">{adminStats.activeQuizzes}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold text-foreground">{adminStats.avgCompletionRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold text-foreground">{adminStats.avgScore}%</p>
                    </div>
                    <Trophy className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold text-foreground">{adminStats.thisWeekParticipants}</p>
                    </div>
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeeData.slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-warning text-warning-foreground' :
                          index === 1 ? 'bg-muted-foreground text-background' :
                          index === 2 ? 'bg-primary/70 text-primary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          #{employee.rank}
                        </div>
                        <div>
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{employee.points} pts</p>
                        <p className="text-xs text-muted-foreground">Last active: {employee.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeeData.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                        <p className="text-sm text-primary font-medium">{employee.points} points • Rank #{employee.rank}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quiz Management</h2>
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="w-4 h-4 mr-2" />
                Create New Quiz
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {quizData.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div>
                        <h4 className="font-medium">Week {quiz.week}: {quiz.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {quiz.participants > 0 
                            ? `${quiz.participants} participants • ${quiz.avgScore}% avg score`
                            : `No participants yet`
                          }
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={
                          quiz.status === 'Active' ? 'default' :
                          quiz.status === 'Completed' ? 'secondary' :
                          quiz.status === 'Scheduled' ? 'outline' : 'secondary'
                        }>
                          {quiz.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quiz-unlock">Quiz Unlock Interval (days)</Label>
                  <Input id="quiz-unlock" type="number" defaultValue="2" />
                  <p className="text-sm text-muted-foreground">Time between quiz unlocks</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passing-score">Minimum Passing Score (%)</Label>
                  <Input id="passing-score" type="number" defaultValue="70" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Admin Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@lge.com" />
                </div>

                <Button className="bg-gradient-to-r from-primary to-primary-glow">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;