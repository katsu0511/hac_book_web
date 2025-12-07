export default interface Summary {
  income: string
  expense: string
  incomeBreakdown: Record<string, string>
  expenseBreakdown: Record<string, string>
}
