import { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapPin,
  RefreshCw,
  Sun,
  Wind,
  Gauge,
  Leaf,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import { getSites } from "../../services/siteService";
import { getEnvironmentData } from "../../services/environmentService";


// ======================================================
// FIX LEAFLET DEFAULT MARKER ICON
// ======================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// ======================================================
// SCORE CALCULATIONS
// ======================================================

const calculateSolarScore = (environment) => {
  if (!environment) return 0;

  const irradiance =
    Number(environment.solar_irradiance) || 0;

  const temperature =
    Number(environment.temperature) || 0;

  let score = 0;

  // Solar irradiance - maximum 60
  if (irradiance >= 6) {
    score += 60;
  } else if (irradiance >= 5) {
    score += 50;
  } else if (irradiance >= 4) {
    score += 40;
  } else if (irradiance >= 3) {
    score += 30;
  } else if (irradiance >= 2) {
    score += 20;
  } else {
    score += 10;
  }

  // Temperature - maximum 20
  if (temperature >= 15 && temperature <= 35) {
    score += 20;
  } else if (temperature >= 10 && temperature <= 40) {
    score += 15;
  } else {
    score += 8;
  }

  // Environmental bonus
  const humidity =
    Number(environment.humidity) || 0;

  if (humidity <= 70) {
    score += 10;
  } else {
    score += 5;
  }

  return Math.min(Math.round(score), 100);
};


const calculateWindScore = (environment) => {
  if (!environment) return 0;

  const windSpeed =
    Number(environment.wind_speed) || 0;

  let score = 0;

  if (windSpeed >= 12) {
    score = 100;
  } else if (windSpeed >= 10) {
    score = 90;
  } else if (windSpeed >= 8) {
    score = 80;
  } else if (windSpeed >= 6) {
    score = 70;
  } else if (windSpeed >= 4) {
    score = 55;
  } else if (windSpeed >= 2) {
    score = 35;
  } else {
    score = 15;
  }

  return score;
};


// ======================================================
// LABEL
// ======================================================

const getSuitabilityLabel = (score) => {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  return "Low";
};


// ======================================================
// MAP AUTO FIT
// ======================================================

function MapBounds({ sites }) {

  const map = useMap();

  useEffect(() => {

    if (!sites.length) return;

    const validSites = sites.filter(
      (site) =>
        Number.isFinite(Number(site.latitude)) &&
        Number.isFinite(Number(site.longitude))
    );

    if (!validSites.length) return;

    const bounds = validSites.map((site) => [
      Number(site.latitude),
      Number(site.longitude),
    ]);

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 8,
    });

  }, [sites, map]);

  return null;
}


// ======================================================
// MAIN COMPONENT
// ======================================================

