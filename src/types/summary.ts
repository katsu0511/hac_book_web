export default interface Summary {
  income: number
  expense: number
  incomeBreakdown: Record<string, number>
  expenseBreakdown: Record<string, number>
}
