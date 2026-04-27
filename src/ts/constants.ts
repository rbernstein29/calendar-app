export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const today_date = new Date(Date.now())
export const today_day = today_date.getDate()
export const today_month_num = today_date.getMonth()
export const today_year = today_date.getFullYear()
export const today_date_full = months[today_month_num] + " " + today_day + ", " + today_year