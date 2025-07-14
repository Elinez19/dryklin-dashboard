import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { 
  fetchServiceTypes, 
  createServiceType, 
  editServiceType, 
  removeServiceType, 
  clearServiceTypeErrors 
} from "@/services/features/serviceTypeSlice";
import { IServiceType, IServiceTypeRequest } from "@/types/dashboard_types";

interface UseServiceTypesReturn {
  serviceTypes: IServiceType[];
  loading: boolean;
  error: string | null;
  addLoading: boolean;
  addError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  deleteLoading: boolean;
  deleteError: string | null;
  refetch: () => Promise<void>;
  addServiceType: (data: IServiceTypeRequest) => Promise<IServiceType | undefined>;
  updateServiceType: (id: string, data: Partial<IServiceTypeRequest>) => Promise<IServiceType | undefined>;
  deleteServiceType: (id: string) => Promise<string | undefined>;
  clearErrors: () => void;
}

export const useServiceTypes = (): UseServiceTypesReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    serviceTypes,
    serviceTypesLoading,
    serviceTypesError,
    addLoading,
    addError,
    updateLoading,
    updateError,
    deleteLoading,
    deleteError
  } = useSelector((state: RootState) => state.serviceTypes);

  useEffect(() => {
    dispatch(fetchServiceTypes());
  }, [dispatch]);

  const refetch = async (): Promise<void> => {
    await dispatch(fetchServiceTypes());
  };

  const addServiceTypeHandler = async (data: IServiceTypeRequest): Promise<IServiceType | undefined> => {
    try {
      const resultAction = await dispatch(createServiceType(data));
      if (createServiceType.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return undefined;
    } catch (error) {
      console.error("Failed to add service type:", error);
      return undefined;
    }
  };

  const updateServiceTypeHandler = async (
    id: string,
    data: Partial<IServiceTypeRequest>
  ): Promise<IServiceType | undefined> => {
    try {
      const resultAction = await dispatch(editServiceType({ id, data }));
      if (editServiceType.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return undefined;
    } catch (error) {
      console.error("Failed to update service type:", error);
      return undefined;
    }
  };

  const deleteServiceTypeHandler = async (id: string): Promise<string | undefined> => {
    try {
      const resultAction = await dispatch(removeServiceType(id));
      if (removeServiceType.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return undefined;
    } catch (error) {
      console.error("Failed to delete service type:", error);
      return undefined;
    }
  };

  const clearErrorsHandler = () => {
    dispatch(clearServiceTypeErrors());
  };

  return {
    serviceTypes,
    loading: serviceTypesLoading,
    error: serviceTypesError,
    addLoading,
    addError,
    updateLoading,
    updateError,
    deleteLoading,
    deleteError,
    refetch,
    addServiceType: addServiceTypeHandler,
    updateServiceType: updateServiceTypeHandler,
    deleteServiceType: deleteServiceTypeHandler,
    clearErrors: clearErrorsHandler
  };
}; 