import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ServicePartners: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to User Management with Service Partners tab active
    navigate("/users", { replace: true, state: { tab: "service-partners" } });
  }, [navigate]);

  return null;
};

export default ServicePartners; 