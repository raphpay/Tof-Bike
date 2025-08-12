import { supabase } from "../../config/supabase";

/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
export default class SupabaseService {
  static #instance: SupabaseService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): SupabaseService {
    if (!SupabaseService.#instance) {
      SupabaseService.#instance = new SupabaseService();
    }

    return SupabaseService.#instance;
  }

  /**
   * Récupère un URL signé pour un fichier dans Supabase Storage
   * @param path Chemin complet du fichier dans le bucket (ex: "signatures/monfichier.png")
   * @returns URL signé ou null si erreur
   */
  async getSignedUrl(path: string) {
    const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
    const { data, error } = await supabase.storage
      .from(storageBucket)
      .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 jours en secondes

    if (error) {
      console.error(
        "Erreur lors de la génération de l'URL signé :",
        error.message,
      );
      return null;
    }

    return data?.signedUrl || null;
  }
}
