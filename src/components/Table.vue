<script setup lang="ts">
import { Button } from "primevue";
import { ProgressSpinner } from "primevue";
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from "primevue/confirmpopup"
import { useStore } from "../store";

const confirm = useConfirm();
const store = useStore()

const emits = defineEmits(["edit"]);

const onDeleteClick = (id: number) => {
  confirm.require({
    message: "Do you really want to delete?",
    group: "deletion",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: () => {
      store.deleteData(id)
    },
  });
};
</script>

<template>
  <div v-if="store.crudDataIsLoading" class="flex justify-center">
    <ProgressSpinner />
  </div>
  <div class="w-full overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.crudData?.length === 0">
          <td colspan="3" class="text-center">No data</td>
        </tr>
        <tr v-else v-for="data in store.crudData" :key="data.id">
          <td>{{ data.product_name ?? "-" }}</td>
          <td>{{ data.product_amount ?? "-" }}</td>
          <td>
            <Button
              label="EDIT"
              severity="warn"
              class="mr-2"
              @click="emits('edit', data)"
            />
            <ConfirmPopup group="deletion"></ConfirmPopup>
            <Button
              label="DELETE"
              severity="danger"
              @click="onDeleteClick(data.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  background-color: #e6e6e4;
}

th,
td {
  padding: 12px;
  border: 2px solid #dededd;
}

th {
  color: #10b981;
  font-weight: 600;
}

tbody tr td:nth-child(even) {
  background-color: #efefed;
}
</style>
