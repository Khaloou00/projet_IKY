import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  sousCategoriesBijoux,
  sousCategoriesInformatique,
  sousCategoriesSoinSante,
} from "../../utils/constants";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import SimpleLoader from "../../components/SimpleLoader";
import ConfirmationModal from "../../components/ConfimationModal";
import Select from "react-select";

import supabase from "../../../supabase-client";
import { categories } from "../../utils/constants";
import toast from "react-hot-toast";
import { getStoragePath, resizeFile } from "../../utils/hooks";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = React.useMemo(
    () =>
      JSON.parse(localStorage.getItem("produitAModifier")) ||
      location.state?.product ||
      {},
    [location.state?.product]
  );

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState(product.nom || "");
  const [descriptionCourte, setDescriptionCourte] = useState(
    product.descriptionCourte || ""
  );
  const [descriptionLongue, setDescriptionLongue] = useState(
    product.descriptionLongue || ""
  );
  const [imagesTab, setImagesTab] = useState(product.images || []);
  const [price, setPrice] = useState(product.price);

  let categorieDefaut = {
    value: product.categorie,
    label: product.categorie,
  };
  const [categorie, setCategorie] = useState(categorieDefaut);

  let sousCategorieDefaut = {
    value: product.sousCategorie,
    label: product.sousCategorie,
  };
  const [sousCategorie, setSousCategorie] = useState(sousCategorieDefaut);

  let sousCategoriesDeuxDefaut = {
    value: product.sousCategoriesDeux,
    label: product.sousCategoriesDeux,
  };
  const [sousCategoriesDeux, setSousCategoriesDeux] = useState(
    sousCategoriesDeuxDefaut
  );

  const ALL_SOUS_CATEGORIES = [
    ...sousCategoriesBijoux,
    ...sousCategoriesSoinSante,
    ...sousCategoriesInformatique,
  ];

  const getSousCategories = () => {
    if (!categorie) return [];

    let source = [];

    if (categorie.value === "bijoux") source = sousCategoriesBijoux;
    if (categorie.value === "soin & sante") source = sousCategoriesSoinSante;
    if (categorie.value === "outils informatiques")
      source = sousCategoriesInformatique;

    return source.map((obj) => {
      const key = Object.keys(obj)[0];
      return { value: key, label: key };
    });
  };

  const getSousCategoriesDeux = () => {
    if (!sousCategorie) return [];

    const found = ALL_SOUS_CATEGORIES.find(
      (obj) => Object.keys(obj)[0] === sousCategorie.value
    );

    if (!found) return [];

    const values = Object.values(found)[0];

    return values.map((v) => ({ value: v, label: v }));
  };

  const optionsCategorie = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));
  useEffect(() => {
    localStorage.setItem("produitAModifier", JSON.stringify(product));

    return () => {
      localStorage.removeItem("produitAModifier");
    };
  }, [product]);

  //   FONCTION POUR SUPPRIMER UNE IMAGE
  const deleteImage = async (url) => {
    const toastId = toast.loading("Suppression en cours...");
    const path = getStoragePath(url);

    const { error } = await supabase.storage
      .from("superbieBucket")
      .remove([path]);

    if (error) {
      toast.dismiss(toastId);
      toast.error("Erreur lors de la suppression de l'image.");
    } else {
      toast.dismiss(toastId);

      toast.success("Image supprimée avec succès.");
      const imageTabNew = imagesTab.filter((image) => image !== url);
      setImagesTab(imageTabNew); // Remove the preview after deleting
    }
  };

  //   FONCTION POUR AJOUTER DES IMAGES
  const uploadImages = async (e) => {
    const files = Array.from(e.target.files);
    const imagesTabExisting = imagesTab.length + files.length;

    if (files.length > 3 || imagesTabExisting > 3) {
      toast.error("Vous pouvez télécharger maximum 3 images.");
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/webp"];

    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      toast.error("Seules les images JPEG, PNG et WebP sont acceptées.");
      return;
    }
    setLoading(true);
    const resizedFiles = await Promise.all(
      files.map(async (file) => await resizeFile(file))
    );

    for (const file of resizedFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("superbieBucket")
        .upload(fileName, file);

      if (error) {
        console.log(error);
        toast.error("Erreur lors du téléchargement de l'image.");
        setLoading(false);
        return;
      } else {
        const { data } = supabase.storage
          .from("superbieBucket")
          .getPublicUrl(fileName);
        setImagesTab((prev) => [...prev, data.publicUrl]);
      }
    }

    if (imagesTab.length > 1) {
      toast.success("Images téléchargées avec succès.");
    } else {
      toast.success("Image téléchargée avec succès.");
    }
    setLoading(false);
  };

  // ___ FONCTION POUR S'ASSURER QU'AUCUN CHAMP N'EST VIDE ET MONTRER UN POPUP DE RESUMÉ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nom ||
      !descriptionCourte ||
      !descriptionLongue ||
      !price ||
      !imagesTab.length ||
      !categorie ||
      !sousCategorie ||
      !sousCategoriesDeux
    ) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    } else {
      setShowModal(true);
    }
  };

  // ____ FONCTION POUR CONFIRMER L'AJOUT DU PRODUIT
  const handleConfirm = async () => {
    setShowModal(false);
    const toastId = toast.loading("Création du produit...");

    const data = {
      nom: nom.toLowerCase(),
      descriptionCourte: descriptionCourte,
      descriptionLongue: descriptionLongue,
      categorie: String(categorie.label).toLowerCase(),
      sousCategorie: String(sousCategorie.value).toLowerCase(),
      sousCategoriesDeux: String(sousCategoriesDeux.value).toLowerCase(),
      price: Number(price),
      images: imagesTab,
    };

    const { error: addProductError } = await supabase
      .from("Produits")
      .update(data)
      .eq("id", product.id);

    if (addProductError) {
      console.log(addProductError);
      toast.dismiss(toastId);
      toast.error("Erreur lors de la modification , veuillez réessayer.");
      return;
    } else {
      toast.dismiss(toastId);
      toast.success("Produit modifié avec succès 😊");
      setTimeout(() => {
        navigate("/admin/all-products");
      }, 1000);
    }
  };

  return (
    <div className=" xl:max-w-[90%]  mx-auto p-3 lg:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-8">
        Ajouter un produit
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg  md:p-8"
      >
        <div className="grid grid-cols-1 lg:divide-x-2 lg:divide-dashed divide-gray-300  lg:grid-cols-[40%_58%] md:gap-8 p-4">
          {/* Image Upload */}
          {/* PARTIE DE GAUCHE  */}
          <div className="basis-1/2 bg-white  h-full py-3 ">
            <div className="cursor-pointer p-6 md:p-0 h-[200px] md:h-[2450px] lg:h-[50%] lg:w-[90%] bg-slate-100 mx-auto rounded-md outline-2 outline-offset-2 outline-dashed outline-slate-300  flex  items-center justify-center relative ">
              {loading ? (
                <SimpleLoader />
              ) : (
                <div>
                  <label htmlFor="photo">
                    <div className="flex items-center flex-col justify-center">
                      <BsFillCloudUploadFill className="text-5xl text-gray-400 group-hover:text-amber-500 transition-colors" />
                      <p className="mt-3 text-gray-500 text-center">
                        Cliquez pour télécharger 1 à 3 images
                        <br />
                        <span className="text-sm mt-3 md:mt-0 inline-block">
                          PNG, JPG jusqu'à 10MB
                        </span>
                      </p>
                    </div>
                  </label>
                  <input
                    onChange={uploadImages}
                    type="file"
                    disabled={imagesTab.length === 3}
                    multiple
                    className="hidden"
                    id="photo"
                  />
                </div>
              )}
            </div>
            <div className="  lg:p-5 space-y-3 ">
              {imagesTab.length > 0 &&
                imagesTab.map((item, i) => (
                  <div
                    key={i}
                    className=" flex items-center gap-1 shadow-sm bg-slate-100 p-2 rounded-md "
                  >
                    <img
                      src={item}
                      alt=""
                      className=" object-cover rounded-md w-[50px] h-[40px]  md:w-[70px] md:h-[60px] "
                    />
                    <div className="w-full">
                      <div className="flex justify-center items-center gap-3  ">
                        <p className="text-xs">
                          <span className="hidden md:inline-block">
                            {item
                              .split("-")
                              .slice(1)
                              .join("-")
                              .replace(".png", "")
                              .replaceAll("%", " ")}
                          </span>

                          <span className="inline-block md:hidden">
                            {item
                              .split("-")
                              .slice(1)
                              .join("-")
                              .replace(".png", "")
                              .replaceAll("%", " ")
                              .slice(0, 15)}
                            ...
                          </span>
                        </p>
                      </div>
                    </div>
                    <MdDelete
                      onClick={() => deleteImage(item)}
                      className="ml-auto text-slate-300 hover:text-amber-400 duration-500 transition-all cursor-pointer text-4xl "
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* PARTIE DE DROITE */}

          <div className="space-y-3 md:space-y-4">
            <h3 className="font-semibold text-gray-700 mt-3 md:mt-0">
              Détails du produit
            </h3>

            {/* Nom */}
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du Produit"
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none"
              required
            />
            {/* Description Courte */}
            <textarea
              value={descriptionCourte}
              onChange={(e) => setDescriptionCourte(e.target.value)}
              placeholder="Description Courte du Produit"
              rows={2}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none resize-none"
            />

            {/* DEscritption Longue  */}
            <textarea
              value={descriptionLongue}
              onChange={(e) => setDescriptionLongue(e.target.value)}
              placeholder="Description Longue du Produit"
              rows={4}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none resize-none"
            />
            {/* Catégories & prix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                value={categorie}
                onChange={(option) => {
                  setCategorie(option);
                  setSousCategorie(null);
                }}
                options={optionsCategorie}
                placeholder="Catégorie"
                className="text-sm "
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-lg px-3 text-[16px] md:py-2 hover:border-amber-400 focus:border-amber-500",
                }}
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Prix de référence"
                type="number"
                min="0"
                step="0.01"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none"
              />
            </div>

            {/* Les Sous Categories : 1 & 2 */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                value={sousCategorie}
                onChange={setSousCategorie}
                options={getSousCategories()}
                placeholder="Sous-catégorie"
                isDisabled={!categorie}
                className="text-sm"
                classNames={{
                  control: () =>
                    "border border-gray-300 text-[16px]  rounded-lg px-3 md:py-2 hover:border-amber-400 focus:border-amber-500",
                }}
              />
              <Select
                value={sousCategoriesDeux}
                onChange={(option) => setSousCategoriesDeux(option)}
                isDisabled={!sousCategorie}
                options={getSousCategoriesDeux()}
                placeholder="Sous-Catégorie 2"
                className="text-sm "
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-lg px-3 text-[16px] md:py-2 hover:border-amber-400 focus:border-amber-500",
                }}
              />
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Enregistrer le produit
              </button>
            </div>
          </div>
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
            data={{
              nom: nom.toLowerCase(),
              descriptionCourte: descriptionCourte,
              descriptionLongue: descriptionLongue,
              price: `${Number(price)}`,
              categorie: String(categorie?.label).toLowerCase(),
              sousCategorie: String(sousCategorie?.label).toLowerCase(),
              sousCategorieDeux: String(
                sousCategoriesDeux?.label
              ).toLowerCase(),
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
