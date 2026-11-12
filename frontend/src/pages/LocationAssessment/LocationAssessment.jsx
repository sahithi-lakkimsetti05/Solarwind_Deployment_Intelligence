import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Search,
  Sun,
  Wind,
  Zap,
  Brain,
  Navigation,
  CheckCircle,
  AlertTriangle,
  Loader2,
  FileText,
  Globe,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { assessLocation } from "../../services/locationIntelligenceService";

import "./LocationAssessment.css";


function LocationAssessment() {

  const navigate = useNavigate();

  const [place, setPlace] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ==========================================================
  // ASSESS LOCATION
  // ==========================================================

  const handleAssessment = async () => {

    if (!place.trim()) {

      setError(
        "Please enter a location."
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      setResult(null);

      const data = await assessLocation(
        place.trim()
      );

      console.log(
        "Location assessment:",
        data
      );

      setResult(data);

    } catch (err) {

      console.error(
        "Location assessment error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to assess this location. Please try another place."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================================
  // ENTER KEY
  // ==========================================================

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      handleAssessment();

    }
  };


  // ==========================================================
  // DATA
  // ==========================================================

  const location =
    result?.location || {};

  const coordinates =
    result?.coordinates || {};

  const solarResource =
    result?.solar_resource || {};

  const windResource =
    result?.wind_resource || {};

  const environment =
    result?.environment || {};

  const intelligence =
    result?.site_intelligence || {};


  // ==========================================================
  // SCORES
  // ==========================================================

  const solarScore =
    intelligence.solar_score ??
    solarResource.score ??
    0;

  const windScore =
    intelligence.wind_score ??
    windResource.score ??
    0;

  const overallScore =
    intelligence.overall_score ??
    Math.round(
      (solarScore + windScore) / 2
    );


  // ==========================================================
  // RECOMMENDATION
  // ==========================================================

  const bestSource =
    intelligence.best_energy_source ||
    "Solar + Wind";

  const suitability =
    intelligence.suitability ||
    "Not Available";

  const deploymentPriority =
    intelligence.deployment_priority ||
    "Not Available";

  const recommendation =
    intelligence.recommendation ||
    "Renewable energy potential has been assessed for this location.";


  // ==========================================================
  // LOCATION
  // ==========================================================

  const latitude =
    location.latitude ??
    coordinates.latitude;

  const longitude =
    location.longitude ??
    coordinates.longitude;

  const displayPlace =
    location.name ||
    place;


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <DashboardLayout>

      <div className="location-page">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="location-header">

          <div className="location-header-icon">

            <Globe size={30} />

          </div>

          <div>

            <h1>
              Location Assessment
            </h1>

            <p>
              Discover renewable energy potential
              for any location using AI-powered
              site intelligence.
            </p>

          </div>

        </div>


        {/* ====================================================
            SEARCH
        ==================================================== */}

        <div className="location-search-card">

          <div className="search-heading">

            <div className="search-icon">

              <MapPin size={22} />

            </div>

            <div>

              <h2>
                Assess a Location
              </h2>

              <p>
                Enter a city, district, region or
                other location to analyze its
                renewable energy potential.
              </p>

            </div>

          </div>


          <div className="location-search">

            <div className="location-input-wrapper">

              <MapPin size={21} />

              <input
                type="text"
                placeholder="Enter a location e.g. Chennai, Hyderabad, Bengaluru"
                value={place}
                onChange={(event) =>
                  setPlace(event.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={loading}
              />

            </div>


            <button
              className="assess-button"
              onClick={handleAssessment}
              disabled={loading}
            >

              {loading ? (

                <>

                  <Loader2
                    size={19}
                    className="spin"
                  />

                  Assessing...

                </>

              ) : (

                <>

                  <Search size={19} />

                  Assess Renewable Potential

                </>

              )}

            </button>

          </div>


          <div className="search-hint">

            <Navigation size={16} />

            Try locations such as Chennai,
            Hyderabad, Bengaluru, Mumbai or
            any other place.

          </div>

        </div>


        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (

          <div className="location-error">

            <AlertTriangle size={21} />

            <div>

              <strong>
                Assessment Failed
              </strong>

              <span>
                {error}
              </span>

            </div>

          </div>

        )}


        {/* ====================================================
            RESULTS
        ==================================================== */}

        {result && (

          <div className="assessment-results">


            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="result-location-card">

              <div className="result-location-left">

                <div className="result-location-icon">

                  <MapPin size={27} />

                </div>

                <div>

                  <span className="result-label">
                    ASSESSED LOCATION
                  </span>

                  <h2>
                    {displayPlace}
                  </h2>

                  <p>

                    <Navigation size={15} />

                    {latitude ?? "-"}°,
                    {" "}
                    {longitude ?? "-"}°

                  </p>

                </div>

              </div>


              <div className="suitability-badge">

                <CheckCircle size={17} />

                {suitability}

              </div>

            </div>


            {/* =================================================
                SCORE CARDS
            ================================================= */}

            <div className="score-grid">


              {/* SOLAR */}

              <div className="score-card solar-card">

                <div className="score-card-top">

                  <div className="score-icon solar-icon">

                    <Sun size={25} />

                  </div>

                  <span>
                    SOLAR SUITABILITY
                  </span>

                </div>


                <div className="score-value">

                  {solarScore}

                  <small>
                    %
                  </small>

                </div>


                <div className="score-bar">

                  <div
                    style={{
                      width: `${Math.min(
                        solarScore,
                        100
                      )}%`,
                    }}
                  />

                </div>


                <p>
                  Solar resource potential
                </p>

              </div>


              {/* WIND */}

              <div className="score-card wind-card">

                <div className="score-card-top">

                  <div className="score-icon wind-icon">

                    <Wind size={25} />

                  </div>

                  <span>
                    WIND SUITABILITY
                  </span>

                </div>


                <div className="score-value">

                  {windScore}

                  <small>
                    %
                  </small>

                </div>


                <div className="score-bar">

                  <div
                    style={{
                      width: `${Math.min(
                        windScore,
                        100
                      )}%`,
                    }}
                  />

                </div>


                <p>
                  Wind resource potential
                </p>

              </div>


              {/* OVERALL */}

              <div className="score-card overall-card">

                <div className="score-card-top">

                  <div className="score-icon overall-icon">

                    <Zap size={25} />

                  </div>

                  <span>
                    OVERALL SUITABILITY
                  </span>

                </div>


                <div className="score-value">

                  {overallScore}

                  <small>
                    %
                  </small>

                </div>


                <div className="score-bar">

                  <div
                    style={{
                      width: `${Math.min(
                        overallScore,
                        100
                      )}%`,
                    }}
                  />

                </div>


                <p>
                  Renewable deployment potential
                </p>

              </div>

            </div>


            {/* =================================================
                RESOURCE ASSESSMENT
            ================================================= */}

            <div className="environment-card">

              <div className="section-heading">

                <div className="section-heading-icon">

                  <Sun size={20} />

                </div>

                <div>

                  <h2>
                    Renewable Resource Assessment
                  </h2>

                  <p>
                    Resource conditions used to
                    calculate renewable suitability.
                  </p>

                </div>

              </div>


              <div className="environment-grid">


                {/* DAILY SOLAR */}

                <div className="environment-item">

                  <span>
                    Daily Solar Radiation
                  </span>

                  <strong>

                    {solarResource.daily_radiation ??
                      "N/A"}

                    {solarResource.daily_radiation !==
                      undefined &&
                      " MJ/m²/day"}

                  </strong>

                </div>


                {/* CURRENT IRRADIANCE */}

                <div className="environment-item">

                  <span>
                    Current Solar Irradiance
                  </span>

                  <strong>

                    {solarResource.current_irradiance ??
                      "N/A"}

                    {solarResource.current_irradiance !==
                      undefined &&
                      " W/m²"}

                  </strong>

                </div>


                {/* SOLAR CLASS */}

                <div className="environment-item">

                  <span>
                    Solar Classification
                  </span>

                  <strong>
                    {solarResource.classification ||
                      "Not Available"}
                  </strong>

                </div>


                {/* WIND */}

                <div className="environment-item">

                  <span>
                    Wind Speed
                  </span>

                  <strong>

                    {windResource.wind_speed ??
                      "N/A"}

                    {windResource.wind_speed !==
                      undefined &&
                      " m/s"}

                  </strong>

                </div>


                {/* WIND CLASS */}

                <div className="environment-item">

                  <span>
                    Wind Classification
                  </span>

                  <strong>
                    {windResource.classification ||
                      "Not Available"}
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                AI RECOMMENDATION
            ================================================= */}

            <div className="recommendation-card">

              <div className="recommendation-icon">

                <Brain size={29} />

              </div>


              <div className="recommendation-content">

                <span>
                  AI DEPLOYMENT RECOMMENDATION
                </span>

                <h2>
                  {bestSource} Energy
                </h2>

                <p>
                  {recommendation}
                </p>

              </div>


              <div className="recommendation-priority">

                <span>
                  PRIORITY
                </span>

                <strong>
                  {deploymentPriority}
                </strong>

              </div>

            </div>


            {/* =================================================
                ENVIRONMENT
            ================================================= */}

            {Object.keys(environment).length > 0 && (

              <div className="environment-card">

                <div className="section-heading">

                  <div className="section-heading-icon">

                    <Globe size={20} />

                  </div>

                  <div>

                    <h2>
                      Environmental Conditions
                    </h2>

                    <p>
                      Environmental information used
                      for renewable assessment.
                    </p>

                  </div>

                </div>


                <div className="environment-grid">


                  {environment.temperature !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Temperature
                      </span>

                      <strong>
                        {environment.temperature} °C
                      </strong>

                    </div>

                  )}


                  {environment.humidity !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Humidity
                      </span>

                      <strong>
                        {environment.humidity} %
                      </strong>

                    </div>

                  )}


                  {environment.wind_speed !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Wind Speed
                      </span>

                      <strong>
                        {environment.wind_speed} m/s
                      </strong>

                    </div>

                  )}


                  {environment.daily_solar_radiation !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Daily Solar Radiation
                      </span>

                      <strong>
                        {environment.daily_solar_radiation}
                        {" "}MJ/m²/day
                      </strong>

                    </div>

                  )}


                  {environment.solar_irradiance !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Current Solar Irradiance
                      </span>

                      <strong>
                        {environment.solar_irradiance}
                        {" "}W/m²
                      </strong>

                    </div>

                  )}


                  {environment.rainfall !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Rainfall
                      </span>

                      <strong>
                        {environment.rainfall} mm
                      </strong>

                    </div>

                  )}


                  {environment.air_pressure !==
                    undefined && (

                    <div className="environment-item">

                      <span>
                        Air Pressure
                      </span>

                      <strong>
                        {environment.air_pressure} hPa
                      </strong>

                    </div>

                  )}

                </div>

              </div>

            )}


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="assessment-actions">


              <button
                className="action-button secondary"
                onClick={() => {

                  if (
                    latitude !== undefined &&
                    longitude !== undefined
                  ) {

                    navigate(
                      `/gis?lat=${latitude}&lng=${longitude}`
                    );

                  } else {

                    navigate("/gis");

                  }

                }}
              >

                <Globe size={19} />

                View on GIS

                <ArrowRight size={17} />

              </button>


              <button
                className="action-button primary"
                onClick={() =>
                  window.print()
                }
              >

                <FileText size={19} />

                Generate Assessment Report

              </button>

            </div>


          </div>

        )}

      </div>

    </DashboardLayout>
  );
}


export default LocationAssessment;