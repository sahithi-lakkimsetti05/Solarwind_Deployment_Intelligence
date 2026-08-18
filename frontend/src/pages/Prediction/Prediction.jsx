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
  AlertTriangle
} from "lucide-react";

import api from "../../services/api";

function Prediction() {
  const [searchParams] = useSearchParams();

  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);

  const [error, setError] = useState("");

  // ========================================
  // READ SITE ID FROM URL
  // ========================================

  useEffect(() => {
    const urlSiteId = searchParams.get("siteId");

    if (urlSiteId) {
      setSiteId(urlSiteId);
    }
  }, [searchParams]);

  // ========================================
  // RUN AI PREDICTION
  // ========================================

  const handlePrediction = async (selectedSiteId = siteId) => {
    if (!selectedSiteId) {
      setError("Please enter a site ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      setPrediction(null);
      setAnalytics(null);
      setRecommendation(null);
      setHistory([]);

      /*
       * STEP 1
       * Run the existing ML prediction.
       *
       * This endpoint also creates a prediction-history
       * record in the database.
       */

      const predictionResponse = await api.get(
        `/prediction/ml/solar/${selectedSiteId}`
      );

      setPrediction(predictionResponse.data);

      /*
       * STEP 2
       * Fetch recommendation, analytics and history.
       */

      const [
        recommendationResponse,
        analyticsResponse,
        historyResponse
      ] = await Promise.all([
        api.get(
          `/prediction/recommendation/${selectedSiteId}`
        ),

        api.get(
          `/prediction/analytics/${selectedSiteId}`
        ),

        api.get(
          `/prediction/history/${selectedSiteId}`
        )
      ]);

      setRecommendation(
        recommendationResponse.data
      );

      setAnalytics(
        analyticsResponse.data
      );

      setHistory(
        historyResponse.data
      );

    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to generate AI prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // AUTOMATIC PREDICTION FROM DASHBOARD
  // ========================================

  useEffect(() => {
    const urlSiteId = searchParams.get("siteId");

    if (urlSiteId) {
      handlePrediction(urlSiteId);
    }
  }, [searchParams]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="prediction-page">

      {/* =========================================
          HEADER
      ========================================= */}

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


      {/* =========================================
          INPUT CARD
      ========================================= */}

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


      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="prediction-error">
          {error}
        </div>
      )}


      {/* =========================================
          CURRENT AI PREDICTION
      ========================================= */}

      {prediction && (
        <div className="prediction-results">

          {/* =====================================
              POWER
          ===================================== */}

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


          {/* =====================================
              SCORE CARDS
          ===================================== */}

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


          {/* =====================================
              RECOMMENDATION
          ===================================== */}

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


          {/* =====================================
              LIVE ENVIRONMENT
          ===================================== */}

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
                  {prediction.live_environment.temperature}
                </strong>
              </div>


              <div>
                <span>
                  Rainfall
                </span>

                <strong>
                  {prediction.live_environment.rainfall}
                </strong>
              </div>


              <div>
                <span>
                  Air Pressure
                </span>

                <strong>
                  {prediction.live_environment.air_pressure}
                </strong>
              </div>


              <div>
                <span>
                  Cloud Cover
                </span>

                <strong>
                  {prediction.live_environment.cloud}
                </strong>
              </div>


              <div>
                <span>
                  Solar Irradiance (G)
                </span>

                <strong>
                  {prediction.live_environment.irradiance_g}
                </strong>
              </div>


              <div>
                <span>
                  Solar Irradiance (A)
                </span>

                <strong>
                  {prediction.live_environment.irradiance_a}
                </strong>
              </div>

            </div>

          </div>


          {/* =====================================
              SITE INTELLIGENCE
          ===================================== */}

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


          {/* =====================================
              ANALYTICS
          ===================================== */}

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


          {/* =====================================
              PREDICTION HISTORY
          ===================================== */}

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
                          {formatDate(record.created_at)}
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
