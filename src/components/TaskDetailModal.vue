<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "vue3-datepicker"
import { TaskBody, TaskPriorityLevel } from "../service/request_types";
import { useStore } from "../state"
import { FwbButton, FwbModal, FwbInput, FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue"
import { modifyGroupTask } from "../service/api/group";
import { TaskWsResponse } from "../service/response_types";
const props = defineProps<{
    closeModal: () => void
    groupId: number,
    taskId: number
}
>()
const store = useStore()
const task = store.getters.groupTask(props.groupId, props.taskId)

const taskName = ref("")
const taskPriorityLevel = ref(TaskPriorityLevel.Medium)
const taskExpiredAt = ref(new Date(task.expiredAt));


const onFormSubmit = async () => {
    const body: TaskBody = {
        name: taskName.value,
        status: task.status,
        priorityLevel: taskPriorityLevel.value,
        expiredAt: taskExpiredAt.value
    }

    const res = await modifyGroupTask(props.groupId, props.taskId, body)

    const websocket = store.getters.wsClient!;

    const wsBody: TaskWsResponse = {
        type: "Modified",
        task: res.data
    }
    websocket.publish({
        destination: `/app/group/${props.groupId}/task/${res.data.id}`,
        body: JSON.stringify(wsBody)
    })

    props.closeModal()
}
</script>
<template>
    <FwbModal size="5xl" @close="props.closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                {{ task.name }}
            </div>
        </template>
        <template #body>
            <FwbDropdown :text="taskPriorityLevel">
                <FwbListGroup>
                    <FwbListGroupItem v-for="p in TaskPriorityLevel" @click="() => taskPriorityLevel = p">
                        {{ p }}
                    </FwbListGroupItem>
                </FwbListGroup>
            </FwbDropdown>

            <DatePicker v-model="taskExpiredAt" />

            <FwbInput v-model="taskName" label="Task Name"></FwbInput>
            <FwbButton @click="onFormSubmit">Submit</FwbButton>
        </template>
        <template #footer>
            <div class="flex justify-between">

            </div>
        </template>

    </FwbModal>
</template>
<style scoped></style>
