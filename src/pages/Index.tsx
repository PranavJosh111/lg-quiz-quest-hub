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

  if (!user || !userType) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userType === 'employee') {
    const mockUser = {
      name: user.name || "John Doe",
      email: user.email || "john.doe@lg.com",
      department: "Engineering",
      points: 850,
      badges: 5,
      avatar: "avatar-1",
      avatarBg: "bg-1"
    };
    return <EmployeeDashboard user={mockUser} onLogout={handleLogout} />;
  }

  if (userType === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return null;
};

export default Index;
