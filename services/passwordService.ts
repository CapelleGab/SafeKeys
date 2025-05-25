import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import {
  EncryptedVault,
  MobileSyncResult,
  PasswordEntry,
  SafeKeysMobile,
} from "safekeys-core/dist/adapters";

class PasswordService {
  private safeKeys: SafeKeysMobile | null = null;
  private isInitialized = false;
  private storageKey = "safekeys_vault_encrypted";

  /**
   * Initialise le service avec le mot de passe maître
   */
  async initialize(masterPassword: string): Promise<void> {
    try {
      this.safeKeys = new SafeKeysMobile();
      const deviceId =
        Device.osInternalBuildId || Device.modelId || "mobile-device";

      // Essayer de charger un vault existant depuis le stockage local
      const existingVault = await AsyncStorage.getItem(this.storageKey);

      if (existingVault) {
        try {
          const encryptedVault: EncryptedVault = JSON.parse(existingVault);
          await this.safeKeys.loadFromEncrypted(encryptedVault, masterPassword);
          console.log("Vault existant chargé avec succès");
        } catch (error) {
          console.error("Erreur lors du déchiffrement:", error);
          throw new Error("Mot de passe incorrect");
        }
      } else {
        // Créer un nouveau vault en mode local
        await this.safeKeys.initialize(masterPassword, deviceId);
        await this.saveVault();
        console.log("Nouveau vault créé");
      }

      this.isInitialized = true;
      await AsyncStorage.setItem("safekeys_initialized", "true");
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      throw error;
    }
  }

