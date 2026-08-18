import styles from "./Navbar.module.css";

import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    logout();

    navigate("/");
  };

  return (
    <header className={styles.navbar}>

      {/* LEFT SIDE */}
      <div>
        <h2>Good Morning 👋</h2>

        <p>
          Renewable Energy Intelligence Platform
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>

        {/* Search */}
        <div className={styles.search}>

          <Search size={18} />

          <input
            placeholder="Search projects..."
          />

        </div>

        {/* Notifications */}
        <Bell className={styles.icon} />

        {/* User */}
        <div className={styles.avatar}>
          S
        </div>

        {/* Logout */}
        <button
          className={styles.logout}
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;