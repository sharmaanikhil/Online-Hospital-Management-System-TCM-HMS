import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCalendarCheck,
  FaCloudUploadAlt,
  FaRobot,
  FaLock,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/AuthContext";

const SideBar = ({ setShowSidebar }) => {
  const { role, logout } = useAuth();
  const [linksToRender, setLinksToRender] = useState([]);

  const patientLinks = [
    { label: "My Profile", to: "/profile", icon: <FaUser /> },
    { label: "My Appointments", to: "/profile/my-appointments", icon: <FaCalendarCheck /> },
    { label: "Upload Report", to: "/profile/upload-report", icon: <FaCloudUploadAlt /> },
    { label: "AI Chat Bot", to: "/profile/ai-chat", icon: <FaRobot /> },
    { label: "Reset Password", to: "/profile/reset-password", icon: <FaLock /> },
  ];

  const doctorLinks = [
    { label: "My Profile", to: "/profile", icon: <FaUser /> },
    { label: "All Appointments", to: "/profile/all-appointments", icon: <FaClipboardList /> },
    { label: "Reset Password", to: "/profile/reset-password", icon: <FaLock /> },
  ];

  useEffect(() => {
    setLinksToRender(role === "patient" ? patientLinks : doctorLinks);
  }, [role]);

  return (
    <div className="h-full bg-white rounded-xl shadow-md p-6 relative">

      {/* MOBILE CLOSE BUTTON */}
      <button
        onClick={() => setShowSidebar(false)}
        className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-black"
      >
        <RxCross2 size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-6 text-center">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {linksToRender.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            end={link.to === "/profile"}
            onClick={() => setShowSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
