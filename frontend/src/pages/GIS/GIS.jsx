import {
  Box,
  Typography,
  Paper,
  Chip,
} from "@mui/material";

import {
  Map,
  Satellite,
  Brain,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import GISMap from "../../components/GIS/GISMap";

function GIS() {

  return (

    <DashboardLayout>

      {/* ============================================
          PAGE HEADER
      ============================================ */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >

        <Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1,
            }}
          >

            <Map
              size={34}
              color="#1565C0"
            />

            <Typography
              variant="h4"
              fontWeight={800}
              color="#0F172A"
            >
              GIS Intelligence
            </Typography>

          </Box>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
            }}
          >
            Explore renewable deployment sites,
            environmental suitability and
            AI-powered energy recommendations
            through interactive geographic intelligence.
          </Typography>

        </Box>


        <Chip
          icon={<Brain size={17} />}
          label="AI-Powered GIS"
          sx={{
            fontWeight: 700,
            background: "#E8F1FF",
            color: "#1565C0",
            borderRadius: 2,
            px: 1,
          }}
        />

      </Box>


      {/* ============================================
          INTELLIGENCE FEATURES
      ============================================ */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >

        <Paper
          sx={{
            p: 2.5,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          elevation={2}
        >

          <Map
            size={26}
            color="#1565C0"
          />

          <Box>

            <Typography
              fontWeight={700}
            >
              Geographic Intelligence
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Location-based renewable analysis
            </Typography>

          </Box>

        </Paper>


        <Paper
          sx={{
            p: 2.5,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          elevation={2}
        >

          <Satellite
            size={26}
            color="#2E7D32"
          />

          <Box>

            <Typography
              fontWeight={700}
            >
              Site Suitability
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Compare solar and wind potential
            </Typography>

          </Box>

        </Paper>


        <Paper
          sx={{
            p: 2.5,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          elevation={2}
        >

          <Brain
            size={26}
            color="#7C3AED"
          />

          <Box>

            <Typography
              fontWeight={700}
            >
              Deployment Intelligence
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              AI-assisted renewable recommendations
            </Typography>

          </Box>

        </Paper>

      </Box>


      {/* ============================================
          MAP CARD
      ============================================ */}

      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >

        <GISMap />

      </Paper>

    </DashboardLayout>

  );

}

export default GIS;
