import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import EmployeeDashboard from "@/components/EmployeeDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'employee' | 'admin' | null>(null);

  const handleLogin = (type: 'employee' | 'admin', userData: any) => {
    setUserType(type);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userType === 'employee') {
    return <EmployeeDashboard user={user} onLogout={handleLogout} />;
  }

  if (userType === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return null;
};

export default Index;
