import { CategoryType } from '@/constants/CategoryType';
import { Categories } from '@/types/category';

type Transaction = {
  id: string
  userId: string
  categoryId: string
  categoryName: string
  categoryType: CategoryType
  amount: string
  currency: string
  description: string
  transactionDate: string
  createdAt: string
  updatedAt: string
};

type TransactionForEdit = {
  transaction: Transaction
  categories: Categories
}

type TransactionFormData = {
  id: string
  categoryId: string
  amount: string
  currency: string
  description: string
  transactionDate: string
};
