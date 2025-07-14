import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IServiceTypeRequest } from "@/types/dashboard_types";
import { useServiceTypes } from "@/hooks/useServiceTypes";

interface AddServiceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Service type name is required"),
  description: Yup.string(),
  price: Yup.number().min(0, "Price must be positive or zero"),
});

const initialValues: IServiceTypeRequest = {
  name: "",
  description: "",
  price: undefined,
};

const AddServiceTypeModal: React.FC<AddServiceTypeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addServiceType, addError } = useServiceTypes();

  if (!isOpen) return null;

  const handleSubmit = async (values: IServiceTypeRequest) => {
    try {
      setIsSubmitting(true);
      const result = await addServiceType(values);
      setIsSubmitting(false);
      
      if (result) {
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error adding service type:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Service Type</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type Name*
                </label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Enter service type name"
                  className={`w-full px-3 py-2 border ${
                    errors.name && touched.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  className={`w-full px-3 py-2 border ${
                    errors.description && touched.description ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Field
                  as={Input}
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  className={`w-full px-3 py-2 border ${
                    errors.price && touched.price ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {addError && (
                <div className="text-red-500 text-sm mt-2">{addError}</div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isSubmitting ? "Adding..." : "Add Service Type"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddServiceTypeModal; 