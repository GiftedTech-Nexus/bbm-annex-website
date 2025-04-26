
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace("/login");
  }, []);
  return (
    <div className="container py-16 text-center text-lg font-medium">
      Logging Out...
    </div>
  );
}

export default Logout;
