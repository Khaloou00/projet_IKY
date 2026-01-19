import Resizer from "react-image-file-resizer";
import supabase from "../../supabase-client";
import toast from "react-hot-toast";

// ____ FONCTION POUR REDIMENSIONNER UN FICHIER IMAGE
export const resizeFile = (file) =>
  new Promise((resolve, reject) => {
    const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";
    const outputMimeType =
      file.type === "image/png" ? "image/png" : "image/jpeg";

    Resizer.imageFileResizer(
      file,
      500,
      500,
      outputFormat,
      90,
      0,
      (uri) => {
        fetch(uri)
          .then((res) => res.blob())
          .then((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: outputMimeType,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          })
          .catch(reject);
      },
      "base64",
      500,
      500
    );
  });

// ____ FONCTION POUR OBTENIR LE CHEMIN D'ACCÈS D'UNE IMAGE DANS LE STORAGE
export function getStoragePath(publicUrl) {
  const url = new URL(publicUrl);
  return decodeURIComponent(url.pathname.split("/superbieBucket/")[1]);
}

// ____ FONCTION POUR RÉCUPÉRER TOUS LES PRODUITS PAR L'ADMINISTRATEUR
export async function recupererProduits() {
  const { data, error } = await supabase
    .from("Produits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    toast.error("Erreur lors de la récupération des produits 😞");
    return [];
  }

  return data;
}

// ____ FONCTION POUR RÉCUPÉRER TOUTES LES COMMANDES PAR L'ADMINISTRATEUR
export async function recuperCommandes() {
  try {
    const { data, error } = await supabase
      .from("Commandes")
      .select(
        `
        *,              
        idClient (      
          id, 
          nomComplet, 
          numero, 
          email, adresse
        )
      `
      )
      .order("created_at", { ascending: false }); // order by date
    console.log(data);
    if (error) throw error;

    return data; // already includes joined user data
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    return [];
  }
}

// FONCTION POUR RÉCUPERER LA LISTE DES UTILISATEURS
export async function recuperUtilisateurs() {
  try {
    const { data, error } = await supabase
      .from("Utilisateurs")
      .select("*")
      .eq("emailVerified", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Supabase already returns rows with their `id` if you have a PK
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    return [];
  }
}
