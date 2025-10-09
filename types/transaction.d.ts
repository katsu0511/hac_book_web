type Transaction = {
  id: string
  userId: string
  categoryId: string
  amount: string
  currency: string
  description: string
  transactionDate: string
  createdAt: string
  updatedAt: string
};

type TransactionFormData = {
  id: string
  categoryId: string
  amount: string
  currency: string
  description: string
  transactionDate: string
};
