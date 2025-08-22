import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import EmployeeDashboard from "@/components/EmployeeDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <LoginPage onAuthSuccess={() => window.location.reload()} />;
  }

  // Role-based routing
  if (authUser.profile.role === 'admin') {
    return (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard user={authUser} onLogout={() => window.location.reload()} />
      </ProtectedRoute>
    );
  }

  // Default to user dashboard
  return (
    <ProtectedRoute requiredRole="user">
      <EmployeeDashboard user={authUser} onLogout={() => window.location.reload()} />
    </ProtectedRoute>
  );
};

export default Index;
