import { useState, useEffect } from "react";
import { GetAllServicePartners } from "@/services/features/servicePartnerService";
import { IServicePartner } from "@/types/dashboard_types";

interface UseServicePartnersReturn {
  servicePartners: IServicePartner[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useServicePartners = (): UseServicePartnersReturn => {
  const [servicePartners, setServicePartners] = useState<IServicePartner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicePartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await GetAllServicePartners();
      setServicePartners(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch service partners";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicePartners();
  }, []);

  return {
    servicePartners,
    loading,
    error,
    refetch: fetchServicePartners,
  };
}; 