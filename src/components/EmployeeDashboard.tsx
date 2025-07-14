import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Zap
} from "lucide-react";

interface EmployeeDashboardProps {
  user: any;
  onLogout: () => void;
}

const EmployeeDashboard = ({ user, onLogout }: EmployeeDashboardProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  // Mock data - will be replaced with real data from Supabase
  const userStats = {
    totalPoints: 1250,
    weeklyRank: 3,
    completedQuizzes: 8,
    totalQuizzes: 12,
    streak: 5,
    nextQuizUnlockIn: "1 day, 14 hours"
  };

  const badges = [
    { id: 1, name: "First Quiz", icon: Target, earned: true, description: "Complete your first quiz" },
    { id: 2, name: "Weekly Warrior", icon: Calendar, earned: true, description: "Complete 5 weekly quizzes" },
    { id: 3, name: "Perfect Score", icon: Star, earned: true, description: "Score 100% on a quiz" },
    { id: 4, name: "Streak Master", icon: Zap, earned: false, description: "Maintain a 7-day streak" },
    { id: 5, name: "Quiz Champion", icon: Trophy, earned: false, description: "Complete all available quizzes" }
  ];

  const weeklyQuizzes = [
    { week: 1, title: "LG History & Values", status: "completed", score: 95, unlocked: true },
    { week: 2, title: "Product Knowledge Basics", status: "completed", score: 88, unlocked: true },
    { week: 3, title: "Customer Service Excellence", status: "completed", score: 100, unlocked: true },
    { week: 4, title: "Technical Fundamentals", status: "available", score: null, unlocked: true },
    { week: 5, title: "Innovation & Technology", status: "locked", score: null, unlocked: false },
    { week: 6, title: "Leadership Skills", status: "locked", score: null, unlocked: false }
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
            <h1 className="text-2xl font-bold text-primary">LG Quiz Platform</h1>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarOptions[selectedAvatar - 1]} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name}</span>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Stats Overview */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Weekly Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Weekly Quizzes
                </CardTitle>
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
                              {quiz.status === 'available' && 'Ready to attempt'}
                              {quiz.status === 'locked' && `Unlocks in ${userStats.nextQuizUnlockIn}`}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarOptions[selectedAvatar - 1]} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {avatarOptions.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAvatar(index + 1)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          selectedAvatar === index + 1
                            ? 'border-primary bg-primary/10'
                            : 'border-muted hover:border-border'
                        }`}
                      >
                        <Avatar className="w-full h-12">
                          <AvatarImage src={avatar} />
                        </Avatar>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-lg border transition-all ${
                        badge.earned
                          ? 'border-success bg-success/5 hover:bg-success/10'
                          : 'border-muted bg-muted/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          badge.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          <badge.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Quiz Completion</span>
                    <span>{Math.round((userStats.completedQuizzes / userStats.totalQuizzes) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.completedQuizzes / userStats.totalQuizzes) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;