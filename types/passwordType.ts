type Password = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  type: "email" | "bank" | "social" | "other";
};

export default Password;
