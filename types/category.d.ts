type Category = {
  id: string
  userId: string
  parentId: string
  name: string
  type: CategoryType
  description: string
  active: boolean
};

type MyCategories = {
  expense: Category[]
  income: Category[]
};

type CategoryFormData = {
  id: string
  parentId: string
  name: string
  type: string
  description: string
};
