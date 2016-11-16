import { getBjTime, formatDate, CDate } from 'js/util/_date'
import PAGE from 'js/util/_page'
import toast from 'js/util/_tip'

const Gon = {
  today: formatDate(getBjTime()),
  yesterday: formatDate(getBjTime(), { offset: -1 }),
  tomorrow: formatDate(getBjTime(), { offset: 1 }),
  dayBeforeYesterday: formatDate(getBjTime(), { offset: -2 }),
  toast,
  getBjTime,
  formatDate,
  Date: CDate,
  page: PAGE,
}

export default Gon
