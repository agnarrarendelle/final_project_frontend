<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { FwbButton } from 'flowbite-vue';
import { getChat, getGroupCategories, getGroupTasks, getGroupUsers } from '../service/api/group';
import CategoryList from '../components/CategoryList.vue';
import TaskList from '../components/TaskList.vue';
import UserList from '../components/UserList.vue';
import ChatRoom from '../components/ChatRoom.vue';
import { useStore } from '../state';
import { MutationTypes } from '../state/mutation-types';

const store = useStore()

const route = useRoute()
const groupId = parseInt(route.params.id as unknown as string)

const isChatRoomOpen = ref(false)

onMounted(async () => {
    const categoriesResponse = await getGroupCategories(groupId)
    const tasksResponse = await getGroupTasks(groupId)
    const usersResponse = await getGroupUsers(groupId)
    const groupChatMessages = await getChat(groupId);

    categoriesResponse.data.forEach(c => store.commit(MutationTypes.ADD_GROUP_CATEGORY, { groupId, category: c }))
    tasksResponse.data.forEach(t => store.commit(MutationTypes.ADD_GROUP_TASK, { groupId, task: t }))
    usersResponse.data.forEach(u => store.commit(MutationTypes.ADD_GROUP_USER, { groupId, user: u }))

    store.commit(MutationTypes.ADD_WS_GROUP_CHAT_SUBSCRIPTION, groupId)
    store.commit(MutationTypes.ADD_WS_GROUP_CHAT_MESSAGES, {groupId:groupId, messages:groupChatMessages.data})
})



</script>
<template>
    <CategoryList :group-id="groupId"></CategoryList>
    <TaskList :group-id="groupId"></TaskList>
    <UserList :group-id="groupId"></UserList>
    <ChatRoom v-if="isChatRoomOpen" :close-modal="() => isChatRoomOpen = false" :group-id="groupId"></ChatRoom>
    <FwbButton @click="() => isChatRoomOpen = true">Open Chat Room</FwbButton>
</template>

<style scoped></style>
