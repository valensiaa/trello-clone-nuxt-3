<script setup>
import { useBoardStore } from '/stores/boardStore';

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const toast = useToast();

const task = computed(() => {
    return boardStore.getTask(route.params.id);
})

const deleteTask = () => {
    toast.add({
        title: 'Task deleted',
        description: `${task.value.name} has been deleted`,
        icon: 'i-heroicons-trash',
        color: 'red'
    })
    boardStore.deleteTask(route.params.id);
    router.push('/');
}
</script>

<template>
    <div class="task-wrapper">
        <div v-if="task" class="task-view">
            <UFormGroup label="Name" class="mb-3 w-full">
                <UInput type="text" v-model="task.name" />
            </UFormGroup>
            <UFormGroup label="Description" class="w-full mb-4">
                <UTextarea v-model="task.description" />
            </UFormGroup>
            <UButton icon="i-heroicons-trash" color="red" @click="deleteTask">Delete task</UButton>
        </div>
        <div v-else>
            <h1>Task not found</h1>
        </div>
    </div>
</template>