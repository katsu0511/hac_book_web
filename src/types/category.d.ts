import { CategoryType } from '@/constants/CategoryType';

type Category = {
  id: string
  userId: string
  parentId: string
  name: string
  type: CategoryType
  description: string
  active: boolean
};

type Categories = {
  expense: Category[]
  income: Category[]
};

type CategoryForEdit = {
  category: Category
  categories: Categories
}

type CategoryDetail = {
  category: Category
  parent: string
}

type CategoryFormData = {
  id: string
  parentId: string
  name: string
  type: string
  description: string
};
