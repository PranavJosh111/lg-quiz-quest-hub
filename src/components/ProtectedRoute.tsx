import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'admin';
  fallback?: ReactNode;
}

const ProtectedRoute = ({ children, requiredRole, fallback }: ProtectedRouteProps) => {
  const { authUser, loading, signOut } = useAuth();

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
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-destructive mb-4" />
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">You must be logged in to access this page.</p>
            <Button onClick={() => window.location.reload()}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && authUser.profile.role !== requiredRole) {
    const isUserTryingAdminAccess = requiredRole === 'admin' && authUser.profile.role === 'user';
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-warning mb-4" />
            <CardTitle>Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isUserTryingAdminAccess ? (
              <Alert className="border-warning/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You don't have administrator privileges. Only administrators can access this area.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-warning/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You don't have the required permissions to access this page.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;