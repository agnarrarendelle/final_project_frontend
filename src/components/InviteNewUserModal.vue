<script setup lang="ts">
import { FwbModal, FwbInput } from "flowbite-vue"
import { ref, reactive } from "vue"
import { UserResponse } from '../service/response_types';
import { searchUsers } from '../service/api/user';

const props = defineProps<{
    groupId: number,
    closeModal: () => void
    addNewUser: (userId: number) => void
}>()

const searchResult = reactive<UserResponse[]>([])
const searchTerm = ref("")

const onSearchButtonClicked = async () => {
    if (searchTerm.value.trim().length === 0)
        return

    const res = await searchUsers(props.groupId, searchTerm.value)
    searchResult.length = 0
    searchResult.push(...res.data)

}

</script>
<template>
    <!-- <FwbInput v-model="searchTerm" label="Search for User"></FwbInput>
    <button @click="onSearchButtonClicked">Search</button>
    <ul>
        <li v-for="u in searchResult">{{ u.name }}</li>
    </ul> -->

    <FwbModal @close="props.closeModal">
        <template #header>
            <FwbInput v-model="searchTerm" label="Search for User"></FwbInput>
            <button @click="onSearchButtonClicked">Search</button>
        </template>
        <template #body>
            <ul class="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto">
                <li v-for="user in searchResult">
                    <div class="px-4 py-5 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ user.id }}</h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ user.name }}</p>
                        </div>
                        <div class="mt-4 flex items-center justify-between">

                            <h6 @click="props.addNewUser(user.id)"
                                class="font-medium text-indigo-600 hover:text-indigo-500">Add</h6>
                        </div>
                    </div>
                </li>

            </ul>
        </template>
        <template #footer>

        </template>

    </FwbModal>
</template>

<style scoped></style>
