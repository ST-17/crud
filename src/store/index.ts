import { defineStore } from "pinia";
import { ref } from "vue";
import { axiosInstance } from "../plugin/axios";
import { IError, IProduct } from "../types";

export const useStore = defineStore("store", () => {
  const errors = ref<IError>({
    product_name: undefined,
    product_amount: undefined,
  });
  const clearErrors = () => {
    errors.value = {
      product_name: undefined,
      product_amount: undefined,
    };
  };

  const crudDataIsLoading = ref(false);
  const crudData = ref();
  const getData = async () => {
    crudDataIsLoading.value = true;
    try {
      const { data } = await axiosInstance.get("sandbox/crud");
      crudData.value = [...data.content.rows];
    } catch (error) {
      console.log(error);
    } finally {
      crudDataIsLoading.value = false;
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axiosInstance.delete(`sandbox/crud/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const isCreating = ref(false);
  const createData = async (productData: IProduct) => {
    isCreating.value = true;
    try {
      const { data } = await axiosInstance.post("sandbox/crud", {
        ...productData,
      });
    } catch (err) {
      console.log(err);
      err.response.data.error.map((error) => {
        if (error.path === "product_name")
          errors.value.product_name = error.msg;
        else if (error.path === "product_amount")
          errors.value.product_amount = error.msg;
      });
      throw err
    } finally {
      isCreating.value = false;
    }
  };

  const isEditing = ref(false);
  const editData = async (id: number, productData: IProduct) => {
    isEditing.value = true;
    try {
      const { data } = await axiosInstance.put(`sandbox/crud/${id}`, {
        ...productData,
      });
    } catch (err) {
      console.log(err);
      err.response.data.error.map((error) => {
        if (error.path === "product_name")
          errors.value.product_name = error.msg;
        else if (error.path === "product_amount")
          errors.value.product_amount = error.msg;
      });
      throw err
    } finally {
      isEditing.value = false;
    }
  };

  return {
    errors,
    clearErrors,
    crudData,
    crudDataIsLoading,
    getData,
    deleteData,
    isCreating,
    createData,
    isEditing,
    editData,
  };
});
