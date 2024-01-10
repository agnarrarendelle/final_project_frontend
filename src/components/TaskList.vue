<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import CreateNewTaskModal from './CreateNewTaskModal.vue';
import { ref } from 'vue';
import { useStore } from '../state';
import TaskDetailModal from './TaskDetailModal.vue';

const store = useStore()

const props = defineProps<{
    groupId: number
}>()

const isNewTaskModalOpen = ref(false)
const isModifyTaskModalOpen = ref(false)
const selectedTaskId = ref(-1)

</script>
<template>
    <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div class="flex items-center justify-between pb-6">
            <div>
                <h2 class="font-semibold text-gray-700">Tasks</h2>
            </div>
        </div>
        <div class="overflow-y-hidden rounded-lg border">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                            <th class="px-5 py-3">ID</th>
                            <th class="px-5 py-3">Category</th>
                            <th class="px-5 py-3">Task Name</th>
                            <th class="px-5 py-3">Status</th>
                            <th class="px-5 py-3">Priority Level</th>
                            <th class="px-5 py-3">Expired At</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500">
                        <tr class="cursor-pointer" v-for="(task) in store.getters.groupTasks(props.groupId)" @click="() => {
                            selectedTaskId = task.id
                            isModifyTaskModalOpen = true
                        }">
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ task.id }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ task.categoryName }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ task.name }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ task.status }}</p>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{{
                                    task.priorityLevel }}</span>
                            </td>
                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                <p class="whitespace-no-wrap">{{ task.expiredAt }}</p>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <FwbButton @click="() => isNewTaskModalOpen = true">Create new Task</FwbButton>
    </div>

    <CreateNewTaskModal v-if="isNewTaskModalOpen" :group-id="props.groupId" :close-modal="() => isNewTaskModalOpen = false">
    </CreateNewTaskModal>
    <TaskDetailModal v-if="isModifyTaskModalOpen" :close-modal="() => isModifyTaskModalOpen = false"
        :group-id="props.groupId" :task-id="selectedTaskId"></TaskDetailModal>
</template>

<style scoped></style>
