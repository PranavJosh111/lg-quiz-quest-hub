import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Clock, 
  Star, 
  Award, 
  Brain, 
  Target,
  Calendar,
  Lock,
  CheckCircle,
  Zap,
  Users,
  User,
  LogOut
} from "lucide-react";
import AvatarCustomizer from "./AvatarCustomizer";
import Leaderboard from "./Leaderboard";

import { AuthUser } from "@/hooks/useAuth";

interface EmployeeDashboardProps {
  user: AuthUser;
  onLogout: () => void;
}

const EmployeeDashboard = ({ user, onLogout }: EmployeeDashboardProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  // Real user stats - will be populated from database
  const userStats = {
    totalPoints: 0,
    weeklyRank: 0,
    completedQuizzes: 0,
    totalQuizzes: 0,
    streak: 0,
    nextQuizUnlockIn: "No quizzes available"
  };

  const badges = [
    { id: 1, name: "First Quiz", icon: Target, earned: false, description: "Complete your first quiz" },
    { id: 2, name: "Weekly Warrior", icon: Calendar, earned: false, description: "Complete 5 weekly quizzes" },
    { id: 3, name: "Perfect Score", icon: Star, earned: false, description: "Score 100% on a quiz" },
    { id: 4, name: "Streak Master", icon: Zap, earned: false, description: "Maintain a 7-day streak" },
    { id: 5, name: "Quiz Champion", icon: Trophy, earned: false, description: "Complete all available quizzes" }
  ];

  const weeklyQuizzes = [
    { week: 1, title: "No quizzes available", status: "locked", score: null, unlocked: false }
  ];

  const avatarOptions = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=2", 
    "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=4"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/1c7d3126-d8d3-460d-890d-b1ed95f5eefb.png" alt="LG Logo" className="w-8 h-8 object-contain" />
              <h1 className="text-2xl font-bold text-primary">LG Quiz Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarOptions[selectedAvatar - 1]} />
                <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.displayName}</span>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Points</p>
                  <p className="text-2xl font-bold">{userStats.totalPoints}</p>
                </div>
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Rank</p>
                  <p className="text-2xl font-bold text-foreground">#{userStats.weeklyRank}</p>
                </div>
                <Award className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {userStats.completedQuizzes}/{userStats.totalQuizzes}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.streak} days</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="quizzes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Weekly Quizzes - Sequential Unlock System
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Complete one quiz to unlock the next. New quizzes become available 2 days after completion.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyQuizzes.map((quiz) => (
                    <div
                      key={quiz.week}
                      className={`p-4 rounded-lg border transition-all ${
                        quiz.status === 'available'
                          ? 'border-primary bg-primary/5 hover:bg-primary/10 cursor-pointer'
                          : quiz.status === 'completed'
                          ? 'border-success bg-success/5'
                          : 'border-muted bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            quiz.status === 'completed' ? 'bg-success text-success-foreground' :
                            quiz.status === 'available' ? 'bg-primary text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {quiz.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                             quiz.status === 'locked' ? <Lock className="w-4 h-4" /> :
                             quiz.week}
                          </div>
                          <div>
                            <h4 className="font-medium">Week {quiz.week}: {quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {quiz.status === 'completed' && `Score: ${quiz.score}%`}
                              {quiz.status === 'available' && 'Ready to attempt - Only ONE quiz can be active at a time'}
                              {quiz.status === 'locked' && `Unlocks in ${userStats.nextQuizUnlockIn} after previous completion`}
                            </p>
                          </div>
                        </div>
                        {quiz.status === 'available' && (
                          <Button className="bg-gradient-to-r from-primary to-primary-glow">
                            Start Quiz
                          </Button>
                        )}
                        {quiz.status === 'completed' && (
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard currentUser={user} />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AvatarCustomizer 
                selectedAvatar={selectedAvatar} 
                onAvatarChange={setSelectedAvatar}
                userName={user.displayName}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quiz Completion</span>
                        <span>{Math.round((userStats.completedQuizzes / userStats.totalQuizzes) * 100)}%</span>
                      </div>
                      <Progress value={(userStats.completedQuizzes / userStats.totalQuizzes) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-success">{Math.round((userStats.completedQuizzes / userStats.totalQuizzes) * 100)}%</div>
                        <div className="text-sm text-muted-foreground">Attempt Ratio</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border transition-all ${
                        badge.earned
                          ? 'border-success bg-success/5 hover:bg-success/10'
                          : 'border-muted bg-muted/30 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          badge.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          <badge.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                        {badge.earned && (
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;