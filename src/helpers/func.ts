import { useRouter } from 'vue-router'
import api from './api'

const addZero = (v: number) => (v < 10 ? `0${v}` : `${v}`)

const convertDate = (value = new Date(), type: string | null) => {
  const date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}, ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    : `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}`
}

type month = {
  value: number
  name: string
}

const months: month[] = [
  { value: 0, name: 'Январь' },
  { value: 1, name: 'Февраль' },
  { value: 2, name: 'Март' },
  { value: 3, name: 'Апрель' },
  { value: 4, name: 'Май' },
  { value: 5, name: 'Июнь' },
  { value: 6, name: 'Июль' },
  { value: 7, name: 'Август' },
  { value: 8, name: 'Сентябрь' },
  { value: 9, name: 'Октябрь' },
  { value: 10, name: 'Ноябрь' },
  { value: 11, name: 'Декабрь' }
]

const generateExcel = async (url: string) => {
  const res = await api.get<string>(url)
  await download(res.data)
}

const download = async (filepath: string) => {
  console.log(filepath)
  // const file_array: string[] = filepath.split('/')
  // const filename = file_array?.at(-1)
  api
    .get(filepath, {
      responseType: 'blob'
    })
    .then((response) => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]))
      const fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', 'report.xlsx')
      document.body.appendChild(fileLink)
      fileLink.click()
    })
}

export { convertDate, months, generateExcel }
