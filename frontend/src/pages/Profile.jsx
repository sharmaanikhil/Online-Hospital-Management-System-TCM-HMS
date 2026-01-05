import React, { useState } from "react";
import SideBar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 md:flex min-h-screen my-12 md:gap-8">

      {/* MAIN CONTENT (LEFT) */}
      <div className="w-full md:w-[78%]">
        <Outlet />
      </div>

      {/* TOGGLE BUTTON (MOBILE) */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {showSidebar ? <FaArrowRight /> : <FaArrowLeft />}
      </button>

      {/* SIDEBAR (RIGHT) */}
      <div
        className={`
          fixed top-0 right-0 w-64 h-full bg-white z-40 shadow-lg
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0 md:w-[22%] md:h-auto md:shadow-none
        `}
      >
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </div>
  );
};

export default Profile;
