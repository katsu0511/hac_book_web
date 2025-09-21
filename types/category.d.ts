type Category = {
  id: string
  user_id: string
  parent_id: string
  name: string
  type: CategoryType
  description: string
  is_active: boolean
};

type MyCategories = {
  expense: Category[]
  income: Category[]
};

type CategoryFormData = {
  parentId: string
  name: string
  type: string
  description: string
};
