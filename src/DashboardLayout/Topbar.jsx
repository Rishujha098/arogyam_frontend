import { Search, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TopBar({ isExpanded = true }) {
  const [notifications] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserName = () => {
      try {
        const raw = localStorage.getItem("arogyam_profile");
        if (raw) {
          const parsed = JSON.parse(raw);
          setUserName(parsed.name || "John Doe");
        }
      } catch (_) {}
    };

    loadUserName();

    const handleStorageChange = (e) => {
      if (e.key === "arogyam_profile") loadUserName();
    };
    const handleProfileUpdate = () => loadUserName();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  return (
    <header
      className={`bg-white border-b border-gray-200 h-20 fixed top-0 right-0 z-30 px-8 flex items-center justify-between transition-all duration-300 ${
        isExpanded ? "left-64" : "left-20"
      }`}
    >
      {/* Search bar */}
      <div className="flex items-center gap-6 flex-1">
        <div className="relative flex-1 max-w-xl">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              searchFocused ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search health records, appointments, doctors..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              searchFocused
                ? "border-blue-500 bg-white shadow-lg shadow-blue-100"
                : "border-transparent hover:bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-200 group-hover:animate-pulse" />
          {notifications > 0 && (
            <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-gray-200" />

        {/* 👇 Profile Button */}
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-3 p-2 pr-4 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-700 rounded-xl flex items-center justify-center text-white font-semibold group-hover:scale-105 transition-transform duration-200">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">Free</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default TopBar;