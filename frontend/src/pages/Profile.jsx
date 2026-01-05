import React, { useState } from "react";
import SideBar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex gap-8">

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
        >
          {showSidebar ? <FaArrowRight /> : <FaArrowLeft />}
        </button>

        {/* SIDEBAR (RIGHT) */}
        <div
          className={`
            fixed top-0 right-0 h-full w-64 bg-white z-40 shadow-xl
            transform transition-transform duration-300
            ${showSidebar ? "translate-x-0" : "translate-x-full"}
            md:static md:translate-x-0 md:shadow-none
          `}
        >
          <SideBar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
