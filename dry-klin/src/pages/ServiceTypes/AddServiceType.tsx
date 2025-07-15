import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useServiceTypes } from "@/hooks/useServiceTypes";

const validationSchema = Yup.object({
  laundryServiceTypeName: Yup.string().required("Service type name is required"),
  description: Yup.string(),
  price: Yup.number().min(0, "Price must be positive or zero"),
});

const initialValues = {
  laundryServiceTypeName: "",
  description: "",
  price: undefined,
};

const AddServiceType: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addServiceType, addError } = useServiceTypes();
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsSubmitting(true);
      const payload: typeof initialValues = {
        laundryServiceTypeName: values.laundryServiceTypeName,
        description: values.description,
        price: values.price,
      };
      const result = await addServiceType(payload);
      setIsSubmitting(false);
      if (result) {
        navigate("/services");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error adding service type:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Service Type</h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="laundryServiceTypeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type Name*
                </label>
                <Field
                  as={Input}
                  id="laundryServiceTypeName"
                  name="laundryServiceTypeName"
                  placeholder="Enter service type name"
                  className={`w-full px-3 py-2 border ${
                    errors.laundryServiceTypeName && touched.laundryServiceTypeName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
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
              </div>
              {addError && (
                <div className="text-red-500 text-sm mt-2">{addError}</div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/services")}
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

export default AddServiceType; 