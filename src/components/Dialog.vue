<script setup lang="ts">
import { Dialog } from "primevue";
import { InputText } from "primevue";
import { InputNumber } from "primevue";
import { Button } from "primevue";
import { onMounted, ref } from "vue";
import { IProduct } from "../types";
import { useStore } from "../store";

const modelValue = defineModel();

const store = useStore();

const emits = defineEmits(["close"]);
const props = defineProps<{
  selectedData?: any;
}>();

const isCreat = ref(true);

const product = ref<IProduct>({
  id: undefined,
  product_name: undefined,
  product_amount: undefined,
});

const createData = async () => {
  try {
    await store.createData(product.value);
    emits("close");
  } catch (error) {
    console.log(error);
  }
};

const editData = async () => {
  try {
    await store.editData(props.selectedData.id, product.value);
    emits("close");
  } catch (error) {
    console.log(error);
  }
};

const handleClick = () => {
  isCreat.value ? createData() : editData();
};

onMounted(() => {
  if (props.selectedData) {
    isCreat.value = false;
    product.value = { ...props.selectedData };
  }
});
</script>

<template>
  <Dialog
    v-model:visible="modelValue"
    @update:visible="store.clearErrors"
    modal
    :header="isCreat ? 'Creation' : 'Redaction'"
    :draggable="false"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-column gap-3">
      <div class="flex flex-column">
        <InputText
          v-model="product.product_name"
          type="text"
          placeholder="Name"
          :invalid="store.errors.product_name"
        />
        <span
          v-if="store.errors.product_name"
          class="text-sm"
          style="color: red"
          >{{ store.errors.product_name }}</span
        >
      </div>
      <div class="flex flex-column">
        <InputNumber
          v-model="product.product_amount"
          placeholder="Amount"
          :invalid="store.errors.product_amount"
        />
        <span
          v-if="store.errors.product_amount"
          class="text-sm"
          style="color: red"
          >{{ store.errors.product_amount }}</span
        >
      </div>
      <Button
        :label="isCreat ? 'Add' : 'Edit'"
        @click="handleClick"
        :loading="store.isCreating || store.isEditing"
      />
    </div>
  </Dialog>
</template>

<style scoped lang="scss"></style>
