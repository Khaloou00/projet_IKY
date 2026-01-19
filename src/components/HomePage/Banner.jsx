import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/superbieSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.projet);

  const ImagesBAnner = [
    {
      category: "bijoux",
      image:
        "https://images.pexels.com/photos/6387695/pexels-photo-6387695.jpeg",
    },
    {
      category: "soin & sante",
      image:
        "https://images.pexels.com/photos/6560252/pexels-photo-6560252.jpeg",
    },
    {
      category: "outils informatiques",
      image:
        "https://images.pexels.com/photos/27742571/pexels-photo-27742571.jpeg",
    },
  ];

  console.log(category);
  return (
    <div>
      <div
        className={`h-[500px] relative before:absolute before:inset-0 before:bg-black/50   `}
        style={{
          backgroundImage: `url(${
            ImagesBAnner.find((item) => item.category === category).image
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" absolute flex items-center justify-center w-full gap-10 p-4 mt-[75px]">
          {ImagesBAnner.map((item, index) => (
            <p
              key={index}
              className={`${
                category === item.category
                  ? "bg-yellow-500 font-bold transform transition-all duration-400 scale-105"
                  : ""
              } text-white cursor-pointer border rounded-2xl p-2`}
              onClick={() => dispatch(setCategory(item.category))}
            >
              {item.category}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
