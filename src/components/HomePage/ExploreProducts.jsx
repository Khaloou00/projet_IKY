import React from "react";
import BoutiqueLeftSide from "../BoutiqueLeftSide";
import BoutiqueRightSide from "../BoutiqueRightSide";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { recupererProduits } from "../../utils/hooks";

const ExploreProducts = () => {
  // const dispatch = useDispatch();

  const {
    data: allProducts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: recupererProduits,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    onSuccess: (data) => {
      // dispatch(keepProducts(data));
    },
  });
  return (
    <div className="bg-gray-200">
      <div className="flex gap-6">
        <div className="max-w-75">
          <BoutiqueLeftSide />
        </div>
        <div>
          <BoutiqueRightSide />
        </div>
      </div>
    </div>
  );
};

export default ExploreProducts;
