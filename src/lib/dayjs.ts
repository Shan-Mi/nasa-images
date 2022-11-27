import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

const formatDate = (date: string): string => dayjs(date).format('MMM Do YYYY')

const isValid = (date: string): boolean => dayjs(date).isValid()

export { formatDate, isValid }