  /**
   * Sauvegarde le vault chiffré dans le stockage local
   */
  private async saveVault(): Promise<void> {
    if (!this.safeKeys) return;

    try {
      const encryptedVault = await this.safeKeys.exportEncrypted();
      await AsyncStorage.setItem(
        this.storageKey,
        JSON.stringify(encryptedVault)
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      throw error;
    }
  }

  /**
   * Vérifie si le service est initialisé
   */
  async isServiceInitialized(): Promise<boolean> {
    console.log("🔍 Vérification de l'état du service...");
    console.log("- isInitialized:", this.isInitialized);
    console.log("- safeKeys existe:", !!this.safeKeys);

    if (this.isInitialized && this.safeKeys) {
      console.log("✅ Service déjà initialisé en mémoire");
      return true;
    }

    const initialized = await AsyncStorage.getItem("safekeys_initialized");
    const hasVault = await AsyncStorage.getItem(this.storageKey);

    console.log("- Flag initialized:", initialized);
    console.log("- Vault existe:", !!hasVault);

    const result = initialized === "true" && hasVault !== null;
    console.log("- Résultat final:", result);

    return result;
  }

  /**
   * Ajoute un nouveau mot de passe
   */
  async addPassword(passwordData: {
    title: string;
    username: string;
    password: string;
    url?: string;
    category?: string;
    notes?: string;
    tags?: string[];
  }): Promise<string> {
    await this.ensureInitialized();

    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    const entryId = await this.safeKeys.addEntry(passwordData);
    await this.saveVault();
    return entryId;
  }

  /**
   * Tente de recharger le vault depuis le stockage si nécessaire
   */
  private async ensureInitialized(): Promise<void> {
    if (this.isInitialized && this.safeKeys) {
      return; // Déjà initialisé
    }

    console.log("🔄 Tentative de rechargement du vault...");

    const hasVault = await AsyncStorage.getItem(this.storageKey);
    if (!hasVault) {
      throw new Error("Aucun vault trouvé. Veuillez vous reconnecter.");
    }

    // Le vault existe mais le service n'est pas initialisé
    // On ne peut pas le déchiffrer sans le mot de passe maître
    throw new Error("Session expirée. Veuillez vous reconnecter.");
  }

  /**
   * Récupère tous les mots de passe
   */
  async getAllPasswords(): Promise<PasswordEntry[]> {
    console.log("📋 Tentative de récupération des mots de passe...");
    console.log("- Service initialisé:", this.isInitialized);
    console.log("- SafeKeys existe:", !!this.safeKeys);
    console.log("- SafeKeys initialisé:", this.safeKeys?.initialized);

    // Vérifier et recharger si nécessaire
    await this.ensureInitialized();

    if (!this.safeKeys) {
      console.error("❌ SafeKeys n'est pas défini");
      throw new Error("Service non initialisé");
    }

    if (!this.safeKeys.initialized) {
      console.error("❌ SafeKeys n'est pas initialisé");
      throw new Error("SafeKeys non initialisé");
    }

    console.log("✅ Récupération des entrées...");
    return this.safeKeys.getAllEntries();
  }

  /**
   * Met à jour un mot de passe
   */
  async updatePassword(
    entryId: string,
    updates: Partial<Omit<PasswordEntry, "id" | "createdAt" | "lastModifiedAt">>
  ): Promise<void> {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    await this.safeKeys.updateEntry(entryId, updates);
    await this.saveVault();
  }

  /**
   * Supprime un mot de passe
   */
  async deletePassword(entryId: string): Promise<void> {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    await this.safeKeys.deleteEntry(entryId);
    await this.saveVault();
  }

  /**
   * Recherche des mots de passe
   */
  searchPasswords(query: string): PasswordEntry[] {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    return this.safeKeys.searchEntries(query);
  }

  /**
   * Synchronise avec le serveur distant (mode local uniquement)
   */
  async sync(): Promise<MobileSyncResult> {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    const result = await this.safeKeys.sync();

    // Sauvegarder localement après sync
    await this.saveVault();

    return result;
  }

  /**
   * Génère un mot de passe selon les paramètres du vault
   */
  generatePassword(): string {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    return this.safeKeys.generatePassword();
  }

  /**
   * Obtient les paramètres du vault
   */
  getSettings() {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    return this.safeKeys.getSettings();
  }

  /**
   * Met à jour les paramètres du vault
   */
  async updateSettings(settings: any): Promise<void> {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    await this.safeKeys.updateSettings(settings);
    await this.saveVault();
  }

  /**
   * Obtient les métadonnées du vault
   */
  getMetadata() {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    return this.safeKeys.getMetadata();
  }

  /**
   * Obtient les catégories disponibles
   */
  getCategories(): string[] {
    if (!this.safeKeys) {
      throw new Error("Service non initialisé");
    }

    const settings = this.safeKeys.getSettings();
    // Les catégories sont maintenant dans le vault principal
    return ["email", "bank", "social", "work", "other"]; // Valeurs par défaut
  }

  /**
   * Déconnexion - nettoie les données sensibles
   */
  async logout(): Promise<void> {
    if (this.safeKeys) {
      this.safeKeys.cleanup();
    }
    this.safeKeys = null;
    this.isInitialized = false;
    await AsyncStorage.removeItem("safekeys_initialized");
    // Note: on garde le vault chiffré pour permettre la reconnexion
  }

  /**
   * Supprime complètement le vault (attention !)
   */
  async deleteVault(): Promise<void> {
    await AsyncStorage.removeItem(this.storageKey);
    await AsyncStorage.removeItem("safekeys_initialized");
    if (this.safeKeys) {
      this.safeKeys.cleanup();
    }
    this.safeKeys = null;
    this.isInitialized = false;
  }

  /**
   * Force la réinitialisation complète du service
   * Utile pour résoudre les problèmes de compatibilité
   */
  async forceReset(): Promise<void> {
    console.log("🔄 Force reset du service...");

    // Nettoyer la mémoire
    if (this.safeKeys) {
      this.safeKeys.cleanup();
    }
    this.safeKeys = null;
    this.isInitialized = false;

    // Nettoyer le stockage
    await AsyncStorage.removeItem(this.storageKey);
    await AsyncStorage.removeItem("safekeys_initialized");

    console.log("✅ Reset terminé");
  }

  /**
   * Vérifie si SafeKeys est initialisé
   */
  get initialized(): boolean {
    return this.safeKeys?.initialized || false;
  }
}

// Instance singleton
export const passwordService = new PasswordService();
