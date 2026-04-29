import { ref } from 'vue'
import { remove_entry } from './entries'
import type { Entry } from './entries'

export type List = {
    id: number
    name: string
    color: string
    count: number
    entries: Entry[]
}

export const lists = ref<List[]>([{
    id: 0,
    name: "Default",
    color: "red",
    count: 0,
    entries: [],
}])

export const create_list = (list: any) => {
    lists.value.push({ ...list, id: Date.now() })
}

export const update_list = (list_id: number, updated_name: string, updated_color: string) => {
    const list = lists.value.find(l => l.id === list_id)
    if (list !== undefined) {
        list.name = updated_name
        list.color = updated_color
    }
}

export const remove_list = (list: List) => {
    for (const entry of list.entries) {
        remove_entry(entry)
    }
    lists.value = lists.value.filter(l => l.id !== list.id)
}