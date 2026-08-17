import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import "./Dashboard.css";

import {
  Sun,
  Wind,
  MapPin,
  FolderKanban,
  ArrowUpRight,
  CloudSun,
  Brain,
  Trophy,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import { getDashboardHome } from "../../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------------------
  // LOAD DASHBOARD DATA
  // ----------------------------------------

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardHome();

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ----------------------------------------
  // LOADING
  // ----------------------------------------

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  // ----------------------------------------
  // ERROR
  // ----------------------------------------

  if (error) {
    return (
      <DashboardLayout>
        <div
          style={{
            padding: "30px",
            color: "#b91c1c",
            background: "#fee2e2",
            borderRadius: "15px",
          }}
        >
          {error}
        </div>
      </DashboardLayout>
    );
  }

  // ----------------------------------------
  // DASHBOARD DATA
  // ----------------------------------------

  const statistics = dashboard?.statistics || {};

  const topSite = dashboard?.top_site;

  const energyDistribution =
    dashboard?.energy_distribution || {};

  const solarCount =
    energyDistribution.Solar || 0;

  const windCount =
    energyDistribution.Wind || 0;

  const totalEnergyPredictions =
    solarCount + windCount;

  const solarPercentage =
    totalEnergyPredictions > 0
      ? Math.round(
          (solarCount / totalEnergyPredictions) * 100
        )
      : 0;

  const windPercentage =
    totalEnergyPredictions > 0
      ? Math.round(
          (windCount / totalEnergyPredictions) * 100
        )
      : 0;

  // ----------------------------------------
  // OPEN AI RECOMMENDATION
  // ----------------------------------------

  const openTopSitePrediction = () => {
    if (!topSite?.site_id) {
      return;
    }

    navigate(`/prediction?siteId=${topSite.site_id}`);
  };

  // ----------------------------------------
  // DASHBOARD
  // ----------------------------------------

  return (
    <DashboardLayout>

      {/* ========================================
          HERO
      ======================================== */}

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >

        <div className="heroLeft">

          <p className="date">
            • Renewable Intelligence Platform
          </p>

          <h1>
            Renewable Intelligence
          </h1>

          <h2>
            Welcome back, Sahithi
          </h2>

          <p className="heroText">
            Monitor renewable projects, analyze
            environmental conditions and receive
            AI-powered deployment recommendations
            in real-time.
          </p>

          <div className="heroButtons">

            {/* VIEW PROJECTS */}

            <button
              className="primaryBtn"
              onClick={() => navigate("/projects")}
            >
              View Projects
            </button>

            {/* AI PREDICTION */}

            <button
              className="secondaryBtn"
              onClick={() => navigate("/prediction")}
            >
              AI Prediction
            </button>

          </div>

        </div>

        <div className="heroRight">

          <div className="energyCircle">
            ☀
          </div>

          <div className="floatingCard">

            <CloudSun size={20} />

            <div>

              <h3>
                Renewable AI
              </h3>

              <p>
                Intelligent Energy Analysis
              </p>

            </div>

          </div>

        </div>

      </motion.div>


      {/* ========================================
          MAIN KPI CARDS
      ======================================== */}

      <div className="cards">

        {/* SOLAR */}

        <div className="card solar">

          <Sun size={40} />

          <span>
            Average Solar Score
          </span>

          <h2>
            {statistics.average_solar_score || 0}%
          </h2>

          <small>
            <ArrowUpRight size={15} />
            Renewable Potential
          </small>

        </div>


        {/* WIND */}

        <div className="card wind">

          <Wind size={40} />

          <span>
            Average Wind Score
          </span>

          <h2>
            {statistics.average_wind_score || 0}%
          </h2>

          <small>
            Optimal Potential
          </small>

        </div>


        {/* SITES */}

        <div className="card site">

          <MapPin size={40} />

          <span>
            Total Sites
          </span>

          <h2>
            {statistics.total_sites || 0}
          </h2>

          <small>
            Registered Sites
          </small>

        </div>


        {/* PROJECTS */}

        <div className="card project">

          <FolderKanban size={40} />

          <span>
            Total Projects
          </span>

          <h2>
            {statistics.total_projects || 0}
          </h2>

          <small>
            Renewable Projects
          </small>

        </div>

      </div>


      {/* ========================================
          SECONDARY KPI CARDS
      ======================================== */}

      <div
        className="cards"
        style={{
          marginTop: "0",
        }}
      >

        {/* AI PREDICTIONS */}

        <div className="card">

          <Brain size={40} />

          <span>
            AI Predictions
          </span>

          <h2>
            {statistics.total_predictions || 0}
          </h2>

          <small>
            Predictions Generated
          </small>

        </div>


        {/* AVERAGE POWER */}

        <div className="card">

          <Sun size={40} />

          <span>
            Average Predicted Power
          </span>

          <h2>
            {statistics.average_prediction || 0} W
          </h2>

          <small>
            AI Model Output
          </small>

        </div>


        {/* OVERALL SCORE */}

        <div className="card">

          <Trophy size={40} />

          <span>
            Overall Renewable Score
          </span>

          <h2>
            {statistics.average_overall_score || 0}%
          </h2>

          <small>
            Deployment Suitability
          </small>

        </div>


        {/* BEST ENERGY SOURCE */}

        <div className="card">

          <CloudSun size={40} />

          <span>
            Best Energy Source
          </span>

          <h2>
            {topSite?.best_energy_source || "N/A"}
          </h2>

          <small>
            Based on AI Predictions
          </small>

        </div>

      </div>


      {/* ========================================
          BOTTOM CONTENT
      ======================================== */}

      <div className="bottom">

        {/* ======================================
            ENERGY DISTRIBUTION
        ====================================== */}

        <div className="map">

          <h2>
            🌍 Renewable Energy Distribution
          </h2>

          <div
            style={{
              marginTop: "25px",
              display: "grid",
              gap: "20px",
            }}
          >

            {/* SOLAR DISTRIBUTION */}

            <div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >

                <strong>
                  ☀ Solar
                </strong>

                <strong>
                  {solarCount} predictions
                </strong>

              </div>

              <div
                style={{
                  height: "14px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${solarPercentage}%`,
                    height: "100%",
                    background: "#f59e0b",
                    borderRadius: "10px",
                  }}
                />

              </div>

              <small>
                {solarPercentage}% of energy
                recommendations
              </small>

            </div>


            {/* WIND DISTRIBUTION */}

            <div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >

                <strong>
                  🌬 Wind
                </strong>

                <strong>
                  {windCount} predictions
                </strong>

              </div>

              <div
                style={{
                  height: "14px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${windPercentage}%`,
                    height: "100%",
                    background: "#00897b",
                    borderRadius: "10px",
                  }}
                />

              </div>

              <small>
                {windPercentage}% of energy
                recommendations
              </small>

            </div>


            {/* TOTAL */}

            <div
              className="placeholder"
              style={{
                height: "160px",
                fontSize: "22px",
              }}
            >

              {statistics.total_predictions || 0} AI
              predictions analyzed

            </div>

          </div>

        </div>


        {/* ======================================
            RIGHT PANEL
        ====================================== */}

        <div className="rightPanel">

          {/* ====================================
              BEST SITE / AI RECOMMENDATION
          ==================================== */}

          <div
            className="ai"
            onClick={openTopSitePrediction}
            role={topSite?.site_id ? "button" : undefined}
            tabIndex={topSite?.site_id ? 0 : undefined}
            onKeyDown={(event) => {
              if (
                topSite?.site_id &&
                (event.key === "Enter" ||
                  event.key === " ")
              ) {
                event.preventDefault();
                openTopSitePrediction();
              }
            }}
            style={{
              cursor: topSite?.site_id
                ? "pointer"
                : "default",
            }}
          >

            <h3>
              🏆 Best Renewable Site
            </h3>

            {topSite ? (

              <>

                <h1>
                  {topSite.site_name}
                </h1>

                <p>
                  Overall Score:{" "}
                  <strong>
                    {topSite.overall_score}%
                  </strong>
                </p>

                <p>
                  Predicted Power:{" "}
                  <strong>
                    {topSite.predicted_power} W
                  </strong>
                </p>

                <p>
                  Best Energy Source:{" "}
                  <strong>
                    {topSite.best_energy_source}
                  </strong>
                </p>

                <p>
                  Recommendation:{" "}
                  <strong>
                    {topSite.recommendation}
                  </strong>
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "700",
                  }}
                >
                  <Brain size={18} />

                  View AI Recommendation

                  <ArrowRight size={18} />

                </div>

              </>

            ) : (

              <>

                <h1>
                  No Data
                </h1>

                <p>
                  Generate an AI prediction to
                  identify the best renewable site.
                </p>

              </>

            )}

          </div>


          {/* ====================================
              AI SYSTEM SUMMARY
          ==================================== */}

          <div className="weather">

            <h3>
              AI System Summary
            </h3>

            <h2>
              {statistics.average_overall_score || 0}%
            </h2>

            <p>
              Average Renewable Suitability
            </p>

            <p>
              Solar:{" "}
              <strong>
                {statistics.average_solar_score || 0}%
              </strong>
            </p>

            <p>
              Wind:{" "}
              <strong>
                {statistics.average_wind_score || 0}%
              </strong>
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
