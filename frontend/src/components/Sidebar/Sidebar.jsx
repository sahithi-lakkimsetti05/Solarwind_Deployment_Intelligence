import styles from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  FolderKanban,
  MapPinned,
  Sun,
  Brain,
  BarChart3,
  Activity,
  LogOut,
  Globe,
  Wind,
  Leaf,
  BriefcaseBusiness,
  Search,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      <div>

        {/* =====================================
            LOGO
        ===================================== */}

        <div className={styles.logoBox}>

          <div className={styles.logoCircle}>
            <Sun size={23} />
          </div>

          <div>
            <h2>SolarWind</h2>
            <span>
              Deployment Intelligence
            </span>
          </div>

        </div>

        <div className={styles.menuTitle}>
          MAIN MENU
        </div>

        {/* =====================================
            DASHBOARD
        ===================================== */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* =====================================
            EXECUTIVE DASHBOARD
        ===================================== */}

        <NavLink
          to="/executive-dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <BriefcaseBusiness size={20} />
          Executive Dashboard
        </NavLink>

        {/* =====================================
            PROJECTS
        ===================================== */}

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <FolderKanban size={20} />
          Projects
        </NavLink>

        {/* =====================================
            SITES
        ===================================== */}

        <NavLink
          to="/sites"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <MapPinned size={20} />
          Sites
        </NavLink>

        {/* =====================================
            ENVIRONMENT
        ===================================== */}

        <NavLink
          to="/environment"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <Sun size={20} />
          Environment
        </NavLink>

        {/* =====================================
    LOCATION ASSESSMENT
===================================== */}

<NavLink
  to="/location-assessment"
  className={({ isActive }) =>
    isActive
      ? `${styles.menu} ${styles.active}`
      : styles.menu
  }
>
  <Search size={20} />
  Location Assessment
</NavLink>

        {/* =====================================
            GIS
        ===================================== */}

        <NavLink
          to="/gis"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <Globe size={20} />
          GIS Intelligence
        </NavLink>

        {/* =====================================
            AI PREDICTION
        ===================================== */}

        <NavLink
          to="/prediction"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <Brain size={20} />
          AI Prediction
        </NavLink>

        {/* =====================================
            RESOURCE ASSESSMENT
        ===================================== */}

        <NavLink
          to="/resource-assessment"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <Wind size={20} />
          Resource Assessment
        </NavLink>

        {/* =====================================
            ANALYTICS
        ===================================== */}

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu} ${styles.active}`
              : styles.menu
          }
        >
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        {/* =====================================
            SYSTEM HEALTH
        ===================================== */}

        <div className={styles.healthCard}>

          <Activity size={20} />

          <div>
            <small>System Health</small>
            <h4>Healthy</h4>
          </div>

        </div>

      </div>

      {/* =====================================
          PROFILE
      ===================================== */}

      <div className={styles.profileCard}>

        <div className={styles.profileLeft}>

          <div className={styles.avatar}>
            S
          </div>

          <div>
            <h4>Sahithi</h4>
            <small>Administrator</small>
          </div>

        </div>

        <LogOut
          size={20}
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        />

      </div>

    </motion.aside>
  );
}

export default Sidebar;
