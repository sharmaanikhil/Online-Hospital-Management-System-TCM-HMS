import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Profile/SideBar";
import { FaBars } from "react-icons/fa";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FaBars />
            Menu
          </button>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="flex gap-8 relative">

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0 bg-white rounded-xl shadow p-6">
            <Outlet />
          </div>

          {/* SIDEBAR (DESKTOP) */}
          <div className="hidden md:block w-64 shrink-0">
            <SideBar />
          </div>

          {/* SIDEBAR (MOBILE OVERLAY) */}
          {showSidebar && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={() => setShowSidebar(false)}
              />

              <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-4">
                <SideBar setShowSidebar={setShowSidebar} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
