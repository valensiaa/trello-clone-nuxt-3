<script setup>
import { useBoardStore } from '../stores/boardStore';
import { useRouter } from 'vue-router';

const props = defineProps(
    {
        column: Object,
        columnIndex: Number
    }
);

const boardStore = useBoardStore();
const editNameState = ref(false)
const newTaskName = ref('')

const deleteColumn = (index) => {
    boardStore.deleteColumn(index);
}

let router = useRouter();
const goToTask = (id) => {
    router.push(`/tasks/${id}`);
}

const addTask = () => {
    boardStore.addTask({
        columnIndex: props.columnIndex,
        task: newTaskName.value
    });
    newTaskName.value = '';
}

const pickupTask = (event, { fromColumnIndex, fromTaskIndex }) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('from-column-index', fromColumnIndex);
    event.dataTransfer.setData('from-task-index', fromTaskIndex);
    event.dataTransfer.setData('type', 'task');
}

const dropItem = (event, { toTaskIndex, toColumnIndex }) => {
    const type = event.dataTransfer.getData('type');
    const fromColumnIndex = event.dataTransfer.getData('from-column-index');

    if (type === 'task') {
        const fromTaskIndex = event.dataTransfer.getData('from-task-index');

        boardStore.moveTask({
            fromTaskIndex,
            toTaskIndex,
            fromColumnIndex,
            toColumnIndex
        });
    } else if (type === 'column') {
        boardStore.moveColumn({
            fromColumnIndex,
            toColumnIndex
        });
    }

}

const pickupColumn = (event, fromColumnIndex) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('type', 'column');
    event.dataTransfer.setData('from-column-index', fromColumnIndex);

}
</script>

<template>
    <UContainer class="column" draggable="true" @dragstart.self="pickupColumn($event, columnIndex)" @dragenter.prevent
        @dragover.prevent @drop.stop="dropItem($event, { toColumnIndex: columnIndex })">
        <div class="column-header mb-4">
            <UInput type="text" v-if="editNameState" v-model="column.name"></UInput>
            <h2 v-else><b>{{ column.name }}</b></h2>
            <div>
                <UButton icon="i-heroicons-pencil-square" class="mr-2" @click="editNameState = !editNameState">
                </UButton>
                <UButton icon="i-heroicons-trash" color="red" @click="deleteColumn(columnIndex)"></UButton>
            </div>
        </div>

        <ul>
            <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
                <UCard class="mb-4" @click="goToTask(task.id)" draggable="true" @dragstart="pickupTask($event, {
                    fromColumnIndex: columnIndex,
                    fromTaskIndex: taskIndex
                })" @drop.stop="dropItem($event, { toTaskIndex: taskIndex, toColumnIndex: columnIndex })">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>
        </ul>
        <UInput type="text" placeholder="Add a task" icon="i-heroicons-plus-circle-solid" v-model="newTaskName"
            @keyup.enter="addTask" />
    </UContainer>
</template>