import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Users } from "lucide-react";

interface LeaderboardProps {
  currentUser: any;
}

const Leaderboard = ({ currentUser }: LeaderboardProps) => {
  // Mock leaderboard data - in real app, this would come from database
  const leaderboardData = [
    { 
      id: 1, 
      name: "Sarah Kim", 
      department: "Engineering", 
      points: 1580, 
      quizzesCompleted: 12, 
      accuracy: 94, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      isCurrentUser: false 
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      department: "Marketing", 
      points: 1520, 
      quizzesCompleted: 11, 
      accuracy: 89, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      isCurrentUser: false 
    },
    { 
      id: 3, 
      name: currentUser?.displayName || currentUser?.email || "You", 
      department: "Sales", 
      points: 1250, 
      quizzesCompleted: 8, 
      accuracy: 92, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      isCurrentUser: true 
    },
    { 
      id: 4, 
      name: "Emily Rodriguez", 
      department: "HR", 
      points: 1180, 
      quizzesCompleted: 9, 
      accuracy: 87, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      isCurrentUser: false 
    },
    { 
      id: 5, 
      name: "David Park", 
      department: "Engineering", 
      points: 1050, 
      quizzesCompleted: 7, 
      accuracy: 91, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      isCurrentUser: false 
    },
    { 
      id: 6, 
      name: "Lisa Thompson", 
      department: "Finance", 
      points: 980, 
      quizzesCompleted: 6, 
      accuracy: 88, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      isCurrentUser: false 
    },
    { 
      id: 7, 
      name: "James Wilson", 
      department: "Operations", 
      points: 920, 
      quizzesCompleted: 5, 
      accuracy: 85, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      isCurrentUser: false 
    },
    { 
      id: 8, 
      name: "Anna Martinez", 
      department: "Design", 
      points: 850, 
      quizzesCompleted: 4, 
      accuracy: 90, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna",
      isCurrentUser: false 
    }
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Sales': 'bg-green-100 text-green-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Operations': 'bg-indigo-100 text-indigo-800',
      'Design': 'bg-orange-100 text-orange-800'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Company Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg border transition-all ${
                user.isCurrentUser
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-muted hover:border-border hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                        {user.name}
                        {user.isCurrentUser && <span className="text-xs">(You)</span>}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getDepartmentColor(user.department)}`}
                      >
                        {user.department}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {user.quizzesCompleted} quizzes • {user.accuracy}% accuracy
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {user.points}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Complete more quizzes to climb the leaderboard! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;