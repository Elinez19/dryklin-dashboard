import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus } from "lucide-react";
import { addAgent } from "@/services/features/agentService";

const AddDeliveryAgent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      await addAgent({
        id: Date.now().toString(),
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        location: formData.address,
      });
      navigate("/users");
    } catch (error) {
      setError("Error adding delivery agent. Please try again.");
      console.error("Error adding delivery agent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/users");
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
          Back to Delivery Agents
        </Button>
        <div className="flex items-center gap-2">
          <Plus className="h-6 w-6 text-[#FF5C00]" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add Delivery Agent
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Add a new delivery agent to the system
        </p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Delivery Agent Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 md:flex-none bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white py-2 px-4"
              >
                {loading ? "Adding..." : "Add Delivery Agent"}
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

export default AddDeliveryAgent; 