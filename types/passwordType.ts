// Réexport des types du core SafeKeys Mobile pour compatibilité
export type {
  MobileSyncResult,
  PasswordEntry,
  VaultData,
  VaultSettings,
} from "safekeys-core/dist/adapters";

// Type legacy pour compatibilité avec l'ancienne interface
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
