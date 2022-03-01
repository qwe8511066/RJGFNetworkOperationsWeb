import moment from 'moment'

export function momentFilter(value, format = 'YYYY-MM-DD') {
  return moment(value).format(format)
}
export function momentTimeFilter(value, format = 'YYYY-MM-DD hh:mm:ss') {
  if (value != null) {
    return moment(value).format(format)
  }
}