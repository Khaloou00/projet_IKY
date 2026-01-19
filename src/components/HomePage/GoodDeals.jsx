import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const GoodDeals = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Reine d'Or",
      desc: "Bijou en or 24 carats",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6625939/pexels-photo-6625939.jpeg",
    },
    {
      id: 2,
      name: "Reine du Sahel",
      desc: "Inspiration sahélienne",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6626907/pexels-photo-6626907.jpeg",
    },
    {
      id: 3,
      name: "Cœur d'Or Ancien",
      desc: "Bijou vintage restauré",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6625914/pexels-photo-6625914.jpeg",
    },
    {
      id: 4,
      name: "Yérédon Mansa",
      desc: "Symbolique ancestrale",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6625885/pexels-photo-6625885.jpeg",
    },
    {
      id: 5,
      name: "Wórowya",
      desc: "Design africain moderne",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6625956/pexels-photo-6625956.jpeg",
    },
    {
      id: 6,
      name: "Éclat d’Or",
      desc: "Brillance éternelle",
      price: "20.000 FCFA",
      img: "https://images.pexels.com/photos/6625939/pexels-photo-6625939.jpeg",
    },
  ];

  return (
    <section className="max-w-[90%] lg:max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-10">
        Meilleures Offres du Moment
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1.4 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 2.8 },
            1024: { slidesPerView: 3.8 },
            1280: { slidesPerView: 4.8 },
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} className="!flex !justify-center">
              <div className="w-full max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-amber-100">
                <div className="h-56 overflow-hidden">
                  <img
                    src={p.img.trim()}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {p.desc.split(" ")[0]}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-gray-800 text-lg mb-1">
                    {p.name}
                  </h3>
                  <p className="text-amber-600 font-bold text-xl mb-2">
                    {p.price}
                  </p>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                    Discutez du prix
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flèches */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 z-10"
        >
          <HiArrowLeft className="text-amber-600" />
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 z-10"
        >
          <HiArrowRight className="text-amber-600" />
        </button>
      </div>
    </section>
  );
};

export default GoodDeals;
