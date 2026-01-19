import { Link, NavLink, Outlet } from "react-router";
// import Logo from "../assets/Images/logo.png";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { TbDoorExit, TbDoorEnter } from "react-icons/tb";
import { RiProductHuntFill, RiCoupon3Fill, RiBillFill } from "react-icons/ri";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiUsersFourFill } from "react-icons/pi";

const LayoutAdmin = () => {
  // ✅ changement 1 : sidebar réduite par défaut
  const [isCollapsed, setIsCollapsed] = useState(true);

  const adminRoutes = [
    { path: "/admin", icon: <IoHome />, label: "Tableau de bord" },
    {
      path: "/admin/all-products",
      icon: <RiProductHuntFill />,
      label: "Produits",
    },
    {
      path: "/admin/add-product",
      icon: <BiSolidMessageSquareAdd />,
      label: "Ajouter produit",
    },
    {
      path: "/admin/users",
      icon: <PiUsersFourFill />,
      label: "Utilisateurs",
    },
    { path: "/admin/orders", icon: <RiBillFill />, label: "Commandes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-[#f0f0f0] ">
        <div className="flex items-center justify-between  px-3 md:px-10 p-2">
          <Link to="/" className="flex items-center gap-3">
            {/* <img src={Logo} alt="Approbat" className="w-12 h-12" /> */}
            <span className="text-xl font-bold text-amber-500">SuperBe</span>
          </Link>

          <div className="gap-4">
            <span className="text-gray-600 text-nowrap capitalize">
              Votre Espace{" "}
              <span className="hidden md:inline-block">Administrateur</span>
            </span>
          </div>
        </div>
      </header>

      <div className="block md:flex pt-16">
        {/* Sidebar */}
        <aside
          className={`
          fixed top-12 left-0 h-[calc(100vh-2rem)]  bg-white shadow-lg transition-all duration-300 z-40
          ${isCollapsed ? "w-18" : "w-60"}
        `}
        >
          <div className="flex flex-col h-full md:pb-10   p-4">
            {/* Navigation */}
            <nav className="flex-1 space-y-2 ">
              {adminRoutes.map((route, index) => (
                <NavLink
                  key={index}
                  to={route.path}
                  end
                  className={({ isActive }) => `
                    flex items-center rounded-lg px-3 py-3 text-sm font-medium 
                    ${
                      isActive
                        ? "bg-blue-50 text-[#3b82f6] border-l-4 border-[#3b82f6]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <span
                    className={`text-xl md:text-2xl ${
                      isCollapsed ? "" : "mr-3"
                    }`}
                  >
                    {route.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{route.label}</span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ✅ changement 2 : bouton visible seulement sur desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden cursor-pointer  md:flex items-center justify-center   text-gray-500 rounded-lg  transition-colors"
            >
              {isCollapsed ? (
                <TbDoorExit className="text-xl md:text-2xl" />
              ) : (
                <TbDoorEnter className="text-xl md:text-2xl " />
              )}
              {!isCollapsed && <span className="ml-2 text-sm">Réduire</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`
          flex-1 overflow-x-hidden transition-all duration-300  h-[calc(100vh-4rem)]
          ${isCollapsed ? "ml-18" : "ml-60"}
        `}
        >
          <div className="p-3 py-5 md:py-8 md:px-4 lg:p-6 overflow-y-auto  h-full  ">
            <Outlet context={[isCollapsed, setIsCollapsed]} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
