import { useEffect, useState } from "react";

import {
    Box,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatsCard from "../../components/Analytics/StatsCard";
import PredictionChart from "../../components/Analytics/PredictionChart";
import TopSiteCard from "../../components/Analytics/TopSiteCard";

import { getSites } from "../../services/siteService";

import {
    getPredictionAnalytics,
    getRecommendation,
    getPredictionHistory,
} from "../../services/predictionService";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Analytics() {
    const [loading, setLoading] = useState(true);

    const [sites, setSites] = useState([]);

    const [selectedSite, setSelectedSite] = useState("");

    const [analytics, setAnalytics] = useState(null);

    const [recommendation, setRecommendation] = useState(null);

    const [history, setHistory] = useState([]);

    const [error, setError] = useState("");

    // ----------------------------------------
    // Load Sites
    // ----------------------------------------

    useEffect(() => {
        const loadSites = async () => {
            try {
                const data = await getSites();

                setSites(data);

                if (data.length > 0) {
                    setSelectedSite(data[0].id);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load sites.");
                setLoading(false);
            }
        };

        loadSites();
    }, []);

    // ----------------------------------------
    // Load Analytics + Recommendation + History
    // ----------------------------------------

    useEffect(() => {
        if (!selectedSite) {
            return;
        }

        const loadAnalytics = async () => {
            setLoading(true);
            setError("");

            try {
                const [
                    analyticsData,
                    recommendationData,
                    historyData,
                ] = await Promise.all([
                    getPredictionAnalytics(selectedSite),
                    getRecommendation(selectedSite),
                    getPredictionHistory(selectedSite),
                ]);

                setAnalytics(analyticsData);
                setRecommendation(recommendationData);
                setHistory(historyData);
            } catch (err) {
                console.error(err);

                setAnalytics(null);
                setRecommendation(null);
                setHistory([]);

                setError(
                    "No prediction data available for this site."
                );
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, [selectedSite]);

    // ----------------------------------------
    // Loading
    // ----------------------------------------

    if (loading && !analytics) {
        return (
            <DashboardLayout>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="400px"
                >
                    <CircularProgress />
                </Box>
            </DashboardLayout>
        );
    }

    // ----------------------------------------
    // Dashboard
    // ----------------------------------------

    return (
        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Renewable Resource Analytics
            </Typography>

            {/* SITE SELECTOR */}

            <Box mb={4}>
                <FormControl sx={{ minWidth: 280 }}>
                    <InputLabel>
                        Select Site
                    </InputLabel>

                    <Select
                        value={selectedSite}
                        label="Select Site"
                        onChange={(e) =>
                            setSelectedSite(e.target.value)
                        }
                    >
                        {sites.map((site) => (
                            <MenuItem
                                key={site.id}
                                value={site.id}
                            >
                                {site.site_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* ERROR */}

            {error && (
                <Alert
                    severity="warning"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {analytics && recommendation && (
                <>

                    {/* KPI CARDS */}

                    <Grid
                        container
                        spacing={3}
                    >

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >
                            <StatsCard
                                title="Average Predicted Power"
                                value={`${analytics.average_predicted_power} W`}
                                icon={<WbSunnyIcon />}
                                color="#F9A825"
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >
                            <StatsCard
                                title="Average Solar Score"
                                value={`${analytics.average_solar_score}%`}
                                icon={<WbSunnyIcon />}
                                color="#FB8C00"
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >
                            <StatsCard
                                title="Average Wind Score"
                                value={`${analytics.average_wind_score}%`}
                                icon={<AirIcon />}
                                color="#00897B"
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >
                            <StatsCard
                                title="Best Energy Source"
                                value={analytics.best_energy_source}
                                icon={<EmojiEventsIcon />}
                                color="#8E24AA"
                            />
                        </Grid>

                    </Grid>

                    {/* PREDICTION SUMMARY */}

                    <Box mt={4}>
                        <Alert severity="info">

                            <strong>
                                {analytics.total_predictions}
                            </strong>{" "}
                            predictions have been generated
                            for this site.

                            {" "}Current recommendation:

                            {" "}

                            <strong>
                                {
                                    analytics.latest_prediction
                                        .recommendation
                                }
                            </strong>

                        </Alert>
                    </Box>

                    {/* BEST SITE / RECOMMENDATION */}

                    <Box mt={5}>

                        <TopSiteCard
                            site={
                                sites.find(
                                    (site) =>
                                        site.id ===
                                        Number(selectedSite)
                                )
                            }
                            recommendation={recommendation}
                        />

                    </Box>

                    {/* PERFORMANCE + HISTORY */}

                    <Box mt={5}>

                        <PredictionChart
                            analytics={analytics}
                            history={history}
                        />

                    </Box>

                </>
            )}

        </DashboardLayout>
    );
}

export default Analytics;