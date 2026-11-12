import "./RenewableDashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  Sun,
  Wind,
  Zap,
  Brain,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  BarChart3,
  FileText,
  Gauge,
} from "lucide-react";

import { getDashboardHome } from "../../services/dashboardService";
import { getWindResourceAssessment } from "../../services/predictionService";

function RenewableDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [windResource, setWindResource] = useState(null);

  const [loading, setLoading] = useState(true);
  const [windLoading, setWindLoading] = useState(false);

  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD DASHBOARD
  // --------------------------------------------------

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardHome();

      setDashboard(data);

      // Load wind resource for top site if available
      if (data?.top_site?.site_id) {
        loadWindResource(data.top_site.site_id);
      }
    } catch (err) {
      console.error("Renewable dashboard error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load renewable energy dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD WIND RESOURCE
  // --------------------------------------------------

  const loadWindResource = async (siteId) => {
    try {
      setWindLoading(true);

      const data = await getWindResourceAssessment(siteId);

      setWindResource(data);
    } catch (err) {
      console.error("Wind resource error:", err);
      setWindResource(null);
    } finally {
      setWindLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <DashboardLayout>
        <div className="renewable-loading">
          <RefreshCw className="loading-icon" size={42} />
          <h2>Loading Renewable Intelligence...</h2>
          <p>
            Collecting renewable energy analytics and site intelligence.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <DashboardLayout>
        <div className="renewable-error">
          <h2>Unable to load dashboard</h2>
          <p>{error}</p>

          <button onClick={loadDashboard}>
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // --------------------------------------------------
  // DATA
  // --------------------------------------------------

  const statistics = dashboard?.statistics || {};
  const topSite = dashboard?.top_site || null;

  const energyDistribution =
    dashboard?.energy_distribution || {};

  const solarCount =
    energyDistribution.Solar || 0;

  const windCount =
    energyDistribution.Wind || 0;

  const totalRecommendations =
    solarCount + windCount;

  const solarPercentage =
    totalRecommendations > 0
      ? Math.round(
          (solarCount / totalRecommendations) * 100
        )
      : 0;

  const windPercentage =
    totalRecommendations > 0
      ? Math.round(
          (windCount / totalRecommendations) * 100
        )
      : 0;

  const overallScore =
    statistics.average_overall_score || 0;

  const solarScore =
    statistics.average_solar_score || 0;

  const windScore =
    statistics.average_wind_score || 0;

  const predictedPower =
    statistics.average_prediction || 0;

  const recommendedSource =
    topSite?.best_energy_source || "N/A";

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <DashboardLayout>
      <div className="renewable-dashboard">

        {/* ============================================
            HEADER
        ============================================ */}

        <section className="renewable-header">

          <div>

            <div className="renewable-eyebrow">
              <Gauge size={18} />
              RENEWABLE ENERGY INTELLIGENCE
            </div>

            <h1>
              Renewable Energy Dashboard
            </h1>

            <p>
              Monitor solar and wind performance,
              evaluate site suitability and make
              AI-powered deployment decisions.
            </p>

          </div>

          <button
            className="refresh-button"
            onClick={loadDashboard}
          >
            <RefreshCw size={18} />
            Refresh Data
          </button>

        </section>


        {/* ============================================
            MAIN KPI CARDS
        ============================================ */}

        <section className="renewable-kpi-grid">

          {/* SOLAR */}

          <div className="renewable-kpi solar-kpi">

            <div className="kpi-icon">
              <Sun size={28} />
            </div>

            <div className="kpi-content">

              <span>
                Solar Performance
              </span>

              <strong>
                {solarScore}%
              </strong>

              <small>
                Average Solar Suitability
              </small>

            </div>

          </div>


          {/* WIND */}

          <div className="renewable-kpi wind-kpi">

            <div className="kpi-icon">
              <Wind size={28} />
            </div>

            <div className="kpi-content">

              <span>
                Wind Performance
              </span>

              <strong>
                {windScore}%
              </strong>

              <small>
                Average Wind Suitability
              </small>

            </div>

          </div>


          {/* POWER */}

          <div className="renewable-kpi power-kpi">

            <div className="kpi-icon">
              <Zap size={28} />
            </div>

            <div className="kpi-content">

              <span>
                Predicted Power
              </span>

              <strong>
                {predictedPower}
              </strong>

              <small>
                Average AI prediction
              </small>

            </div>

          </div>


          {/* OVERALL */}

          <div className="renewable-kpi overall-kpi">

            <div className="kpi-icon">
              <Brain size={28} />
            </div>

            <div className="kpi-content">

              <span>
                Overall Suitability
              </span>

              <strong>
                {overallScore}/100
              </strong>

              <small>
                Renewable deployment score
              </small>

            </div>

          </div>

        </section>


        {/* ============================================
            PERFORMANCE OVERVIEW
        ============================================ */}

        <section className="renewable-main-grid">

          {/* ENERGY DISTRIBUTION */}

          <div className="renewable-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  ENERGY MIX
                </span>

                <h2>
                  Renewable Energy Distribution
                </h2>

              </div>

              <BarChart3 size={24} />

            </div>


            <div className="energy-distribution">

              {/* SOLAR */}

              <div className="energy-row">

                <div className="energy-row-header">

                  <div className="energy-name">
                    <Sun size={20} />
                    <span>Solar</span>
                  </div>

                  <strong>
                    {solarPercentage}%
                  </strong>

                </div>

                <div className="energy-progress">

                  <div
                    className="solar-progress"
                    style={{
                      width: `${solarPercentage}%`,
                    }}
                  />

                </div>

                <small>
                  {solarCount} AI recommendations
                </small>

              </div>


              {/* WIND */}

              <div className="energy-row">

                <div className="energy-row-header">

                  <div className="energy-name">
                    <Wind size={20} />
                    <span>Wind</span>
                  </div>

                  <strong>
                    {windPercentage}%
                  </strong>

                </div>

                <div className="energy-progress">

                  <div
                    className="wind-progress"
                    style={{
                      width: `${windPercentage}%`,
                    }}
                  />

                </div>

                <small>
                  {windCount} AI recommendations
                </small>

              </div>

            </div>

          </div>


          {/* BEST SITE */}

          <div className="renewable-panel best-site-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  AI SITE INTELLIGENCE
                </span>

                <h2>
                  Best Renewable Site
                </h2>

              </div>

              <MapPin size={24} />

            </div>


            {topSite ? (

              <>

                <div className="best-site-name">
                  {topSite.site_name}
                </div>

                <div className="site-score">

                  <div className="score-circle">
                    {topSite.overall_score}
                  </div>

                  <div>
                    <span>
                      Overall Score
                    </span>

                    <strong>
                      Excellent Potential
                    </strong>
                  </div>

                </div>


                <div className="site-details">

                  <div>
                    <span>
                      Recommended Source
                    </span>

                    <strong>
                      {recommendedSource}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Predicted Power
                    </span>

                    <strong>
                      {topSite.predicted_power}
                    </strong>
                  </div>

                </div>


                <button
                  className="view-button"
                  onClick={() =>
                    navigate(
                      `/prediction?siteId=${topSite.site_id}`
                    )
                  }
                >
                  View AI Recommendation
                  <ArrowRight size={18} />
                </button>

              </>

            ) : (

              <div className="no-data">

                <MapPin size={40} />

                <h3>
                  No Site Intelligence Available
                </h3>

                <p>
                  Generate an AI prediction to identify
                  the best renewable energy site.
                </p>

                <button
                  onClick={() =>
                    navigate("/prediction")
                  }
                >
                  Open AI Prediction
                </button>

              </div>

            )}

          </div>

        </section>


        {/* ============================================
            WIND RESOURCE
        ============================================ */}

        <section className="renewable-main-grid">

          <div className="renewable-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  WIND RESOURCE ASSESSMENT
                </span>

                <h2>
                  Wind Resource Intelligence
                </h2>

              </div>

              <Wind size={24} />

            </div>


            {windLoading ? (

              <div className="resource-loading">
                <RefreshCw size={24} />
                Loading wind resource...
              </div>

            ) : windResource?.wind_resource ? (

              <div className="wind-resource-content">

                <div className="resource-stat">

                  <span>
                    Wind Speed
                  </span>

                  <strong>
                    {windResource.wind_resource.wind_speed}
                    {" "}m/s
                  </strong>

                </div>


                <div className="resource-stat">

                  <span>
                    Wind Score
                  </span>

                  <strong>
                    {windResource.wind_resource.wind_score}
                    /100
                  </strong>

                </div>


                <div className="resource-stat">

                  <span>
                    Classification
                  </span>

                  <strong>
                    {windResource.wind_resource.wind_class}
                  </strong>

                </div>


                <div className="resource-stat">

                  <span>
                    Resource Level
                  </span>

                  <strong>
                    {windResource.wind_resource.resource_level}
                  </strong>

                </div>


                <div className="resource-recommendation">

                  <ShieldCheck size={22} />

                  <p>
                    {windResource.wind_resource.recommendation}
                  </p>

                </div>

              </div>

            ) : (

              <div className="no-resource">

                <Wind size={38} />

                <p>
                  Wind resource assessment is not
                  currently available for the selected site.
                </p>

              </div>

            )}

          </div>


          {/* DEPLOYMENT INSIGHT */}

          <div className="renewable-panel deployment-panel">

            <div className="panel-header">

              <div>

                <span className="panel-label">
                  AI DEPLOYMENT INTELLIGENCE
                </span>

                <h2>
                  Deployment Insight
                </h2>

              </div>

              <TrendingUp size={24} />

            </div>


            <div className="deployment-source">

              <span>
                Recommended Energy Source
              </span>

              <strong>
                {recommendedSource}
              </strong>

            </div>


            <div className="deployment-score">

              <span>
                Overall Renewable Score
              </span>

              <strong>
                {overallScore}/100
              </strong>

            </div>


            <p className="deployment-message">

              {topSite?.recommendation ||
                "Generate an AI prediction to receive a deployment recommendation."}

            </p>


            <button
              className="report-button"
              onClick={() =>
                navigate(
                  `/prediction${
                    topSite?.site_id
                      ? `?siteId=${topSite.site_id}`
                      : ""
                  }`
                )
              }
            >

              <FileText size={18} />

              View Full Assessment

              <ArrowRight size={18} />

            </button>

          </div>

        </section>


        {/* ============================================
            SUMMARY
        ============================================ */}

        <section className="renewable-summary">

          <div className="summary-icon">
            <Brain size={32} />
          </div>

          <div className="summary-content">

            <span>
              AI RENEWABLE ENERGY SUMMARY
            </span>

            <h2>
              {recommendedSource !== "N/A"
                ? `${recommendedSource} is currently the leading energy source`
                : "Renewable energy intelligence is ready"}
            </h2>

            <p>
              The dashboard combines solar suitability,
              wind resource assessment, AI power prediction
              and site intelligence to support renewable
              energy deployment decisions.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/analytics")
            }
          >
            View Analytics
            <ArrowRight size={18} />
          </button>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default RenewableDashboard;
