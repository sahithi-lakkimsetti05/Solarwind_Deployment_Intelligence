import {
    Paper,
    Typography,
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function PredictionChart({ analytics, history }) {

    if (!analytics) {
        return null;
    }

    const solar = analytics.average_solar_score || 0;
    const wind = analytics.average_wind_score || 0;

    // ----------------------------------------
    // Prepare prediction history for chart
    // ----------------------------------------

    const chartData = [...(history || [])]
        .reverse()
        .map((item, index) => ({
            prediction: `Prediction ${index + 1}`,
            power: Number(item.predicted_power) || 0,
        }));

    // ----------------------------------------
    // Format date
    // ----------------------------------------

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Box>

            {/* ========================================
                PREDICTED POWER TREND
            ======================================== */}

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    mb: 4,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Predicted Power Trend
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={1}
                    mb={4}
                >
                    Predicted solar power across prediction history
                </Typography>

                {chartData.length > 0 ? (

                    <Box
                        sx={{
                            width: "100%",
                            height: 350,
                        }}
                    >

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 10,
                                    bottom: 10,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="prediction"
                                />

                                <YAxis />

                                <Tooltip
                                    formatter={(value) => [
                                        `${value} W`,
                                        "Predicted Power",
                                    ]}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="power"
                                    stroke="#2563EB"
                                    strokeWidth={3}
                                    dot={{
                                        r: 5,
                                    }}
                                    activeDot={{
                                        r: 7,
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </Box>

                ) : (

                    <Typography
                        color="text.secondary"
                    >
                        No prediction history available.
                    </Typography>

                )}

            </Paper>


            {/* ========================================
                SOLAR VS WIND PERFORMANCE
            ======================================== */}

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    mb: 4,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Solar & Wind Performance
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={1}
                    mb={4}
                >
                    Average suitability scores from prediction history
                </Typography>


                {/* SOLAR */}

                <Box mb={3}>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                    >

                        <Typography fontWeight={600}>
                            Solar Energy
                        </Typography>

                        <Typography fontWeight={700}>
                            {solar}%
                        </Typography>

                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={solar}
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#F9A825",
                            },
                        }}
                    />

                </Box>


                {/* WIND */}

                <Box mb={3}>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                    >

                        <Typography fontWeight={600}>
                            Wind Energy
                        </Typography>

                        <Typography fontWeight={700}>
                            {wind}%
                        </Typography>

                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={wind}
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00897B",
                            },
                        }}
                    />

                </Box>


                {/* AVERAGE POWER */}

                <Box
                    mt={4}
                    p={3}
                    sx={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                    }}
                >

                    <Typography
                        color="text.secondary"
                    >
                        Average Predicted Power
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        mt={1}
                    >
                        {analytics.average_predicted_power} W
                    </Typography>

                </Box>

            </Paper>


            {/* ========================================
                PREDICTION HISTORY
            ======================================== */}

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Prediction History
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={1}
                    mb={3}
                >
                    Previous AI predictions generated for this site
                </Typography>

                {history && history.length > 0 ? (

                    <TableContainer>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        <strong>Date</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Predicted Power</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Solar</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Wind</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Overall</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Best Source</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Recommendation</strong>
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {history.map((item) => (

                                    <TableRow
                                        key={item.id}
                                        hover
                                    >

                                        <TableCell>
                                            {formatDate(item.created_at)}
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                {item.predicted_power} W
                                            </strong>
                                        </TableCell>

                                        <TableCell>
                                            {item.solar_score}%
                                        </TableCell>

                                        <TableCell>
                                            {item.wind_score}%
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                {item.overall_score}%
                                            </strong>
                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={
                                                    item.best_energy_source
                                                }
                                                size="small"
                                                color={
                                                    item.best_energy_source ===
                                                    "Solar"
                                                        ? "warning"
                                                        : "info"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={
                                                    item.recommendation
                                                }
                                                size="small"
                                                color={
                                                    item.recommendation ===
                                                    "Excellent"
                                                        ? "success"
                                                        : item.recommendation ===
                                                          "Good"
                                                        ? "primary"
                                                        : item.recommendation ===
                                                          "Moderate"
                                                        ? "warning"
                                                        : "error"
                                                }
                                            />

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                ) : (

                    <Typography
                        color="text.secondary"
                    >
                        No prediction history available for this site.
                    </Typography>

                )}

            </Paper>

        </Box>
    );
}

export default PredictionChart;