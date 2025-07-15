import React, { useEffect, useMemo } from "react";
import { useServiceTypes } from "@/hooks/useServiceTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/common/Loader";
import { IServiceType } from "@/types/dashboard_types";

interface ServiceTypeListProps {
  onSelect?: (serviceType: IServiceType) => void;
  className?: string;
  searchQuery?: string;
}

const ServiceTypeList: React.FC<ServiceTypeListProps> = ({ 
  onSelect, 
  className = "", 
  searchQuery = ""
}) => {
  const { serviceTypes, loading, error, refetch } = useServiceTypes();

  // Fetch service types on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Filter service types based on search query
  const filteredServiceTypes = useMemo(() => {
    if (!searchQuery) return serviceTypes;
    
    const lowercaseQuery = searchQuery.toLowerCase();
    return serviceTypes.filter(serviceType => {
      const name = serviceType.name || serviceType.laundryServiceTypeName || '';
      return name.toLowerCase().includes(lowercaseQuery) || 
        (serviceType.description && serviceType.description.toLowerCase().includes(lowercaseQuery));
    });
  }, [serviceTypes, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
        <h4 className="text-sm font-medium text-red-800 mb-1">Error loading service types</h4>
        <p className="text-sm text-red-700">{error}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-2 text-xs font-medium text-red-600 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (serviceTypes.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardContent className="py-6 text-center">
          <p className="text-gray-500">No service types available</p>
        </CardContent>
      </Card>
    );
  }

  if (filteredServiceTypes.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardContent className="py-6 text-center">
          <p className="text-gray-500">No service types match your search</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium">
        Service Types
        {searchQuery && <span className="text-sm font-normal ml-2 text-gray-500">
          ({filteredServiceTypes.length} results)
        </span>}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServiceTypes.map((serviceType, index) => (
          <Card 
            key={serviceType.id || serviceType.name || index} 
            className={`overflow-hidden hover:shadow-md transition-shadow ${onSelect ? 'cursor-pointer' : ''}`}
            onClick={onSelect ? () => onSelect(serviceType) : undefined}
          >
            <CardHeader className="bg-gray-50 border-b border-gray-100 py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-medium">{serviceType.name || serviceType.laundryServiceTypeName}</CardTitle>
                <Badge variant={serviceType.status === "ACTIVE" ? "default" : "secondary"}>
                  {serviceType.status || "ACTIVE"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-3 pb-4">
              <div className="space-y-3">
                {serviceType.description && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Description</h4>
                    <p className="text-sm text-gray-700">{serviceType.description}</p>
                  </div>
                )}

                {serviceType.price !== undefined && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Price</h4>
                    <p className="text-sm text-gray-700 font-medium">₦{serviceType.price.toLocaleString()}</p>
                  </div>
                )}
                
                {serviceType.createdAt && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500">Created</h4>
                    <p className="text-xs text-gray-600">
                      {new Date(serviceType.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeList; 