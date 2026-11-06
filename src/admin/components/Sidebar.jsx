
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  faBook,
  faGear,
  faHome
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../api/axiosinstance";

function Sidebar() {

  const [userDp, setuserDp] = useState("");
  const [userName, setuserName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setuserDp(user.picture || "");
      setuserName(user.username || "");
    }
  }, []);

  const profileImage = userDp
    ? /^https?:\/\//i.test(userDp)
      ? userDp
      : `${axiosInstance.defaults.baseURL.replace(/\/$/, "")}/uploads/${userDp.replace(/^\/+/, "")}`
    : "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg";

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: faHome },
    { name: "All Books", path: "/admin-resources", icon: faBook },
    { name: "Settings", path: "/admin-settings", icon: faGear }
  ];

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-3 bg-blue-300 p-3 md:min-h-screen md:flex-col md:justify-center md:gap-0 md:p-5">

        {/* Profile Image */}
        <img
          src={profileImage}
          alt="Admin Profile"
          className="h-12 w-12 shrink-0 rounded-full object-cover md:h-48 md:w-48"
        />

        {/* Admin Details */}
        <div className="min-w-0 flex-1 md:flex-none">
          <h1 className="truncate text-sm font-bold md:mt-5 md:text-xl">
            Bookstore Admin
          </h1>
          <p className="truncate text-xs md:mt-2 md:text-base">
            {userName}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex shrink-0 items-center gap-2 md:mt-7 md:flex-col md:justify-center md:gap-0 md:p-5">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap rounded px-2 py-2 text-sm font-bold md:my-3 md:px-0 md:text-xl ${
                location.pathname === item.path
                  ? "text-blue-800 md:bg-transparent"
                  : "text-gray-800"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="md:mx-2" />
              <span className="hidden sm:inline md:inline">{item.name}</span>
            </Link>
          ))}

        </nav>

      </div>
    </div>
  );
}

export default Sidebar;
