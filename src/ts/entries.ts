import { ref } from 'vue'
import type { List } from './lists'

export type Entry = {
    id: number,
    type: string
    name: string
    date: string
    time_start: string
    time_end: string
    list: List
    completed: boolean
}

export const entries = ref<Entry[]>([])

export const add_entry = (entry: any) => {
    const e = {...entry, id: Date.now()}
    entries.value.push(e)
    entry.list.entries.push(e)
    entry.list.count++
}

export const update_entry = (
    entry_id: number,
    updated_type: string,
    updated_name: string,
    updated_date: string,
    updated_time_start: string,
    updated_time_end: string,
    updated_list: List) => {

        const entry = entries.value.find(e => e.id === entry_id)
        if (entry !== undefined) {
            entry.name = updated_name
            entry.type = updated_type
            entry.date = updated_date
            entry.time_start = updated_time_start
            entry.time_end = updated_time_end
            entry.list = updated_list
        }
}

export const remove_entry = (entry: Entry) => {
    entry.list.entries = entry.list.entries.filter(e => e.id !== entry.id)
    entry.list.count--
    entries.value = entries.value.filter(e => e.id !== entry.id)
}