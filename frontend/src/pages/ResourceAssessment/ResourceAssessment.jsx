import "./ResourceAssessment.css";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Wind,
  MapPin,
  Gauge,
  Activity,
  Thermometer,
  Droplets,
  CloudRain,
  GaugeCircle,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Brain,
  Navigation,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getWindResourceAssessment } from "../../services/predictionService";

function ResourceAssessment() {
  const [searchParams] = useSearchParams();

  const [siteId, setSiteId] = useState(
    searchParams.get("siteId") || ""
  );

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD RESOURCE ASSESSMENT
  // ==========================================

  const handleAssessment = async (
    selectedSiteId = siteId
  ) => {
    if (!selectedSiteId) {
      setError("Please enter a Site ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAssessment(null);

      const data =
        await getWindResourceAssessment(
          selectedSiteId
        );

      setAssessment(data);

    } catch (err) {
      console.error(
        "Resource assessment error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to generate resource assessment."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PRINT / SAVE REPORT
  // ==========================================

  const generateReport = () => {
    if (!assessment) {
      return;
    }

    window.print();
  };

  // ==========================================
  // DATA
  // ==========================================

  const site = assessment?.site || {};

  const resource =
    assessment?.wind_resource || {};

  const environment =
    assessment?.environment || {};

  const windScore =
    resource.wind_score ?? 0;

  const resourceLevel =
    resource.resource_level || "Unknown";

  const windClass =
    resource.wind_class || "Unknown";

  const windSpeed =
    resource.wind_speed ?? "-";

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <DashboardLayout>

      <div className="resource-page">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="resource-header">

          <div>

            <div className="resource-title-row">

              <Wind size={34} />

              <h1>
                Resource Assessment
              </h1>

            </div>

            <p>
              AI-powered wind resource evaluation
              and renewable deployment assessment
            </p>

          </div>

        </div>


        {/* ======================================
            SITE INPUT
        ====================================== */}

        <div className="resource-input-card">

          <div className="resource-input-section">

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
            className="resource-button"
            onClick={() =>
              handleAssessment()
            }
            disabled={loading}
          >

            <Wind size={20} />

            {loading
              ? "Assessing Resource..."
              : "Assess Wind Resource"}

          </button>

        </div>


        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="resource-error">

            <AlertTriangle size={20} />

            {error}

          </div>
        )}


        {/* ======================================
            REPORT
        ====================================== */}

        {assessment && (

          <div className="resource-report">

            {/* ==================================
                REPORT HEADER
            ================================== */}

            <div className="report-header">

              <div>

                <div className="report-brand">

                  <Wind size={30} />

                  <span>
                    Solar & Wind Deployment
                    Intelligence
                  </span>

                </div>

                <h2>
                  Wind Resource Assessment Report
                </h2>

                <p>
                  AI-powered renewable energy
                  resource evaluation
                </p>

              </div>

              <button
                className="print-report-button"
                onClick={generateReport}
              >

                <Download size={18} />

                Generate Report

              </button>

            </div>


            {/* ==================================
                SITE INFORMATION
            ================================== */}

            <div className="report-section">

              <div className="report-section-title">

                <MapPin size={22} />

                <div>

                  <h2>
                    Site Information
                  </h2>

                  <p>
                    Geographic details of the
                    assessed renewable site
                  </p>

                </div>

              </div>


              <div className="site-info-grid">

                <div className="info-box">

                  <span>
                    Site Name
                  </span>

                  <strong>
                    {site.name || "Unknown"}
                  </strong>

                </div>


                <div className="info-box">

                  <span>
                    Site ID
                  </span>

                  <strong>
                    {assessment.site_id}
                  </strong>

                </div>


                <div className="info-box">

                  <span>
                    Latitude
                  </span>

                  <strong>
                    {site.latitude ?? "-"}
                  </strong>

                </div>


                <div className="info-box">

                  <span>
                    Longitude
                  </span>

                  <strong>
                    {site.longitude ?? "-"}
                  </strong>

                </div>

              </div>

            </div>


            {/* ==================================
                WIND RESOURCE
            ================================== */}

            <div className="report-section">

              <div className="report-section-title">

                <Wind size={22} />

                <div>

                  <h2>
                    Wind Resource Assessment
                  </h2>

                  <p>
                    Current wind resource
                    characteristics
                  </p>

                </div>

              </div>


              <div className="resource-score-layout">

                {/* SCORE */}

                <div className="resource-score-card">

                  <Wind size={42} />

                  <span>
                    Wind Resource Score
                  </span>

                  <strong>
                    {windScore}
                    <small>/100</small>
                  </strong>

                  <p>
                    {resourceLevel} Resource
                  </p>

                </div>


                {/* RESOURCE DETAILS */}

                <div className="resource-detail-grid">

                  <div className="resource-detail">

                    <Gauge size={24} />

                    <div>

                      <span>
                        Wind Speed
                      </span>

                      <strong>
                        {windSpeed} m/s
                      </strong>

                    </div>

                  </div>


                  <div className="resource-detail">

                    <Activity size={24} />

                    <div>

                      <span>
                        Wind Classification
                      </span>

                      <strong>
                        {windClass}
                      </strong>

                    </div>

                  </div>


                  <div className="resource-detail">

                    <CheckCircle size={24} />

                    <div>

                      <span>
                        Resource Level
                      </span>

                      <strong>
                        {resourceLevel}
                      </strong>

                    </div>

                  </div>


                  <div className="resource-detail">

                    <Navigation size={24} />

                    <div>

                      <span>
                        Deployment Potential
                      </span>

                      <strong>
                        {windScore >= 85
                          ? "Excellent"
                          : windScore >= 70
                          ? "Good"
                          : windScore >= 50
                          ? "Moderate"
                          : "Low"}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ==================================
                ENVIRONMENT
            ================================== */}

            <div className="report-section">

              <div className="report-section-title">

                <Activity size={22} />

                <div>

                  <h2>
                    Environmental Conditions
                  </h2>

                  <p>
                    Live environmental conditions
                    used for assessment
                  </p>

                </div>

              </div>


              <div className="environment-report-grid">

                <div className="environment-report-item">

                  <Thermometer size={23} />

                  <span>
                    Temperature
                  </span>

                  <strong>
                    {environment.temperature ?? "-"}
                  </strong>

                </div>


                <div className="environment-report-item">

                  <Droplets size={23} />

                  <span>
                    Humidity
                  </span>

                  <strong>
                    {environment.humidity ?? "-"}
                  </strong>

                </div>


                <div className="environment-report-item">

                  <Wind size={23} />

                  <span>
                    Wind Speed
                  </span>

                  <strong>
                    {environment.wind_speed ?? "-"}
                  </strong>

                </div>


                <div className="environment-report-item">

                  <GaugeCircle size={23} />

                  <span>
                    Air Pressure
                  </span>

                  <strong>
                    {environment.air_pressure ?? "-"}
                  </strong>

                </div>


                <div className="environment-report-item">

                  <CloudRain size={23} />

                  <span>
                    Rainfall
                  </span>

                  <strong>
                    {environment.rainfall ?? "-"}
                  </strong>

                </div>

              </div>

            </div>


            {/* ==================================
                AI RECOMMENDATION
            ================================== */}

            <div className="ai-resource-card">

              <div className="ai-resource-icon">

                <Brain size={30} />

              </div>

              <div>

                <h2>
                  AI Resource Recommendation
                </h2>

                <p>
                  {resource.recommendation ||
                    "No recommendation available."}
                </p>

              </div>

            </div>


            {/* ==================================
                REPORT SUMMARY
            ================================== */}

            <div className="report-summary">

              <div className="summary-icon">

                {windScore >= 70 ? (
                  <CheckCircle size={30} />
                ) : (
                  <AlertTriangle size={30} />
                )}

              </div>

              <div>

                <h2>
                  Assessment Summary
                </h2>

                <p>

                  {windScore >= 85
                    ? "This site demonstrates excellent wind resource potential and is highly suitable for wind energy deployment."
                    : windScore >= 70
                    ? "This site demonstrates good wind resource potential and is suitable for wind energy deployment."
                    : windScore >= 50
                    ? "This site demonstrates moderate wind resource potential. Further assessment is recommended."
                    : "This site has limited wind resource potential and may not be suitable for wind deployment."}

                </p>

              </div>

            </div>


            {/* ==================================
                FOOTER
            ================================== */}

            <div className="report-footer">

              <FileText size={18} />

              <span>
                Solar & Wind Deployment
                Intelligence Platform
              </span>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default ResourceAssessment;