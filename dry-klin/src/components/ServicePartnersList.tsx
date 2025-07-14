import React from "react";
import { useServicePartners } from "@/hooks/useServicePartners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicePartnersList: React.FC = () => {
  const { servicePartners, loading, error, refetch } = useServicePartners();
  const navigate = useNavigate();

  const handleAddServicePartner = () => {
    navigate("/service-partners/add");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Service Partners
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Total: {servicePartners.length} partners
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddServicePartner}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Service Partner
          </Button>
          <Button
            onClick={refetch}
            variant="outline"
            className="flex items-center gap-2"
          >
            Refresh
          </Button>
        </div>
      </div>

      {servicePartners.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Service Partners Found
              </h3>
              <p className="text-gray-500">
                There are currently no service partners in the system.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicePartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{partner.companyName}</span>
                  <Badge variant="secondary">Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact Person</label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {partner.contactPersonName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {partner.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {partner.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {partner.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePartnersList; 