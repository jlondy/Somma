// src/components/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const colors = {
  deep: "#740938",
  mid: "#AF1740",
  rose: "#CC2B52",
  blush: "#DE7C7D",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.2 },
  }),
};

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(1200px 600px at 15% -10%, rgba(175,23,64,0.18), transparent 70%),
          radial-gradient(1000px 600px at 85% 10%, rgba(222,124,125,0.14), transparent 70%),
          #0a0a0b
        `,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Typography
            variant="overline"
            sx={{
              color: colors.blush,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Welcome to
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
              background: `linear-gradient(90deg, ${colors.deep}, ${colors.rose}, ${colors.blush})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mt: 1,
              mb: 2,
            }}
          >
            SOMMA
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.75)",
              mb: 4,
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Explore, compare, and understand wines through data, motion, and
            elegant visualization. Discover tasters, regions, and the art of
            scoring—one glass at a time.
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Button
            component={Link}
            to="/data"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "999px",
              background: colors.mid,
              color: "white",
              fontSize: "1.1rem",
              fontWeight: 700,
              "&:hover": {
                background: colors.rose,
                boxShadow: `0 0 25px ${colors.blush}`,
              },
            }}
          >
            Explore Data
          </Button>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          mt: 12,
          mb: 4,
          textAlign: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()} SOMMA — Data & Motion for Wine Discovery
        </Typography>
      </Box>
    </Box>
  );
}
