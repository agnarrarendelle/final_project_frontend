<script setup lang="ts">
import { ref } from 'vue';
import { FwbButton, FwbModal, FwbInput, FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue"
import { TaskPriorityLevel, TaskStatus, } from '../service/request_types';
import DatePicker from "vue3-datepicker"
import { addGroupTask } from '../service/api/group';
import { useStore } from "../state"
import { TaskWsResponse } from '../service/response_types';

const store = useStore()

const props = defineProps<{
    closeModal: () => void
    groupId: number,
}>()

const taskName = ref("")
const taskPriorityLevel = ref(TaskPriorityLevel.Medium)
const taskCategoryId = ref<number | null>(0)
const taskCategoryName = ref("Selected a Category")
const taskExpiredAt = ref(new Date());

const onFormSubmit = async () => {
    console.log(taskName.value)
    console.log(taskPriorityLevel.value)
    console.log(taskCategoryId.value)
    console.log(taskExpiredAt.value)
    if (!taskCategoryId.value)
        return
    if (taskName.value.trim().length === 0)
        return

    const res = await addGroupTask(props.groupId, taskCategoryId.value, {
        name: taskName.value,
        status: TaskStatus.InProgress,
        priorityLevel: taskPriorityLevel.value,
        expiredAt: taskExpiredAt.value
    })

    const websocket = store.getters.wsClient!;

    const { id, name, status, priorityLevel, expiredAt, categoryName } = res.data

    const body: TaskWsResponse = {
        type: "Created",
        task: {
            id,
            name,
            status,
            priorityLevel,
            expiredAt,
            categoryName,
        }
    }

    websocket.publish({
        destination: `/app/group/${props.groupId}/task/${res.data.id}`,
        body: JSON.stringify(body)
    })

    props.closeModal()
}


</script>
<template>
    <FwbModal @close="props.closeModal">
        <template #header>
            <h1>Create new group</h1>
        </template>
        <template #body>
            <FwbDropdown :text="taskCategoryName">
                <FwbListGroup>
                    <FwbListGroupItem v-for="c in store.getters.groupCategories(props.groupId)" @click="() => {
                        taskCategoryName = c.name
                        taskCategoryId = c.id
                    }">
                        {{ c.name }}
                    </FwbListGroupItem>
                </FwbListGroup>
            </FwbDropdown>
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
        </template>
    </FwbModal>
</template>

<style scoped></style>
