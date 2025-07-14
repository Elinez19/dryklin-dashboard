import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceTypeList from "@/components/serviceTypes/ServiceTypeList";
import { useServiceTypes } from "@/hooks/useServiceTypes";
import AddServiceTypeModal from "@/components/serviceTypes/AddServiceTypeModal";

const ViewServiceTypes: React.FC = () => {
  const navigate = useNavigate();
  const { refetch } = useServiceTypes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleRefresh = () => {
    refetch();
  };

  const handleManage = () => {
    navigate("/service-types");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Service Types</h1>
            <p className="text-sm text-gray-500">View all available service types</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleRefresh}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleManage}
              className="flex items-center gap-1"
            >
              <span>Manage</span>
            </Button>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-1"
            >
              <Plus size={16} />
              <span>Add New</span>
            </Button>
          </div>
        </div>

        <Card className="border border-gray-200">
          <CardHeader className="py-4 bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-base font-medium">Filter Service Types</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search service types..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Types List */}
      <ServiceTypeList className="mt-6" searchQuery={searchQuery} />

      {/* Add Service Type Modal */}
      <AddServiceTypeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          refetch();
        }}
      />
    </div>
  );
};

export default ViewServiceTypes; 