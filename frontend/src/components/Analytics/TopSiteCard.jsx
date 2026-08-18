import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
} from "@mui/material";

function TopSiteCard({ site, recommendation }) {

    if (!site || !recommendation) {
        return null;
    }

    return (
        <Card
            elevation={3}
            sx={{ borderRadius: 3 }}
        >

            <CardContent>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Best Renewable Site
                </Typography>

                <Typography mt={2}>
                    <strong>Name:</strong>{" "}
                    {site.site_name}
                </Typography>

                <Box mt={1}>

                    <Typography>
                        <strong>Solar Score:</strong>{" "}
                        {recommendation.solar_score}%
                    </Typography>

                    <Typography>
                        <strong>Wind Score:</strong>{" "}
                        {recommendation.wind_score}%
                    </Typography>

                    <Typography>
                        <strong>Overall Score:</strong>{" "}
                        {recommendation.overall_score}%
                    </Typography>

                    <Typography>
                        <strong>Best Energy Source:</strong>{" "}
                        {recommendation.best_energy_source}
                    </Typography>

                </Box>

                <Chip
                    label={recommendation.recommendation}
                    color="success"
                    sx={{ mt: 2 }}
                />

                <Typography
                    mt={2}
                    color="text.secondary"
                >
                    {recommendation.suggestion}
                </Typography>

            </CardContent>

        </Card>
    );
}

export default TopSiteCard;