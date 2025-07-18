import React, { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useServiceTypes } from "@/hooks/useServiceTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddServiceTypeModal from "@/components/serviceTypes/AddServiceTypeModal";
import Loader from "@/components/common/Loader";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { IServiceType } from "@/types/dashboard_types";
import { MoreDotIcon } from "@/assets/icons";

const ServiceTypes: React.FC = () => {
  const navigate = useNavigate();
  const {
    serviceTypes,
    loading,
    error,
    deleteServiceType,
    deleteLoading
  } = useServiceTypes();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleViewClick = () => {
    navigate("/service-types/view");
  };

  const handleEditClick = (_serviceType: IServiceType) => {
    // Edit functionality will be implemented in future task
    // TODO: Implement edit functionality for service type
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteServiceType(deleteId);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
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
              <p className="text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Service Types</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleViewClick}
            className="flex items-center gap-2"
          >
            <Eye size={16} />
            <span>View All</span>
          </Button>
          <Button 
            onClick={handleAddClick}
            className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Service Type</span>
          </Button>
        </div>
      </div>

      {serviceTypes.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-gray-500">No service types found. Click "Add Service Type" to create one.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceTypes.map((serviceType, index) => (
            <Card key={serviceType.id || serviceType.name || index} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">{serviceType.name || serviceType.laundryServiceTypeName}</CardTitle>
                  <Badge variant={serviceType.status === "ACTIVE" ? "default" : "secondary"}>
                    {serviceType.status || "ACTIVE"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {serviceType.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="text-sm text-gray-700">{serviceType.description}</p>
                    </div>
                  )}

                  {serviceType.price !== undefined && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Price</h4>
                      <p className="text-sm text-gray-700">₦{serviceType.price.toLocaleString()}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreDotIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditClick(serviceType)}
                          className="text-blue-600"
                        >
                          <Pencil size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(serviceType.id || serviceType.name || '')}
                          className="text-red-600"
                          disabled={deleteLoading}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Service Type Modal */}
      <AddServiceTypeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Service Type"
        message="Are you sure you want to delete this service type? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
      />
    </div>
  );
};

export default ServiceTypes; 