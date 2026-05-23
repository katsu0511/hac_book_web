type Profile = {
  user: User
  setting: Setting
};

type User = {
  id: string
  name: string
  email: string
  icon: string
};

type Setting = {
  userId: string
  language: string
  currency: string
  monthlySavingGoal: string
};
