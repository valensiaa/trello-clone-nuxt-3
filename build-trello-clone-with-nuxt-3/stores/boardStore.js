import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";
import { v4 as uuid } from 'uuid';


export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData);

    const getTask = computed(() => {
        return taskId => {
            for (let column of board.value.columns) {
                const task = column.tasks.find(task => task.id === taskId);
                if(task) return task;
            }
        }
    })

    function addColumn(columnName) {
        board.value.columns.push({
            name: columnName,
            tasks: []
        })
    }

    function deleteColumn(columnIndex) {
        board.value.columns.splice(columnIndex, 1);
    }

    function addTask({columnIndex, task}) {
        board.value.columns[columnIndex].tasks.push({
            id: uuid(),
            name: task,
            description: '',
        })
    }

    function deleteTask(id) {
        for (let column of board.value.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === id);
            if(taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1);
                return;
            }
        }
    }

    function moveTask({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}) {
        const task = board.value.columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0];
        board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    }

    function moveColumn({fromColumnIndex, toColumnIndex}) {
        const column = board.value.columns.splice(fromColumnIndex, 1)[0];
        board.value.columns.splice(toColumnIndex, 0, column);
    }



    return {
        //  Store
        board,
        //  Getters
        getTask,
        //  Actions
        addColumn,
        deleteColumn,
        addTask,
        deleteTask,
        moveTask,
        moveColumn
    }
})