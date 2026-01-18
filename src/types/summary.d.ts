export type Summary = {
  expense: number
  income: number
  expenseBreakdown: ExpenseBreakdown[]
}


export type ExpenseBreakdown = {
  categoryId: number;
  categoryName: string;
  total: number;
};
