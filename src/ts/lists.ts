import { ref } from 'vue'

export type List = {
    id: number
    name: string
    color: string
    count: number
}

export const lists = ref<any[]>([{
    id: Date.now(),
    name: "Default",
    color: "red",
    count: 0,
}])

export const createList = (list: any) => {
    lists.value.push({ ...list, id: Date.now() })
}

export const removeList = (id: number) => {
    lists.value = lists.value.filter(l => l.id !== id)
}