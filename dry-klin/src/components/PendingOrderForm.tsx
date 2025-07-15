import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useOrders } from "@/hooks/useOrders";
import { IPendingOrderRequest } from "@/types/dashboard_types";

const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  customerEmail: Yup.string().email("Invalid email").required("Customer email is required"),
  serviceType: Yup.string().required("Service type is required"),
  deliveryModePrice: Yup.string().required("Delivery mode is required"),
  items: Yup.array().of(
    Yup.object({
      itemName: Yup.string().required("Item name is required"),
      quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
    })
  ).min(1, "At least one item is required"),
});

const initialValues: IPendingOrderRequest = {
  customerName: "",
  customerEmail: "",
  serviceType: "CORPORATE",
  items: [
    {
      itemName: "",
      quantity: 1,
    },
  ],
  deliveryModePrice: "NORMAL",
};

const PendingOrderForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPendingOrder, error } = useOrders();

  const handleSubmit = async (values: IPendingOrderRequest) => {
    try {
      setIsSubmitting(true);
      await createPendingOrder(values);
    } catch {
      // Handle error silently or show user feedback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create Pending Order</h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name*
                </label>
                <Field
                  as={Input}
                  id="customerName"
                  name="customerName"
                  placeholder="Enter customer name"
                  className={`w-full px-3 py-2 border ${
                    errors.customerName && touched.customerName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
              </div>
              
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Email*
                </label>
                <Field
                  as={Input}
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  placeholder="Enter customer email"
                  className={`w-full px-3 py-2 border ${
                    errors.customerEmail && touched.customerEmail ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
              </div>
              
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type*
                </label>
                <Field
                  as="select"
                  id="serviceType"
                  name="serviceType"
                  className={`w-full px-3 py-2 border ${
                    errors.serviceType && touched.serviceType ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                >
                  <option value="CORPORATE">Corporate</option>
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="BULK">Bulk</option>
                </Field>
              </div>
              
              <div>
                <label htmlFor="deliveryModePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Mode*
                </label>
                <Field
                  as="select"
                  id="deliveryModePrice"
                  name="deliveryModePrice"
                  className={`w-full px-3 py-2 border ${
                    errors.deliveryModePrice && touched.deliveryModePrice ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                >
                  <option value="NORMAL">Normal</option>
                  <option value="EXPRESS">Express</option>
                </Field>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Items*
                </label>
                {values.items.map((_, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Field
                      as={Input}
                      name={`items.${index}.itemName`}
                      placeholder="Item name"
                      className={`flex-1 px-3 py-2 border ${
                        errors.items && Array.isArray(errors.items) && errors.items[index] && typeof errors.items[index] === 'object' && 'itemName' in errors.items[index] && touched.items && Array.isArray(touched.items) && touched.items[index] && typeof touched.items[index] === 'object' && 'itemName' in touched.items[index] ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    />
                    <Field
                      as={Input}
                      name={`items.${index}.quantity`}
                      type="number"
                      placeholder="Qty"
                      className={`w-20 px-3 py-2 border ${
                        errors.items && Array.isArray(errors.items) && errors.items[index] && typeof errors.items[index] === 'object' && 'quantity' in errors.items[index] && touched.items && Array.isArray(touched.items) && touched.items[index] && typeof touched.items[index] === 'object' && 'quantity' in touched.items[index] ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    />
                    {values.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const newItems = values.items.filter((_, i) => i !== index);
                          setFieldValue("items", newItems);
                        }}
                        className="px-2 py-2"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFieldValue("items", [...values.items, { itemName: "", quantity: 1 }]);
                  }}
                  className="w-full mt-2"
                >
                  Add Item
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isSubmitting ? "Creating..." : "Create Pending Order"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PendingOrderForm; 