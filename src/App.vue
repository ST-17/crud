<script setup lang="ts">
import { Button } from "primevue";
import Table from "./components/Table.vue";
import Dialog from "./components/Dialog.vue";
import { onMounted, ref } from "vue";
import { IProduct } from "./types";
import { useStore } from "./store";

const isDialogVisible = ref(false);

const store = useStore();

const handleCloseDialog = () => {
  isDialogVisible.value = false;
  store.getData();
};

const selectedData = ref();
const handleAdd = () => {
  selectedData.value = undefined;
  isDialogVisible.value = true;
};
const handleEdit = (data: IProduct) => {
  selectedData.value = data;
  isDialogVisible.value = true;
};

onMounted(() => {
  store.getData();
});
</script>

<template>
  <Dialog
    v-if="isDialogVisible"
    v-model="isDialogVisible"
    @close="handleCloseDialog"
    :selectedData="selectedData"
  />
  <div class="main w-screen h-screen">
    <div class="w-8 mx-auto">
      <div class="flex justify-content-end mb-3">
        <Button label="ADD" @click="handleAdd" />
      </div>
      <Table @edit="handleEdit"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  background-color: #f4f5f7;
  padding: 30px;
}
</style>
