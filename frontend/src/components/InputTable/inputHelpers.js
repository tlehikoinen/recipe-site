export const findBiggestIdInField = (array, field) => {
  if (array[field].length === 0) {
    return 0
  } else {
    return Math.max.apply(Math, array[field].map(v => { return v.id}))
  }
}