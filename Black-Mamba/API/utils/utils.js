import z from 'zod'

export const decimalWithTwoPlaces = z.number().refine(value => {
  return Number(value.toFixed(2)) === value;
}, {
  message: "Number must have up to 2 decimal places"
});