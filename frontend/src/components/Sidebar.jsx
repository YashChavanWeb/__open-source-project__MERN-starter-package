import { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaShoppingBag,
  FaUsers,
  FaTags,
  FaChartBar,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import bgImage from '../assets/icons/bg.avif';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("Home");

  // ✅ Get username from localStorage
  const username = localStorage.getItem('username') || 'Guest';
  const firstLetter = username.charAt(0).toUpperCase();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const navSections = [
    {
      title: "Main",
      items: [
        { name: "Home", icon: <FaHome /> },
        { name: "Products", icon: <FaBoxOpen /> },
        { name: "Categories", icon: <FaTags /> },
      ],
    },
    {
      title: "Sales",
      items: [
        { name: "Orders", icon: <FaShoppingCart />, badge: "5" },
        { name: "My Cart", icon: <FaShoppingBag /> },
      ],
    },
    {
      title: "Management",
      items: [
        { name: "Customers", icon: <FaUsers /> },
        { name: "Reports", icon: <FaChartBar /> },
      ],
    },
  ];

  const projects = ["UI Design New App", "Redesign Web", "LandingPage"];

  return (
    <div
      style={{ width: collapsed ? 72 : 272, transition: "width 0.4s ease" }}
      className="relative h-screen rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Sidebar content */}
      <div className="relative z-10 p-4 text-white flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* ✅ Dynamic First Letter Avatar */}
              <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg select-none">
                {firstLetter}
              </div>
              {/* ✅ Username (shown only when not collapsed) */}
              {!collapsed && (
                <div>
                  <p className="text-lg font-semibold">{username}</p>
                  <p className="text-sm text-gray-300">Profile</p>
                </div>
              )}
            </div>
            {/* Collapse/Expand Button */}
            <button
              className="p-1 m-0 bg-transparent hover:text-orange-400 transition-transform duration-300"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FaChevronRight size={18} /> : <FaChevronLeft size={18} />}
            </button>
          </div>

          {/* Nav Sections */}
          <nav className="space-y-6">
            {navSections.map((section, idx) => (
              <div key={section.title}>
                {!collapsed && (
                  <p className="uppercase text-gray-300 text-xs tracking-wide mb-3">
                    {section.title}
                  </p>
                )}
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between group cursor-pointer hover:text-orange-400 transition ${
                        activeTab === item.name ? "text-orange-400" : "text-white"
                      }`}
                      onClick={() => setActiveTab(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        {!collapsed && <span className="text-md">{item.name}</span>}
                      </div>
                      {!collapsed && item.badge && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                      {(item.name === activeTab) && (
                        <span
                          className={`w-2 h-2 bg-orange-400 rounded-full ${
                            collapsed ? "" : "ml-auto"
                          }`}
                        ></span>
                      )}
                    </div>
                  ))}
                </div>
                {idx !== navSections.length - 1 && (
                  <hr className="border-t border-gray-700 my-6" />
                )}
              </div>
            ))}
          </nav>

          {/* Projects */}
          {!collapsed && (
            <div className="mt-10">
              <p className="uppercase text-gray-300 text-xs tracking-wide mb-4">
                Projects
              </p>
              <div className="space-y-3">
                {projects.map((project, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="project" className="accent-orange-400" />
                    <span className="text-sm">{project}</span>
                  </label>
                ))}
              </div>
              <button className="text-sm mt-3 text-gray-300 hover:text-white">
                Show more
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center items-center mt-6">
          {theme === "dark" ? (
            <button
              className="p-2 rounded-full hover:bg-white/10 transition"
              onClick={() => toggleTheme("light")}
              aria-label="Switch to light theme"
            >
              <FaSun />
            </button>
          ) : (
            <button
              className="p-2 rounded-full hover:bg-black/10 transition"
              onClick={() => toggleTheme("dark")}
              aria-label="Switch to dark theme"
            >
              <FaMoon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
