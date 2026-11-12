import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sun,
  Wind,
  MapPin,
  FolderKanban,
  Brain,
  Trophy,
  TrendingUp,
  ArrowRight,
  FileText,
  Globe,
  BarChart3,
  Zap,
  Target,
  Activity,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboardHome } from "../../services/dashboardService";

import "./ExecutiveDashboard.css";

function ExecutiveDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExecutiveDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardHome();

        setDashboard(data);
      } catch (err) {
        console.error("Executive Dashboard error:", err);
        setError("Unable to load executive dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadExecutiveDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="executive-loading">
          <Brain size={40} className="loading-icon" />
          <h2>Loading Executive Intelligence...</h2>
          <p>Analyzing renewable deployment data.</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="executive-error">
          <Activity size={32} />
          <h2>Unable to Load Dashboard</h2>
          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const statistics = dashboard?.statistics || {};
  const topSite = dashboard?.top_site;
  const energyDistribution =
    dashboard?.energy_distribution || {};

  const recentPredictions =
    dashboard?.recent_predictions || [];

  const totalSites = statistics.total_sites || 0;
  const totalProjects = statistics.total_projects || 0;
  const totalPredictions =
    statistics.total_predictions || 0;

  const solarScore =
    statistics.average_solar_score || 0;

  const windScore =
    statistics.average_wind_score || 0;

  const overallScore =
    statistics.average_overall_score || 0;

  const averagePower =
    statistics.average_prediction || 0;

  const solarRecommendations =
    energyDistribution.Solar || 0;

  const windRecommendations =
    energyDistribution.Wind || 0;

  const totalRecommendations =
    solarRecommendations + windRecommendations;

  const solarPercentage =
    totalRecommendations > 0
      ? Math.round(
          (solarRecommendations /
            totalRecommendations) *
            100
        )
      : 0;

  const windPercentage =
    totalRecommendations > 0
      ? Math.round(
          (windRecommendations /
            totalRecommendations) *
            100
        )
      : 0;

  const getPerformanceLabel = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Moderate";
    return "Needs Improvement";
  };

  const openTopSite = () => {
    if (topSite?.site_id) {
      navigate(
        `/prediction?siteId=${topSite.site_id}`
      );
    } else {
      navigate("/prediction");
    }
  };

  return (
    <DashboardLayout>
      <div className="executive-dashboard">

        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          className="executive-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="executive-badge">
              <Brain size={17} />
              EXECUTIVE INTELLIGENCE
            </div>

            <h1>
              Renewable Energy
              <span> Executive Dashboard</span>
            </h1>

            <p>
              Strategic overview of renewable
              energy deployment, site suitability
              and AI-powered investment intelligence.
            </p>
          </div>

          <div className="executive-header-icon">
            <Zap size={55} />
          </div>
        </motion.div>

        {/* =====================================
            KPI CARDS
        ===================================== */}

        <div className="executive-kpis">

          <motion.div
            className="executive-kpi blue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="kpi-icon">
              <MapPin size={24} />
            </div>

            <div>
              <span>Total Sites</span>
              <h2>{totalSites}</h2>
              <small>Renewable locations analyzed</small>
            </div>
          </motion.div>

          <motion.div
            className="executive-kpi green"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="kpi-icon">
              <FolderKanban size={24} />
            </div>

            <div>
              <span>Total Projects</span>
              <h2>{totalProjects}</h2>
              <small>Renewable projects registered</small>
            </div>
          </motion.div>

          <motion.div
            className="executive-kpi purple"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="kpi-icon">
              <Brain size={24} />
            </div>

            <div>
              <span>AI Predictions</span>
              <h2>{totalPredictions}</h2>
              <small>Intelligence analyses generated</small>
            </div>
          </motion.div>

          <motion.div
            className="executive-kpi orange"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="kpi-icon">
              <Trophy size={24} />
            </div>

            <div>
              <span>Overall Suitability</span>
              <h2>{overallScore}%</h2>
              <small>
                {getPerformanceLabel(overallScore)}
              </small>
            </div>
          </motion.div>

        </div>

        {/* =====================================
            PERFORMANCE SECTION
        ===================================== */}

        <div className="executive-grid">

          {/* SOLAR VS WIND */}

          <motion.section
            className="executive-panel performance-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="panel-heading">
              <div>
                <span className="panel-label">
                  RESOURCE PERFORMANCE
                </span>

                <h2>
                  Solar vs Wind Performance
                </h2>

                <p>
                  Average renewable resource
                  suitability across analyzed sites.
                </p>
              </div>

              <TrendingUp size={25} />
            </div>

            <div className="resource-comparison">

              <div className="resource-item">
                <div className="resource-top">
                  <div className="resource-name">
                    <Sun size={21} />
                    Solar
                  </div>

                  <strong>{solarScore}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill solar-fill"
                    style={{
                      width: `${solarScore}%`,
                    }}
                  />
                </div>

                <div className="resource-bottom">
                  <span>
                    {getPerformanceLabel(solarScore)}
                  </span>

                  <span>
                    Suitability
                  </span>
                </div>
              </div>

              <div className="resource-item">
                <div className="resource-top">
                  <div className="resource-name">
                    <Wind size={21} />
                    Wind
                  </div>

                  <strong>{windScore}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill wind-fill"
                    style={{
                      width: `${windScore}%`,
                    }}
                  />
                </div>

                <div className="resource-bottom">
                  <span>
                    {getPerformanceLabel(windScore)}
                  </span>

                  <span>
                    Suitability
                  </span>
                </div>
              </div>

            </div>

            <div className="performance-insight">
              <Target size={20} />

              <span>
                {windScore > solarScore
                  ? "Wind currently shows stronger average suitability across analyzed sites."
                  : solarScore > windScore
                  ? "Solar currently shows stronger average suitability across analyzed sites."
                  : "Solar and wind currently show equal average suitability."
                }
              </span>
            </div>
          </motion.section>

          {/* ENERGY RECOMMENDATION */}

          <motion.section
            className="executive-panel recommendation-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="panel-heading">
              <div>
                <span className="panel-label">
                  AI RECOMMENDATIONS
                </span>

                <h2>
                  Energy Recommendation
                </h2>

                <p>
                  AI-recommended renewable sources.
                </p>
              </div>

              <Brain size={25} />
            </div>

            <div className="recommendation-bars">

              <div className="recommendation-item">
                <div className="recommendation-top">
                  <span>
                    <Sun size={18} />
                    Solar
                  </span>

                  <strong>
                    {solarPercentage}%
                  </strong>
                </div>

                <div className="recommendation-track">
                  <div
                    className="recommendation-fill solar-rec"
                    style={{
                      width: `${solarPercentage}%`,
                    }}
                  />
                </div>

                <small>
                  {solarRecommendations} recommendations
                </small>
              </div>

              <div className="recommendation-item">
                <div className="recommendation-top">
                  <span>
                    <Wind size={18} />
                    Wind
                  </span>

                  <strong>
                    {windPercentage}%
                  </strong>
                </div>

                <div className="recommendation-track">
                  <div
                    className="recommendation-fill wind-rec"
                    style={{
                      width: `${windPercentage}%`,
                    }}
                  />
                </div>

                <small>
                  {windRecommendations} recommendations
                </small>
              </div>

            </div>

            <div className="recommendation-total">
              <Zap size={19} />
              <strong>{totalRecommendations}</strong>
              renewable energy recommendations analyzed
            </div>
          </motion.section>

        </div>

        {/* =====================================
            TOP SITE
        ===================================== */}

        <motion.section
          className="top-opportunity"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="opportunity-left">

            <div className="opportunity-badge">
              <Trophy size={16} />
              TOP DEPLOYMENT OPPORTUNITY
            </div>

            <h2>
              {topSite?.site_name || "No Site Available"}
            </h2>

            <p>
              Highest AI deployment suitability
              among analyzed renewable sites.
            </p>

            {topSite && (
              <button
                className="opportunity-button"
                onClick={openTopSite}
              >
                View AI Recommendation
                <ArrowRight size={18} />
              </button>
            )}

          </div>

          <div className="opportunity-stats">

            <div>
              <span>Overall Score</span>
              <strong>
                {topSite?.overall_score || 0}%
              </strong>
            </div>

            <div>
              <span>Predicted Power</span>
              <strong>
                {topSite?.predicted_power || 0} W
              </strong>
            </div>

            <div>
              <span>Recommended Source</span>
              <strong>
                {topSite?.best_energy_source || "N/A"}
              </strong>
            </div>

            <div>
              <span>Recommendation</span>
              <strong>
                {topSite?.recommendation || "N/A"}
              </strong>
            </div>

          </div>
        </motion.section>

        {/* =====================================
            SUMMARY CARDS
        ===================================== */}

        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-icon">
              <Sun size={23} />
            </div>

            <span>Solar Suitability</span>

            <h2>{solarScore}%</h2>

            <p>
              {getPerformanceLabel(solarScore)}
              renewable potential
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Wind size={23} />
            </div>

            <span>Wind Suitability</span>

            <h2>{windScore}%</h2>

            <p>
              {getPerformanceLabel(windScore)}
              renewable potential
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Zap size={23} />
            </div>

            <span>Average Predicted Power</span>

            <h2>{averagePower}</h2>

            <p>AI model output</p>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Target size={23} />
            </div>

            <span>Deployment Score</span>

            <h2>{overallScore}%</h2>

            <p>
              Overall renewable suitability
            </p>
          </div>

        </div>

        {/* =====================================
            RECENT AI ACTIVITY
        ===================================== */}

        <motion.section
          className="executive-panel recent-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="panel-heading">
            <div>
              <span className="panel-label">
                AI ACTIVITY
              </span>

              <h2>
                Recent AI Predictions
              </h2>

              <p>
                Latest renewable intelligence
                generated by the platform.
              </p>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/analytics")}
            >
              View Analytics
              <ArrowRight size={17} />
            </button>
          </div>

          {recentPredictions.length > 0 ? (
            <div className="prediction-table-wrapper">

              <table className="prediction-table">

                <thead>
                  <tr>
                    <th>Site</th>
                    <th>Predicted Power</th>
                    <th>Overall Score</th>
                    <th>Recommendation</th>
                    <th>Generated</th>
                  </tr>
                </thead>

                <tbody>
                  {recentPredictions.map(
                    (item, index) => (
                      <tr key={index}>

                        <td>
                          <div className="site-cell">
                            <MapPin size={17} />
                            Site {item.site_id}
                          </div>
                        </td>

                        <td>
                          <strong>
                            {item.predicted_power} W
                          </strong>
                        </td>

                        <td>
                          <span className="score-pill">
                            {item.overall_score}%
                          </span>
                        </td>

                        <td>
                          <span className="recommendation-pill">
                            {item.recommendation}
                          </span>
                        </td>

                        <td>
                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleString()
                            : "N/A"}
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <div className="empty-activity">
              <Brain size={35} />
              <h3>No AI predictions yet</h3>
              <p>
                Generate your first prediction to
                see intelligence activity here.
              </p>
            </div>
          )}
        </motion.section>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <section className="quick-actions-section">

          <div className="section-heading">
            <div>
              <span>PLATFORM MODULES</span>
              <h2>Renewable Intelligence Tools</h2>
            </div>

            <p>
              Explore deeper site and deployment
              intelligence.
            </p>
          </div>

          <div className="quick-actions">

            <button
              onClick={() => navigate("/prediction")}
              className="quick-action"
            >
              <div className="quick-action-icon">
                <Brain size={23} />
              </div>

              <div>
                <h3>AI Prediction</h3>
                <p>
                  Generate ML-powered solar
                  prediction and deployment
                  recommendations.
                </p>
              </div>

              <ArrowRight size={19} />
            </button>

            <button
              onClick={() =>
                navigate("/resource-assessment")
              }
              className="quick-action"
            >
              <div className="quick-action-icon">
                <Wind size={23} />
              </div>

              <div>
                <h3>Resource Assessment</h3>
                <p>
                  Analyze wind resource quality,
                  classification and deployment
                  potential.
                </p>
              </div>

              <ArrowRight size={19} />
            </button>

            <button
              onClick={() => navigate("/gis")}
              className="quick-action"
            >
              <div className="quick-action-icon">
                <Globe size={23} />
              </div>

              <div>
                <h3>GIS Intelligence</h3>
                <p>
                  Explore renewable sites and
                  geographic deployment information.
                </p>
              </div>

              <ArrowRight size={19} />
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="quick-action"
            >
              <div className="quick-action-icon">
                <BarChart3 size={23} />
              </div>

              <div>
                <h3>Analytics</h3>
                <p>
                  Review historical predictions,
                  trends and renewable performance.
                </p>
              </div>

              <ArrowRight size={19} />
            </button>

            <button
              onClick={() =>
                navigate("/resource-assessment")
              }
              className="quick-action"
            >
              <div className="quick-action-icon">
                <FileText size={23} />
              </div>

              <div>
                <h3>Resource Reports</h3>
                <p>
                  Generate professional renewable
                  resource assessment reports.
                </p>
              </div>

              <ArrowRight size={19} />
            </button>

          </div>
        </section>

        {/* =====================================
            FOOTER INSIGHT
        ===================================== */}

        <div className="executive-insight">
          <Brain size={22} />

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

      </div>
    </DashboardLayout>
  );
}

export default ExecutiveDashboard;
