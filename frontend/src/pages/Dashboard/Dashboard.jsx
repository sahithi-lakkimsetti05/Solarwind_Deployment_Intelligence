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
  BarChart3,
  Activity,
  Zap,
  FileText,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";

import { motion } from "framer-motion";

import { getDashboardHome } from "../../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardHome();

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.detail ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="dashboard-loading">
          <div className="loading-icon">
            <Brain size={32} />
          </div>

          <h2>Loading Renewable Intelligence...</h2>

          <p>
            Collecting AI predictions and renewable energy insights.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <DashboardLayout>
        <div className="dashboard-error">
          <Activity size={28} />

          <div>
            <h3>Dashboard Unavailable</h3>
            <p>{error}</p>
          </div>

          <button
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // SAFE DATA
  // =========================================================

  const statistics = dashboard?.statistics || {};

  const topSite = dashboard?.top_site || null;

  const recentPredictions =
    dashboard?.recent_predictions || [];

  const energyDistribution =
    dashboard?.energy_distribution || {};

  const totalProjects =
    Number(statistics.total_projects) || 0;

  const totalSites =
    Number(statistics.total_sites) || 0;

  const totalPredictions =
    Number(statistics.total_predictions) || 0;

  const averagePrediction =
    Number(statistics.average_prediction) || 0;

  const averageSolarScore =
    Number(statistics.average_solar_score) || 0;

  const averageWindScore =
    Number(statistics.average_wind_score) || 0;

  const averageOverallScore =
    Number(statistics.average_overall_score) || 0;

  // =========================================================
  // ENERGY DISTRIBUTION
  // =========================================================

  const solarCount =
    Number(energyDistribution.Solar) || 0;

  const windCount =
    Number(energyDistribution.Wind) || 0;

  const totalEnergyRecommendations =
    solarCount + windCount;

  const solarPercentage =
    totalEnergyRecommendations > 0
      ? Math.round(
          (solarCount / totalEnergyRecommendations) * 100
        )
      : 0;

  const windPercentage =
    totalEnergyRecommendations > 0
      ? Math.round(
          (windCount / totalEnergyRecommendations) * 100
        )
      : 0;

  // =========================================================
  // AI RECOMMENDATION
  // =========================================================

  const openTopSitePrediction = () => {
    if (!topSite?.site_id) {
      navigate("/prediction");
      return;
    }

    navigate(
      `/prediction?siteId=${topSite.site_id}`
    );
  };

  // =========================================================
  // RESOURCE ASSESSMENT
  // =========================================================

  const openResourceAssessment = () => {
    navigate("/resource-assessment");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    try {
      return new Date(date).toLocaleString();
    } catch {
      return "-";
    }
  };

  // =========================================================
  // SCORE LABEL
  // =========================================================

  const getScoreLabel = (score) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Moderate";
    }

    return "Needs Review";
  };

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <DashboardLayout>

      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.div
        className="hero"
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >

        <div className="heroLeft">

          <div className="date">
            <Sparkles size={15} />
            Renewable Intelligence Platform
          </div>

          <h1>
            Renewable Intelligence
          </h1>

          <h2>
            Welcome back, Sahithi
          </h2>

          <p className="heroText">
            Monitor renewable projects, evaluate
            environmental conditions and discover
            AI-powered deployment opportunities
            in real-time.
          </p>

          <div className="heroButtons">

            <button
              className="primaryBtn"
              onClick={() =>
                navigate("/projects")
              }
            >
              <FolderKanban size={18} />
              View Projects
            </button>

            <button
              className="secondaryBtn"
              onClick={() =>
                navigate("/prediction")
              }
            >
              <Brain size={18} />
              AI Prediction
            </button>

            <button
              className="secondaryBtn"
              onClick={openResourceAssessment}
            >
              <FileText size={18} />
              Resource Assessment
            </button>

          </div>

        </div>

        <div className="heroRight">

          <div className="energyCircle">
            <Sun size={68} />
          </div>

          <div className="floatingCard">

            <CloudSun size={22} />

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


      {/* =====================================================
          MAIN KPI CARDS
      ===================================================== */}

      <div className="cards">

        {/* SOLAR */}

        <div className="card solar">

          <Sun size={38} />

          <span>
            Average Solar Score
          </span>

          <h2>
            {averageSolarScore}%
          </h2>

          <small>
            <ArrowUpRight size={15} />
            {getScoreLabel(averageSolarScore)}
          </small>

        </div>


        {/* WIND */}

        <div className="card wind">

          <Wind size={38} />

          <span>
            Average Wind Score
          </span>

          <h2>
            {averageWindScore}%
          </h2>

          <small>
            <TrendingUp size={15} />
            {getScoreLabel(averageWindScore)}
          </small>

        </div>


        {/* SITES */}

        <div className="card site">

          <MapPin size={38} />

          <span>
            Total Sites
          </span>

          <h2>
            {totalSites}
          </h2>

          <small>
            Registered Renewable Sites
          </small>

        </div>


        {/* PROJECTS */}

        <div className="card project">

          <FolderKanban size={38} />

          <span>
            Total Projects
          </span>

          <h2>
            {totalProjects}
          </h2>

          <small>
            Renewable Projects
          </small>

        </div>

      </div>


      {/* =====================================================
          SECONDARY KPI CARDS
      ===================================================== */}

      <div
        className="cards"
        style={{
          marginTop: "0",
        }}
      >

        {/* AI PREDICTIONS */}

        <div className="card">

          <Brain size={38} />

          <span>
            AI Predictions
          </span>

          <h2>
            {totalPredictions}
          </h2>

          <small>
            Predictions Generated
          </small>

        </div>


        {/* AVERAGE POWER */}

        <div className="card">

          <Zap size={38} />

          <span>
            Average Predicted Power
          </span>

          <h2>
            {averagePrediction} W
          </h2>

          <small>
            AI Model Output
          </small>

        </div>


        {/* OVERALL SCORE */}

        <div className="card">

          <Trophy size={38} />

          <span>
            Overall Renewable Score
          </span>

          <h2>
            {averageOverallScore}%
          </h2>

          <small>
            {getScoreLabel(averageOverallScore)}
          </small>

        </div>


        {/* BEST SOURCE */}

        <div className="card">

          <CloudSun size={38} />

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


      {/* =====================================================
          ANALYTICS SECTION
      ===================================================== */}

      <div className="dashboard-section-grid">

        {/* ===================================================
            SOLAR VS WIND
        =================================================== */}

        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h2>
                Solar vs Wind Performance
              </h2>

              <p>
                Average renewable resource suitability
              </p>
            </div>

            <BarChart3 size={25} />

          </div>


          <div className="comparison-container">

            {/* SOLAR */}

            <div className="comparison-item">

              <div className="comparison-header">

                <div className="comparison-label">
                  <Sun size={20} />
                  Solar
                </div>

                <strong>
                  {averageSolarScore}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill solar-fill"
                  style={{
                    width: `${Math.min(
                      averageSolarScore,
                      100
                    )}%`,
                  }}
                />

              </div>

              <small>
                {getScoreLabel(averageSolarScore)}
              </small>

            </div>


            {/* WIND */}

            <div className="comparison-item">

              <div className="comparison-header">

                <div className="comparison-label">
                  <Wind size={20} />
                  Wind
                </div>

                <strong>
                  {averageWindScore}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill wind-fill"
                  style={{
                    width: `${Math.min(
                      averageWindScore,
                      100
                    )}%`,
                  }}
                />

              </div>

              <small>
                {getScoreLabel(averageWindScore)}
              </small>

            </div>

          </div>


          <div className="comparison-summary">

            <Target size={20} />

            <span>

              {averageSolarScore >= averageWindScore
                ? "Solar currently shows stronger average suitability across analyzed sites."
                : "Wind currently shows stronger average suitability across analyzed sites."}

            </span>

          </div>

        </div>


        {/* ===================================================
            ENERGY DISTRIBUTION
        =================================================== */}

        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h2>
                Energy Recommendation
              </h2>

              <p>
                AI-recommended renewable sources
              </p>
            </div>

            <CloudSun size={25} />

          </div>


          <div className="energy-distribution">

            {/* SOLAR */}

            <div className="distribution-item">

              <div className="distribution-top">

                <div>
                  <Sun size={20} />
                  Solar
                </div>

                <strong>
                  {solarPercentage}%
                </strong>

              </div>

              <div className="distribution-track">

                <div
                  className="distribution-fill solar-distribution"
                  style={{
                    width: `${solarPercentage}%`,
                  }}
                />

              </div>

              <small>
                {solarCount} recommendations
              </small>

            </div>


            {/* WIND */}

            <div className="distribution-item">

              <div className="distribution-top">

                <div>
                  <Wind size={20} />
                  Wind
                </div>

                <strong>
                  {windPercentage}%
                </strong>

              </div>

              <div className="distribution-track">

                <div
                  className="distribution-fill wind-distribution"
                  style={{
                    width: `${windPercentage}%`,
                  }}
                />

              </div>

              <small>
                {windCount} recommendations
              </small>

            </div>

          </div>


          <div className="distribution-total">

            <Brain size={20} />

            <span>
              {totalEnergyRecommendations} renewable
              energy recommendations analyzed
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          BEST SITE + SYSTEM SUMMARY
      ===================================================== */}

      <div className="dashboard-section-grid">

        {/* ===================================================
            BEST RENEWABLE SITE
        =================================================== */}

        <motion.div
          className="best-site-panel"
          whileHover={{
            y: -3,
          }}
          transition={{
            duration: 0.2,
          }}
        >

          <div className="best-site-header">

            <div>

              <div className="best-site-title">
                <Trophy size={22} />

                Best Renewable Site
              </div>

              <p>
                Highest AI deployment suitability
              </p>

            </div>

            <span className="best-site-badge">
              TOP SITE
            </span>

          </div>


          {topSite ? (

            <>

              <h1>
                {topSite.site_name}
              </h1>

              <div className="best-site-score">

                <div>

                  <span>
                    Overall Score
                  </span>

                  <strong>
                    {topSite.overall_score}%
                  </strong>

                </div>

                <div>

                  <span>
                    Predicted Power
                  </span>

                  <strong>
                    {topSite.predicted_power} W
                  </strong>

                </div>

              </div>


              <div className="best-site-source">

                <CloudSun size={20} />

                <div>

                  <span>
                    Recommended Source
                  </span>

                  <strong>
                    {topSite.best_energy_source ||
                      "N/A"}
                  </strong>

                </div>

              </div>


              <p className="best-site-recommendation">

                {topSite.recommendation ||
                  "No recommendation available."}

              </p>


              <button
                className="ai-action-button"
                onClick={openTopSitePrediction}
              >

                <Brain size={18} />

                View AI Recommendation

                <ArrowRight size={18} />

              </button>

            </>

          ) : (

            <div className="empty-dashboard-state">

              <Target size={35} />

              <h3>
                No Site Intelligence Yet
              </h3>

              <p>
                Generate an AI prediction to identify
                the best renewable deployment site.
              </p>

              <button
                onClick={() =>
                  navigate("/prediction")
                }
              >
                Run AI Prediction
              </button>

            </div>

          )}

        </motion.div>


        {/* ===================================================
            AI SYSTEM SUMMARY
        =================================================== */}

        <div className="system-summary-panel">

          <div className="panel-heading">

            <div>

              <h2>
                AI System Summary
              </h2>

              <p>
                Renewable deployment intelligence
              </p>

            </div>

            <Brain size={25} />

          </div>


          <div className="summary-score">

            <div className="summary-score-circle">

              <strong>
                {averageOverallScore}%
              </strong>

              <span>
                Overall
              </span>

            </div>

          </div>


          <div className="summary-row">

            <div>
              <Sun size={19} />
              Solar Suitability
            </div>

            <strong>
              {averageSolarScore}%
            </strong>

          </div>


          <div className="summary-row">

            <div>
              <Wind size={19} />
              Wind Suitability
            </div>

            <strong>
              {averageWindScore}%
            </strong>

          </div>


          <div className="summary-row">

            <div>
              <Zap size={19} />
              Predicted Power
            </div>

            <strong>
              {averagePrediction} W
            </strong>

          </div>


          <button
            className="summary-button"
            onClick={() =>
              navigate("/analytics")
            }
          >

            <BarChart3 size={18} />

            Open Detailed Analytics

            <ArrowRight size={18} />

          </button>

        </div>

      </div>


      {/* =====================================================
          QUICK INTELLIGENCE
      ===================================================== */}

      <div className="quick-intelligence">

        <div className="quick-heading">

          <div>

            <h2>
              Renewable Intelligence Tools
            </h2>

            <p>
              Explore deeper site and deployment intelligence
            </p>

          </div>

          <Sparkles size={25} />

        </div>


        <div className="quick-grid">

          {/* AI PREDICTION */}

          <button
            className="quick-card"
            onClick={() =>
              navigate("/prediction")
            }
          >

            <div className="quick-icon">
              <Brain size={25} />
            </div>

            <div>

              <h3>
                AI Prediction
              </h3>

              <p>
                Generate ML-powered solar prediction,
                suitability scores and deployment
                recommendations.
              </p>

            </div>

            <ArrowRight size={20} />

          </button>


          {/* RESOURCE ASSESSMENT */}

          <button
            className="quick-card"
            onClick={openResourceAssessment}
          >

            <div className="quick-icon">
              <Wind size={25} />
            </div>

            <div>

              <h3>
                Resource Assessment
              </h3>

              <p>
                Analyze wind resource quality,
                wind speed, classification and
                deployment potential.
              </p>

            </div>

            <ArrowRight size={20} />

          </button>


          {/* GIS */}

          <button
            className="quick-card"
            onClick={() =>
              navigate("/gis")
            }
          >

            <div className="quick-icon">
              <MapPin size={25} />
            </div>

            <div>

              <h3>
                GIS Intelligence
              </h3>

              <p>
                Explore renewable sites and
                geographic deployment information.
              </p>

            </div>

            <ArrowRight size={20} />

          </button>


          {/* ANALYTICS */}

          <button
            className="quick-card"
            onClick={() =>
              navigate("/analytics")
            }
          >

            <div className="quick-icon">
              <BarChart3 size={25} />
            </div>

            <div>

              <h3>
                Analytics
              </h3>

              <p>
                Review historical predictions,
                trends and renewable performance.
              </p>

            </div>

            <ArrowRight size={20} />

          </button>

        </div>

      </div>


      {/* =====================================================
          RECENT PREDICTIONS
      ===================================================== */}

      <div className="recent-predictions-panel">

        <div className="panel-heading">

          <div>

            <h2>
              Recent AI Predictions
            </h2>

            <p>
              Latest renewable intelligence generated by
              the platform
            </p>

          </div>

          <Clock size={25} />

        </div>


        {recentPredictions.length > 0 ? (

          <div className="recent-table-wrapper">

            <table className="recent-table">

              <thead>

                <tr>

                  <th>
                    Site
                  </th>

                  <th>
                    Predicted Power
                  </th>

                  <th>
                    Overall Score
                  </th>

                  <th>
                    Recommendation
                  </th>

                  <th>
                    Generated
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentPredictions.map(
                  (prediction, index) => (

                    <tr
                      key={`${prediction.site_id}-${index}`}
                    >

                      <td>

                        <div className="site-table-cell">

                          <MapPin size={17} />

                          Site {prediction.site_id}

                        </div>

                      </td>


                      <td>

                        <strong>
                          {prediction.predicted_power} W
                        </strong>

                      </td>


                      <td>

                        <span
                          className={
                            prediction.overall_score >=
                            85
                              ? "score-badge excellent"
                              : prediction.overall_score >=
                                70
                              ? "score-badge good"
                              : "score-badge moderate"
                          }
                        >
                          {prediction.overall_score}%
                        </span>

                      </td>


                      <td>
                        {prediction.recommendation ||
                          "N/A"}
                      </td>


                      <td>
                        {formatDate(
                          prediction.created_at
                        )}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="empty-predictions">

            <Activity size={32} />

            <h3>
              No Recent Predictions
            </h3>

            <p>
              Generate an AI prediction to start
              building your renewable intelligence history.
            </p>

            <button
              onClick={() =>
                navigate("/prediction")
              }
            >
              Generate Prediction
            </button>

          </div>

        )}

      </div>


      {/* =====================================================
          FOOTER INSIGHT
      ===================================================== */}

      <div className="dashboard-insight">

        <div className="insight-icon">
          <Sparkles size={24} />
        </div>

        <div>

          <strong>
            AI Deployment Insight
          </strong>

          <p>

            The platform continuously evaluates
            renewable energy potential using
            environmental data, machine learning
            predictions and site suitability scores
            to support smarter deployment decisions.

          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;

