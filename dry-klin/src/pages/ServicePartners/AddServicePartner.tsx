import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowLeft, Plus } from "lucide-react";
import { AddServicePartner as AddServicePartnerAPI } from "@/services/features/servicePartnerService";
import { toast } from 'sonner';

const AddServicePartner: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await AddServicePartnerAPI({
        id: Date.now().toString(),
        companyName: formData.companyName,
        contactPersonName: formData.contactPersonName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      
      toast.success("Service partner added successfully!");
      // Navigate back to user management with service partners tab
      navigate("/users", { replace: true, state: { tab: "service-partners" } });
    } catch (error) {
      setError("Error adding service partner. Please try again.");
      toast.error("Error adding service partner. Please try again.");
      console.error("Error adding service partner:", error);
      // You can add toast notification here for better UX
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/service-partners");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Service Partners
        </Button>
        
        <div className="flex items-center gap-2">
          <Plus className="h-6 w-6 text-[#FF5C00]" />
          <h1 className="text-3xl font-bold text-[#FF5C00]">
            Add Service Partner
          </h1>
        </div>
        <p className="text-[#FF5C00] mt-2">
          Add a new service partner to the system
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Service Partner Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                <Input
                  id="contactPersonName"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  placeholder="Enter contact person name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows={3}
                required
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 md:flex-none bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white py-2 px-4"
              >
                {loading ? "Adding..." : "Add Service Partner"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="flex-1 md:flex-none px-4 py-2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddServicePartner; 