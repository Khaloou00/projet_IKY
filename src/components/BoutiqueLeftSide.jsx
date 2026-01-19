import { useEffect, useState } from "react";
import {
  sousCategoriesBijoux,
  sousCategoriesInformatique,
  sousCategoriesSoinSante,
} from "../utils/constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BiReset } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";

const BoutiqueLeftSide = () => {
  const { category } = useSelector((state) => state.projet);

  const grandeCatSelectionner =
    category === "bijoux"
      ? sousCategoriesBijoux
      : category === "soin & sante"
      ? sousCategoriesSoinSante
      : category === "outils informatiques"
      ? sousCategoriesInformatique
      : [];

  return (
    <>
      <div className="flex items-center p-4">
        <h3 className=" font-medium text-[18px]">CATEGORIES</h3>
        <BiReset
          //   onClick={() => resetProduits()}
          className="hover:text-amber-600 transition-all duration-500 cursor-pointer text-[25px] rounded-md mx-2 "
        />
      </div>
      <div className="p-4 space-y-4">
        {grandeCatSelectionner.map((group, groupIndex) => {
          const title = Object.keys(group)[0];
          const values = Object.values(group)[0];

          return (
            <div key={groupIndex} className="space-y-2">
              <p className="font-semibold capitalize">{title}</p>

              <div className="space-y-1 pl-4">
                {values.map((value, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer text-[14px] capitalize"
                  >
                    <input
                      type="checkbox"
                      name="categorie"
                      value={value}
                      className="checkbox checkbox-sm"
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoutiqueLeftSide;
