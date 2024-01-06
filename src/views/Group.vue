<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { FwbButton } from 'flowbite-vue'
import { CategoryResponse, TaskResponse, UserResponse } from '../service/response_types';
import { addGroupUser, getGroupCategories, getGroupTasks, getGroupUsers } from '../service/api/group';
import CategoryList from '../components/CategoryList.vue';
import TaskList from '../components/TaskList.vue';
import UserList from '../components/UserList.vue';
import InviteNewUserModal from '../components/InviteNewUserModal.vue';


const route = useRoute()
const groupId = route.params.id as unknown as number
const categories = reactive<CategoryResponse[]>([])
const tasks = reactive<TaskResponse[]>([])
const users = reactive<UserResponse[]>([])

const isModalOpen = ref(false)

onMounted(async () => {
    const categoriesResponse = await getGroupCategories(groupId)
    const tasksResponse = await getGroupTasks(groupId)
    const usersResponse = await getGroupUsers(groupId)

    categories.push(...categoriesResponse.data)
    tasks.push(...tasksResponse.data)
    users.push(...usersResponse.data)

    console.log(categoriesResponse)
    console.log(tasksResponse)
})

const addNewUser = async (userId: number) => {
    const res = await addGroupUser(groupId, userId)
    users.push(res.data)
    isModalOpen.value = false
}

</script>
<template>
    <CategoryList :group-id="groupId" :categories="categories"></CategoryList>
    <TaskList :group-id="groupId" :categories="categories" :tasks="tasks"></TaskList>
    <UserList :users="users"></UserList>
    <FwbButton @click="() => isModalOpen = true">Invite new Member</FwbButton>

    <InviteNewUserModal v-if="isModalOpen" :group-id="groupId" :add-new-user="addNewUser"
        :close-modal="() => isModalOpen = false"></InviteNewUserModal>
</template>

<style scoped></style>
