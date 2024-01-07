<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getGroupCategories, getGroupTasks, getGroupUsers } from '../service/api/group';
import CategoryList from '../components/CategoryList.vue';
import TaskList from '../components/TaskList.vue';
import UserList from '../components/UserList.vue';
import { useStore } from '../state';
import { MutationTypes } from '../state/mutation-types';

const store = useStore()

const route = useRoute()
const groupId = parseInt(route.params.id as unknown as string)


onMounted(async () => {
    const categoriesResponse = await getGroupCategories(groupId)
    const tasksResponse = await getGroupTasks(groupId)
    const usersResponse = await getGroupUsers(groupId)

    categoriesResponse.data.forEach(c => store.commit(MutationTypes.ADD_GROUP_CATEGORY, { groupId, category: c }))
    tasksResponse.data.forEach(t => store.commit(MutationTypes.ADD_GROUP_TASK, { groupId, task: t }))
    usersResponse.data.forEach(u => store.commit(MutationTypes.ADD_GROUP_USER, { groupId, user: u }))

})



</script>
<template>
    <CategoryList :group-id="groupId"></CategoryList>
    <TaskList :group-id="groupId"></TaskList>
    <UserList :group-id="groupId"></UserList>
</template>

<style scoped></style>