function GISMap() {

  const [sites, setSites] = useState([]);
  const [environment, setEnvironment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSite, setSelectedSite] = useState(null);


  // ====================================================
  // LOAD GIS DATA
  // ====================================================

  const loadData = async () => {

    try {

      setLoading(true);
      setError("");

      const [siteData, environmentData] =
        await Promise.all([
          getSites(),
          getEnvironmentData(),
        ]);

      console.log("GIS Sites:", siteData);
      console.log(
        "GIS Environmental Data:",
        environmentData
      );

      setSites(
        Array.isArray(siteData)
          ? siteData
          : []
      );

      setEnvironment(
        Array.isArray(environmentData)
          ? environmentData
          : []
      );

    } catch (err) {

      console.error(
        "GIS data loading failed:",
        err
      );

      const status =
        err?.response?.status;

      if (status === 401) {
        setError(
          "Authentication required. Please login again."
        );
      } else if (status === 403) {
        setError(
          "You do not have permission to access GIS data."
        );
      } else {
        setError(
          "Unable to load GIS intelligence data."
        );
      }

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadData();
  }, []);


  // ====================================================
  // COMBINE SITE + ENVIRONMENT DATA
  // ====================================================

  const gisSites = useMemo(() => {

    return sites
      .map((site) => {

        const env = environment.find(
          (item) =>
            Number(item.site_id) ===
            Number(site.id)
        );

        const solarScore =
          calculateSolarScore(env);

        const windScore =
          calculateWindScore(env);

        const overallScore =
          Math.round(
            (solarScore + windScore) / 2
          );

        let source = "No Data";

        if (env) {

          source =
            solarScore >= windScore
              ? "Solar"
              : "Wind";

        }

        return {
          ...site,
          environment: env,
          solarScore,
          windScore,
          overallScore,
          source,
        };

      })
      .filter(
        (site) =>
          Number.isFinite(
            Number(site.latitude)
          ) &&
          Number.isFinite(
            Number(site.longitude)
          )
      );

  }, [sites, environment]);


  // ====================================================
  // MAP CENTER
  // ====================================================

  const mapCenter = [20.5937, 78.9629];


  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {

    return (

      <div className="gis-loading">

        <RefreshCw
          size={30}
          className="gis-spinner"
        />

        <h3>
          Loading GIS Intelligence...
        </h3>

        <p>
          Fetching renewable sites and
          environmental data.
        </p>

      </div>

    );

  }


  // ====================================================
  // ERROR
  // ====================================================

  if (error) {

    return (

      <div className="gis-error">

        <AlertTriangle size={40} />

        <h3>
          GIS Data Unavailable
        </h3>

        <p>
          {error}
        </p>

        <button
          onClick={loadData}
          className="gis-retry-button"
        >

          <RefreshCw size={18} />

          Retry

        </button>

      </div>

    );

  }


  // ====================================================
  // MAP
  // ====================================================

  return (

    <div className="gis-wrapper">

      {/* ================================================
          GIS SUMMARY
      ================================================= */}

      <div className="gis-summary-grid">

        <div className="gis-summary-card">

          <div className="gis-summary-icon">
            <MapPin size={22} />
          </div>

          <div>

            <span>
              Renewable Sites
            </span>

            <strong>
              {sites.length}
            </strong>

          </div>

        </div>


        <div className="gis-summary-card">

          <div className="gis-summary-icon solar">
            <Sun size={22} />
          </div>

          <div>

            <span>
              Solar Analysis
            </span>

            <strong>
              {gisSites.filter(
                (site) =>
                  site.solarScore > 0
              ).length}
            </strong>

          </div>

        </div>


        <div className="gis-summary-card">

          <div className="gis-summary-icon wind">
            <Wind size={22} />
          </div>

          <div>

            <span>
              Wind Analysis
            </span>

            <strong>
              {gisSites.filter(
                (site) =>
                  site.windScore > 0
              ).length}
            </strong>

          </div>

        </div>


        <div className="gis-summary-card">

          <div className="gis-summary-icon intelligence">
            <Leaf size={22} />
          </div>

          <div>

            <span>
              High Potential Sites
            </span>

            <strong>
              {gisSites.filter(
                (site) =>
                  site.overallScore >= 70
              ).length}
            </strong>

          </div>

        </div>

      </div>


      {/* ================================================
          MAP
      ================================================= */}

      <div className="gis-map-container">

        <MapContainer
          center={mapCenter}
          zoom={5}
          style={{
            height: "620px",
            width: "100%",
            borderRadius: "20px",
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBounds
            sites={gisSites}
          />


          {gisSites.map((site) => {

            const score =
              site.overallScore;

            const markerColor =
              score >= 85
                ? "#16a34a"
                : score >= 70
                ? "#2563eb"
                : score >= 50
                ? "#f59e0b"
                : "#ef4444";


            return (

              <CircleMarker
                key={site.id}
                center={[
                  Number(site.latitude),
                  Number(site.longitude),
                ]}
                radius={10}
                pathOptions={{
                  color: markerColor,
                  fillColor: markerColor,
                  fillOpacity: 0.85,
                  weight: 3,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedSite(site),
                }}
              >

                <Popup>

                  <div
                    style={{
                      minWidth: "240px",
                      fontFamily:
                        "Arial, sans-serif",
                    }}
                  >

                    <h3
                      style={{
                        marginBottom: "8px",
                      }}
                    >

                      {site.site_name ||
                        site.name ||
                        `Site ${site.id}`}

                    </h3>


                    <p>
                      <strong>
                        Site ID:
                      </strong>{" "}
                      {site.id}
                    </p>


                    <p>
                      <strong>
                        Latitude:
                      </strong>{" "}
                      {site.latitude}
                    </p>


                    <p>
                      <strong>
                        Longitude:
                      </strong>{" "}
                      {site.longitude}
                    </p>


                    <hr />


                    <p>
                      <strong>
                        Solar:
                      </strong>{" "}
                      {site.solarScore}/100
                    </p>


                    <p>
                      <strong>
                        Wind:
                      </strong>{" "}
                      {site.windScore}/100
                    </p>


                    <p>
                      <strong>
                        Overall:
                      </strong>{" "}
                      {site.overallScore}/100
                    </p>


                    <p>

                      <strong>
                        Recommended:
                      </strong>{" "}

                      {site.source}

                    </p>


                    <strong>
                      {getSuitabilityLabel(
                        site.overallScore
                      )}
                    </strong>

                  </div>

                </Popup>

              </CircleMarker>

            );

          })}

        </MapContainer>


        {/* ============================================
            MAP LEGEND
        ============================================= */}

        <div className="gis-legend">

          <h4>
            Site Suitability
          </h4>

          <div>
            <span className="legend-dot excellent" />
            Excellent
          </div>

          <div>
            <span className="legend-dot good" />
            Good
          </div>

          <div>
            <span className="legend-dot moderate" />
            Moderate
          </div>

          <div>
            <span className="legend-dot low" />
            Low
          </div>

        </div>

      </div>


      {/* ================================================
          SELECTED SITE DETAILS
      ================================================= */}

      {selectedSite && (

        <div className="gis-selected-site">

          <div className="selected-site-header">

            <div>

              <span>
                SELECTED SITE
              </span>

              <h2>

                {selectedSite.site_name ||
                  selectedSite.name ||
                  `Site ${selectedSite.id}`}

              </h2>

            </div>


            <button
              onClick={() =>
                setSelectedSite(null)
              }
            >
              ×
            </button>

          </div>


          <div className="selected-site-grid">

            <div>

              <span>
                Overall Suitability
              </span>

              <strong>
                {selectedSite.overallScore}%
              </strong>

            </div>


            <div>

              <span>
                Solar Suitability
              </span>

              <strong>
                {selectedSite.solarScore}%
              </strong>

            </div>


            <div>

              <span>
                Wind Suitability
              </span>

              <strong>
                {selectedSite.windScore}%
              </strong>

            </div>


            <div>

              <span>
                Recommended Source
              </span>

              <strong>
                {selectedSite.source}
              </strong>

            </div>

          </div>


          {selectedSite.environment && (

            <div className="selected-environment">

              <h3>
                Environmental Conditions
              </h3>

              <div className="environment-grid">

                <div>

                  <span>
                    Temperature
                  </span>

                  <strong>
                    {
                      selectedSite.environment
                        .temperature ?? "-"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Humidity
                  </span>

                  <strong>
                    {
                      selectedSite.environment
                        .humidity ?? "-"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Wind Speed
                  </span>

                  <strong>
                    {
                      selectedSite.environment
                        .wind_speed ?? "-"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Solar Irradiance
                  </span>

                  <strong>
                    {
                      selectedSite.environment
                        .solar_irradiance ?? "-"
                    }
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default GISMap;
