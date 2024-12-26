<script setup>
// import { useRoute } from 'vue-router';

const boardStore = useBoardStore();
const newColumnName = ref('')
const route = useRoute();
const router = useRouter();

const isModalOpen = computed(() => {
    return route.name === 'index-tasks-id';
});

const addNewColumn = () => {
    boardStore.addColumn(newColumnName.value);
    newColumnName.value = '';
};

const closeModal = () => {
    router.push('/')
};

</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <BoardColumn v-for="(column, columnIndex) in boardStore.board.columns" :key="column.id" :column="column"
                :columnIndex="columnIndex" />

            <UContainer class="column">
                <UInput type="text" placeholder="Add a column" icon="i-heroicons-plus-circle-solid"
                    @keyup.enter="addNewColumn" v-model="newColumnName" />
            </UContainer>
        </main>
        <div class="task-bg" v-show="isModalOpen" @click.self="closeModal">
            <NuxtPage :key="route.fullPath" />
        </div>
    </div>
</template>
