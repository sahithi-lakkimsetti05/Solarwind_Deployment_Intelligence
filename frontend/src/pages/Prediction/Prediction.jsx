import "./Prediction.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Brain,
  Zap,
  Wind,
  Sun,
  CloudSun,
  TrendingUp,
  History,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  Target,
  ArrowRight,
  Sparkles,
  Settings,
  Layers
} from "lucide-react";

import api from "../../services/api";
import {
  getDeploymentOptimization
} from "../../services/predictionService";

function Prediction() {
  const [searchParams] = useSearchParams();

  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);

  // Investment state
  const [investment, setInvestment] = useState(null);
  // Deployment Optimization state
const [deploymentOptimization, setDeploymentOptimization] = useState(null);

// Solar Forecast state
const [forecast, setForecast] = useState(null);

  const [error, setError] = useState("");

  // =====================================================
  // READ SITE ID FROM URL
  // =====================================================

  useEffect(() => {
    const urlSiteId = searchParams.get("siteId");

    if (urlSiteId) {
      setSiteId(urlSiteId);
    }
  }, [searchParams]);

  // =====================================================
  // RUN AI PREDICTION
  // =====================================================

  const handlePrediction = async (selectedSiteId = siteId) => {
    if (!selectedSiteId) {
      setError("Please enter a site ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Clear old results
      setPrediction(null);
setAnalytics(null);
setRecommendation(null);
setHistory([]);
setInvestment(null);
setDeploymentOptimization(null);
setForecast(null);

      // =================================================
      // STEP 1 - ML SOLAR PREDICTION
      // =================================================

      const predictionResponse = await api.get(
        `/prediction/ml/solar/${selectedSiteId}`
      );

      setPrediction(predictionResponse.data);

      // =================================================
      // STEP 2 - GET ALL ADDITIONAL INTELLIGENCE
      // =================================================

      const [
  recommendationResponse,
  analyticsResponse,
  historyResponse,
  investmentResponse,
  deploymentResponse,
  forecastResponse
] = await Promise.all([
  api.get(
    `/prediction/recommendation/${selectedSiteId}`
  ),

  api.get(
    `/prediction/analytics/${selectedSiteId}`
  ),

  api.get(
    `/prediction/history/${selectedSiteId}`
  ),

  api.get(
    `/prediction/investment/${selectedSiteId}`
  ),

  api.get(
    `/prediction/deployment-optimization/${selectedSiteId}`
  ),

  api.get(
    `/prediction/forecast/${selectedSiteId}`
  )
]);

      // =================================================
      // RECOMMENDATION
      // =================================================

      setRecommendation(
        recommendationResponse.data
      );

      // =================================================
      // ANALYTICS
      // =================================================

      setAnalytics(
        analyticsResponse.data
      );

      // =================================================
      // HISTORY
      // =================================================

      setHistory(
        historyResponse.data
      );

      // =================================================
      // INVESTMENT
      //
      // Backend returns:
      //
      // {
      //   site_id: 1,
      //   site: {...},
      //   site_intelligence: {...},
      //   investment: {...}
      // }
      //
      // Therefore we specifically extract .investment
      // =================================================

      console.log(
        "Investment API response:",
        investmentResponse.data
      );

      setInvestment(
        investmentResponse.data?.investment ||
        null
      );
      // =================================================
// DEPLOYMENT OPTIMIZATION
// =================================================

console.log(
  "Deployment Optimization API response:",
  deploymentResponse.data
);

setDeploymentOptimization(
  deploymentResponse.data?.deployment_optimization ||
  null
);


// =================================================
// SOLAR FORECAST
// =================================================

console.log(
  "Solar Forecast API response:",
  forecastResponse.data
);

setForecast(
  forecastResponse.data?.forecast ||
  null
);

    } catch (err) {
      console.error(
        "Prediction error:",
        err
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      setError(
        err.response?.data?.detail ||
        "Unable to generate AI prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // AUTOMATIC PREDICTION FROM DASHBOARD
  // =====================================================

  useEffect(() => {
    const urlSiteId = searchParams.get("siteId");

    if (urlSiteId) {
      handlePrediction(urlSiteId);
    }
  }, [searchParams]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="prediction-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="prediction-header">

        <div>

          <div className="prediction-title-row">

            <Brain size={32} />

            <h1>
              AI Prediction
            </h1>

          </div>

          <p>
            AI-powered renewable energy deployment intelligence
          </p>

        </div>

      </div>


      {/* =================================================
          INPUT CARD
      ================================================= */}

      <div className="prediction-input-card">

        <div className="input-section">

          <label>
            Site ID
          </label>

          <input
            type="number"
            placeholder="Enter site ID"
            value={siteId}
            onChange={(e) =>
              setSiteId(e.target.value)
            }
          />

        </div>

        <button
          className="prediction-button"
          onClick={() => handlePrediction()}
          disabled={loading}
        >

          <Brain size={20} />

          {loading
            ? "Generating Prediction..."
            : "Run AI Prediction"}

        </button>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="prediction-error">
          {error}
        </div>
      )}


      {/* =================================================
          RESULTS
      ================================================= */}

      {prediction && (

        <div className="prediction-results">

          {/* =================================================
              POWER CARD
          ================================================= */}

          <div className="power-card">

            <Zap size={38} />

            <div>

              <span>
                Predicted Solar Power
              </span>

              <h2>
                {prediction.predicted_power} W
              </h2>

              <small>
                Model: {prediction.model}
              </small>

            </div>

          </div>


          {/* =================================================
              SCORE CARDS
          ================================================= */}

          <div className="score-grid">

            <div className="score-card solar-score">

              <Sun size={30} />

              <span>
                Solar Score
              </span>

              <h2>
                {prediction.solar_score}%
              </h2>

            </div>


            <div className="score-card wind-score">

              <Wind size={30} />

              <span>
                Wind Score
              </span>

              <h2>
                {prediction.wind_score}%
              </h2>

            </div>


            <div className="score-card overall-score">

              <Brain size={30} />

              <span>
                Overall Score
              </span>

              <h2>
                {prediction.overall_score}%
              </h2>

            </div>

          </div>


          {/* =================================================
              RECOMMENDATION
          ================================================= */}

          <div className="recommendation-card">

            <div className="recommendation-icon">

              <CloudSun size={35} />

            </div>

            <div>

              <span>
                Recommended Energy Source
              </span>

              <h2>
                {prediction.best_energy_source}
              </h2>

              <p>
                {prediction.recommendation}
              </p>

            </div>

          </div>


          {/* =================================================
              LIVE ENVIRONMENT
          ================================================= */}

          <div className="environment-card">

            <h2>
              Live Environmental Conditions
            </h2>

            <div className="environment-grid">

              <div>

                <span>
                  Temperature
                </span>

                <strong>
                  {prediction.live_environment?.temperature ?? "-"}
                </strong>

              </div>


              <div>

                <span>
                  Rainfall
                </span>

                <strong>
                  {prediction.live_environment?.rainfall ?? "-"}
                </strong>

              </div>


              <div>

                <span>
                  Air Pressure
                </span>

                <strong>
                  {prediction.live_environment?.air_pressure ?? "-"}
                </strong>

              </div>


              <div>

                <span>
                  Cloud Cover
                </span>

                <strong>
                  {prediction.live_environment?.cloud ?? "-"}
                </strong>

              </div>


              <div>

                <span>
                  Solar Irradiance (G)
                </span>

                <strong>
                  {prediction.live_environment?.irradiance_g ?? "-"}
                </strong>

              </div>


              <div>

                <span>
                  Solar Irradiance (A)
                </span>

                <strong>
                  {prediction.live_environment?.irradiance_a ?? "-"}
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              SITE INTELLIGENCE
          ================================================= */}

          {recommendation && (

            <div className="recommendation-details-card">

              <div className="section-heading">

                <Brain size={25} />

                <div>

                  <h2>
                    Site Intelligence
                  </h2>

                  <p>
                    Environmental suitability analysis
                  </p>

                </div>

              </div>


              <div className="intelligence-grid">

                <div className="intelligence-section">

                  <h3>

                    <CheckCircle size={20} />

                    Strengths

                  </h3>

                  {recommendation.strengths?.length > 0 ? (

                    <ul>

                      {recommendation.strengths.map(
                        (item, index) => (

                          <li key={index}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p>
                      No major strengths identified.
                    </p>

                  )}

                </div>


                <div className="intelligence-section">

                  <h3>

                    <AlertTriangle size={20} />

                    Weaknesses

                  </h3>

                  {recommendation.weaknesses?.length > 0 ? (

                    <ul>

                      {recommendation.weaknesses.map(
                        (item, index) => (

                          <li key={index}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p>
                      No major weaknesses identified.
                    </p>

                  )}

                </div>

              </div>


              <div className="site-suggestion">

                <strong>
                  AI Recommendation
                </strong>

                <p>
                  {recommendation.suggestion}
                </p>

              </div>

            </div>

          )}


          {/* =================================================
              INVESTMENT RECOMMENDATION
          ================================================= */}

          {investment && (

            <div className="investment-card">

              {/* ---------------------------------------------
                  HEADER
              --------------------------------------------- */}

              <div className="investment-header">

                <div className="investment-title-icon">

                  <DollarSign size={28} />

                </div>

                <div>

                  <h2>
                    Investment Recommendation
                  </h2>

                  <p>
                    AI-powered investment and deployment assessment
                  </p>

                </div>

              </div>


              {/* ---------------------------------------------
                  INVESTMENT METRICS
              --------------------------------------------- */}

              <div className="investment-grid">

                {/* Investment Rating */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <Sparkles size={20} />
                  </div>

                  <span>
                    Investment Rating
                  </span>

                  <strong>
                    {investment.investment_rating ?? "N/A"}
                  </strong>

                </div>


                {/* Investment Level */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <TrendingUp size={20} />
                  </div>

                  <span>
                    Investment Level
                  </span>

                  <strong>
                    {investment.investment_level ?? "N/A"}
                  </strong>

                </div>


                {/* Risk */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <ShieldCheck size={20} />
                  </div>

                  <span>
                    Risk Level
                  </span>

                  <strong>
                    {investment.risk_level ?? "N/A"}
                  </strong>

                </div>


                {/* Recommended Source */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <Zap size={20} />
                  </div>

                  <span>
                    Recommended Source
                  </span>

                  <strong>
                    {investment.recommended_source ?? "N/A"}
                  </strong>

                </div>


                {/* Suitability */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <Target size={20} />
                  </div>

                  <span>
                    Site Suitability
                  </span>

                  <strong>
                    {investment.suitability ?? "N/A"}
                  </strong>

                </div>


                {/* Deployment Priority */}

                <div className="investment-item">

                  <div className="investment-item-icon">
                    <ArrowRight size={20} />
                  </div>

                  <span>
                    Deployment Priority
                  </span>

                  <strong>
                    {investment.deployment_priority ?? "N/A"}
                  </strong>

                </div>

              </div>


              {/* ---------------------------------------------
                  OVERALL SCORE
              --------------------------------------------- */}

              <div className="investment-score">

                <div>

                  <span>
                    Overall Site Score
                  </span>

                  <strong>
                    {investment.overall_score ?? 0}
                    <small>/100</small>
                  </strong>

                </div>

                <div className="investment-score-bar">

                  <div
                    className="investment-score-fill"
                    style={{
                      width: `${Math.min(
                        Number(investment.overall_score) || 0,
                        100
                      )}%`
                    }}
                  ></div>

                </div>

              </div>


              {/* ---------------------------------------------
                  WHY THIS INVESTMENT?
              --------------------------------------------- */}

              <div className="investment-text-section">

                <h3>
                  Why this investment?
                </h3>

                <p>
                  {investment.investment_reason ||
                    "No investment reason available."}
                </p>

              </div>


              {/* ---------------------------------------------
                  FINANCIAL ASSESSMENT
              --------------------------------------------- */}

              <div className="investment-text-section">

                <h3>
                  Financial Assessment
                </h3>

                <p>
                  {investment.financial_assessment ||
                    "No financial assessment available."}
                </p>

              </div>


              {/* ---------------------------------------------
                  AI INVESTMENT RECOMMENDATION
              --------------------------------------------- */}

              <div className="investment-highlight">

                <div className="investment-highlight-icon">

                  <Sparkles size={22} />

                </div>

                <div>

                  <strong>
                    AI Investment Recommendation
                  </strong>

                  <p>
                    {investment.investment_recommendation ||
                      "No investment recommendation available."}
                  </p>

                </div>

              </div>


              {/* ---------------------------------------------
                  NEXT STEP
              --------------------------------------------- */}

              <div className="investment-next-step">

                <div className="investment-next-icon">

                  <ArrowRight size={22} />

                </div>

                <div>

                  <strong>
                    Recommended Next Step
                  </strong>

                  <p>
                    {investment.next_step ||
                      "No next step available."}
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
    DEPLOYMENT OPTIMIZATION
================================================= */}

{deploymentOptimization && (

  <div className="deployment-optimization-card">

    <div className="section-heading">

      <Target size={25} />

      <div>

        <h2>
          Deployment Optimization
        </h2>

        <p>
          AI-powered renewable energy deployment strategy
        </p>

      </div>

    </div>


    {/* =============================================
        DEPLOYMENT SUMMARY
    ============================================= */}

    <div className="deployment-summary">

      <div className="deployment-main">

        <span>
          Recommended Energy Source
        </span>

        <strong>
          {deploymentOptimization.recommended_source || "N/A"}
        </strong>

      </div>


      <div className="deployment-decision">

        <span>
          Deployment Decision
        </span>

        <strong>
          {deploymentOptimization.deployment_decision || "N/A"}
        </strong>

      </div>

    </div>


    {/* =============================================
        OPTIMIZATION METRICS
    ============================================= */}

    <div className="deployment-grid">

      <div className="deployment-item">

        <span>
          Alternative Source
        </span>

        <strong>
          {deploymentOptimization.alternative_source || "N/A"}
        </strong>

      </div>


      <div className="deployment-item">

        <span>
          Overall Score
        </span>

        <strong>
          {deploymentOptimization.overall_score ?? 0}/100
        </strong>

      </div>


      <div className="deployment-item">

        <span>
          Site Suitability
        </span>

        <strong>
          {deploymentOptimization.suitability || "N/A"}
        </strong>

      </div>


      <div className="deployment-item">

        <span>
          Deployment Priority
        </span>

        <strong>
          {deploymentOptimization.deployment_priority || "N/A"}
        </strong>

      </div>

    </div>


    {/* =============================================
        DEPLOYMENT STRATEGY
    ============================================= */}

    <div className="deployment-text-section">

      <h3>
        Deployment Strategy
      </h3>

      <p>
        {deploymentOptimization.deployment_strategy ||
          "No deployment strategy available."}
      </p>

    </div>


    {/* =============================================
        SOURCE REASON
    ============================================= */}

    <div className="deployment-text-section">

      <h3>
        Why this source?
      </h3>

      <p>
        {deploymentOptimization.source_reason ||
          "No source reasoning available."}
      </p>

    </div>


    {/* =============================================
        OPTIMIZATION REASON
    ============================================= */}

    <div className="deployment-highlight">

      <div className="deployment-highlight-icon">

        <Sparkles size={22} />

      </div>

      <div>

        <strong>
          AI Optimization Insight
        </strong>

        <p>
          {deploymentOptimization.optimization_reason ||
            "No optimization insight available."}
        </p>

      </div>

    </div>


    {/* =============================================
        WIND RESOURCE
    ============================================= */}

    {deploymentOptimization.wind_resource && (

      <div className="wind-resource-summary">

        <h3>
          Wind Resource Assessment
        </h3>

        <div className="wind-resource-grid">

          <div>

            <span>
              Wind Class
            </span>

            <strong>
              {deploymentOptimization.wind_resource.wind_class ||
                "N/A"}
            </strong>

          </div>

          <div>

            <span>
              Resource Level
            </span>

            <strong>
              {deploymentOptimization.wind_resource.resource_level ||
                "N/A"}
            </strong>

          </div>

        </div>

      </div>

    )}

  </div>

)}

{/* =================================================
    SOLAR POWER FORECAST
================================================= */}

{forecast && (

  <div className="forecast-card">

    <div className="section-heading">

      <TrendingUp size={25} />

      <div>

        <h2>
          Solar Power Forecast
        </h2>

        <p>
          AI-based solar generation potential forecast
        </p>

      </div>

    </div>


    <div className="forecast-main">

      <div className="forecast-power">

        <span>
          Predicted Power
        </span>

        <strong>
          {forecast.predicted_power ?? 0}
        </strong>

        <small>
          {forecast.unit || "kW"}
        </small>

      </div>


      <div className="forecast-status">

        <span>
          Status
        </span>

        <strong>
          {forecast.status || "N/A"}
        </strong>

      </div>

    </div>


    <div className="forecast-details">

      <div>

        <span>
          Model
        </span>

        <strong>
          {forecast.model || "N/A"}
        </strong>

      </div>


      <div>

        <span>
          Forecast Type
        </span>

        <strong>
          {forecast.forecast_type || "Solar Power Forecast"}
        </strong>

      </div>

    </div>

  </div>

)}


          {/* =================================================
              ANALYTICS
          ================================================= */}

          {analytics && (

            <div className="analytics-card">

              <div className="section-heading">

                <TrendingUp size={25} />

                <div>

                  <h2>
                    Prediction Analytics
                  </h2>

                  <p>
                    Historical prediction performance for this site
                  </p>

                </div>

              </div>


              <div className="analytics-grid">

                <div className="analytics-item">

                  <span>
                    Total Predictions
                  </span>

                  <strong>
                    {analytics.total_predictions}
                  </strong>

                </div>


                <div className="analytics-item">

                  <span>
                    Average Power
                  </span>

                  <strong>
                    {analytics.average_predicted_power} W
                  </strong>

                </div>


                <div className="analytics-item">

                  <span>
                    Average Solar Score
                  </span>

                  <strong>
                    {analytics.average_solar_score}%
                  </strong>

                </div>


                <div className="analytics-item">

                  <span>
                    Average Wind Score
                  </span>

                  <strong>
                    {analytics.average_wind_score}%
                  </strong>

                </div>


                <div className="analytics-item">

                  <span>
                    Average Overall Score
                  </span>

                  <strong>
                    {analytics.average_overall_score}%
                  </strong>

                </div>


                <div className="analytics-item">

                  <span>
                    Best Energy Source
                  </span>

                  <strong>
                    {analytics.best_energy_source}
                  </strong>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              PREDICTION HISTORY
          ================================================= */}

          {history.length > 0 && (

            <div className="history-card">

              <div className="section-heading">

                <History size={25} />

                <div>

                  <h2>
                    Prediction History
                  </h2>

                  <p>
                    Previous AI predictions for this site
                  </p>

                </div>

              </div>


              <div className="history-table-wrapper">

                <table className="history-table">

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Power
                      </th>

                      <th>
                        Solar
                      </th>

                      <th>
                        Wind
                      </th>

                      <th>
                        Overall
                      </th>

                      <th>
                        Source
                      </th>

                      <th>
                        Recommendation
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {history.map((record) => (

                      <tr key={record.id}>

                        <td>
                          {formatDate(
                            record.created_at
                          )}
                        </td>

                        <td>
                          {record.predicted_power} W
                        </td>

                        <td>
                          {record.solar_score}%
                        </td>

                        <td>
                          {record.wind_score}%
                        </td>

                        <td>
                          {record.overall_score}%
                        </td>

                        <td>
                          {record.best_energy_source}
                        </td>

                        <td>
                          {record.recommendation}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default Prediction;