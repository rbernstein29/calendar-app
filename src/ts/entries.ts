import { ref } from 'vue'

export type Entry = {
    type: string
    name: string
    date: string
    time_start: string
    time_end: string
    list_id: number
    list_name: number
    completed: boolean
}

export const entries = ref<any[]>([])

export const addEntry = (entry: any) => {
    entries.value.push({ ...entry, id: Date.now() })
}

export const removeEvent = (id: number) => {
    entries.value = entries.value.filter(e => e.id !== id)
}