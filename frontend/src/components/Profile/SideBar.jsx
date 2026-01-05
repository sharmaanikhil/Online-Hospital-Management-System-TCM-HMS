import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  FaUser,
  FaCalendarCheck,
  FaCloudUploadAlt,
  FaRobot,
  FaLock,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";

const SideBar = ({ showSidebar, setShowSidebar }) => {
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
    <div className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} fixed md:static top-0 left-0 w-64 h-full bg-white z-40 transition-transform`}>
      <div className="p-6">
        <button className="md:hidden absolute top-6 right-3" onClick={() => setShowSidebar(false)}>
          <RxCross2 />
        </button>

        <nav className="flex flex-col gap-3">
          {linksToRender.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              end={link.to === "/profile"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 text-white py-3 rounded-lg flex justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
