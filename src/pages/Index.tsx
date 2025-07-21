import EmployeeDashboard from "@/components/EmployeeDashboard";

const Index = () => {
  const mockUser = {
    name: "John Doe",
    email: "john.doe@lg.com",
    department: "Engineering",
    points: 850,
    badges: 5,
    avatar: "avatar-1",
    avatarBg: "bg-1"
  };

  return <EmployeeDashboard user={mockUser} onLogout={() => {}} />;
};

export default Index;
