<script setup lang="ts">
import { ref } from "vue"
import { useStore } from '../state';
import { FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue'
import InviteNewUserModal from "../components/InviteNewUserModal.vue"
const store = useStore()

const props = defineProps<{
    groupId: number
}>()

const isModalOpen = ref(false)

</script>
<template>
    <h1>Group Members</h1>
    <FwbListGroup>
        <FwbListGroupItem hover v-for="u in store.getters.groupUsers(props.groupId)" class="block">{{ u.name }}
        </FwbListGroupItem>
    </FwbListGroup>
    <FwbButton @click="() => isModalOpen = true">Invite new Member</FwbButton>

    <InviteNewUserModal v-if="isModalOpen" :group-id="groupId"
        :close-modal="() => isModalOpen = false"></InviteNewUserModal>
</template>

<style scoped></style>

