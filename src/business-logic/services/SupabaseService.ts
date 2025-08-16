import { supabase } from "../../config/supabase";

export class SupabaseService {
  // CREATE
  async uploadImage(fileName: string, blob: Blob): Promise<void> {
    // Upload to the "signatures" bucket
    const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

    try {
      await supabase.storage
        .from(storageBucket) // buket name in Supabase
        .upload(fileName, blob, {
          contentType: "image/png",
          upsert: false, // false to avoid overwriting existing files
        });
    } catch (error) {
      console.error("Erreur upload Supabase :", error);
      throw error;
    }
  }

  // READ
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
