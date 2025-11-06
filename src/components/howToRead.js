// src/components/Manual.jsx
import React from "react";
import { motion } from "framer-motion";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useColors = () => ({
  bg: "rgba(10,10,10,0.6)",
  border: "rgba(255,255,255,0.06)",
  glow: "0 0 30px rgba(223, 124, 125, .25)",
  primary: "#AF1740",
  secondary: "#DE7C7D",
  accent: "#CC2B52",
  deep: "#740938",
  textSecondary: "rgba(255,255,255,0.7)",
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
};

const Section = ({ id, eyebrow, title, children, i = 0 }) => {
  const c = useColors();
  return (
    <Box
      id={id}
      component={motion.section}
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      sx={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 3,
        boxShadow: c.glow,
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{ color: c.secondary, letterSpacing: 1, fontWeight: 700 }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        variant="h3"
        sx={{ fontWeight: 800, mb: 1, color: "white", lineHeight: 1.1 }}
      >
        {title}
      </Typography>
      <Divider sx={{ borderColor: c.border, mb: 2 }} />
      <Box sx={{ color: "white" }}>{children}</Box>
    </Box>
  );
};

const Bullet = ({ children }) => (
  <Box
    component="li"
    sx={{
      mb: 1.25,
      "&::marker": { color: "rgba(255,255,255,0.25)" },
      color: "rgba(255,255,255,0.9)",
    }}
  >
    {children}
  </Box>
);

export default function Manual() {
  const c = useColors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 10, sm: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          component={motion.header}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          sx={{
            mb: 4,
            textAlign: { xs: "left", md: "center" },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: c.accent, letterSpacing: 2, fontWeight: 700 }}
          >
            SOMMA — USER MANUAL
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              lineHeight: 1.05,
              color: "white",
              mt: 1,
              mb: 1,
            }}
          >
            Explore, compare, and understand wines through motion & data
          </Typography>
          <Typography variant="subtitle1" sx={{ color: c.textSecondary }}>
            A quick guide to navigating the Data, Wine, Winery, Taster, and
            Country views.
          </Typography>
        </Box>

        {/* Quick Nav */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { href: "#data", label: "Data" },
            { href: "#wine", label: "Wine" },
            { href: "#winery", label: "Winery" },
            { href: "#taster", label: "Taster" },
            { href: "#country", label: "Country" },
          ].map((link, i) => (
            <Grid item xs={6} sm="auto" key={link.href}>
              <Button
                component="a"
                href={link.href}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${c.border}`,
                  color: "white",
                  "&:hover": {
                    background: "rgba(255,255,255,0.08)",
                    borderColor: c.secondary,
                  },
                }}
              >
                {link.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* DATA */}
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Section
              id="data"
              eyebrow="Explore"
              title="Data — Discover the dataset"
              i={0}
            >
              <Typography sx={{ color: c.textSecondary, mb: 2 }}>
                The <strong>Data</strong> page is your control center. Apply
                filters for <em>Country</em>, <em>Taster</em>, <em>Price</em>,
                and <em>Rank (Score)</em> to reveal matching wines as a dynamic
                grid of glasses.
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <Bullet>
                  Adjust filters to instantly update the grid of matching wines.
                </Bullet>
                <Bullet>
                  Use the side charts to see{" "}
                  <strong>occurrences per rank</strong> and{" "}
                  <strong>per price</strong> to guide better selections.
                </Bullet>
                <Bullet>
                  Click any glass to open its detailed <em>Wine</em> page.
                </Bullet>
              </ul>
            </Section>
          </Grid>

          {/* WINE */}
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Section id="wine" eyebrow="Inspect" title="Wine — Single bottle">
              <Typography sx={{ color: c.textSecondary, mb: 2 }}>
                A focused view of the wine you selected: title, country, price,
                variety, taster, and description — presented with a stylized
                wine-glass visualization and a clear score display.
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <Bullet>Use this as a clean, readable tasting card.</Bullet>
              </ul>
            </Section>
          </Grid>

          {/* WINERY */}
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Section
              id="winery"
              eyebrow="Aggregate"
              title="Winery — All wines from a producer"
              i={1}
            >
              <Typography sx={{ color: c.textSecondary, mb: 2 }}>
                See the producer’s portfolio as a flowing set of paths
                converging at center. Each path is a wine; hover to highlight.
                Quickly scan <strong>average score</strong>,{" "}
                <strong>price range</strong>, and <strong>standouts</strong>.
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <Bullet>Hover a path to focus; others dim subtly.</Bullet>
                <Bullet>Click a path to jump to that wine’s page.</Bullet>
              </ul>
            </Section>
          </Grid>

          {/* TASTER */}
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Section
              id="taster"
              eyebrow="Compare"
              title="Taster — Side-by-side reviewer comparison"
              i={2}
            >
              <Typography sx={{ color: c.textSecondary, mb: 2 }}>
                Select any two tasters to compare their reviewing patterns:
                totals, averages, value ratio, common varieties, highest price,
                and highest rank.
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <Bullet>Each taster gets a dedicated color for clarity.</Bullet>
                <Bullet>
                  Use this to spot tendencies (leniency, price bias, variety
                  focus, etc.).
                </Bullet>
              </ul>
            </Section>
          </Grid>

          {/* COUNTRY */}
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Section
              id="country"
              eyebrow="Contrast"
              title="Country — Regional pattern comparison"
              i={3}
            >
              <Typography sx={{ color: c.textSecondary, mb: 2 }}>
                Compare any two countries across key metrics: average/median
                ranks, price distribution, most common variety, winery coverage,
                and more — to uncover value and style differences.
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <Bullet>
                  Great for discovering regions with strong value or diversity.
                </Bullet>
              </ul>
            </Section>
          </Grid>
        </Grid>

        {/* Footer note */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography sx={{ color: c.textSecondary }}>
            Tip: Start on the <strong>Data</strong> page, refine with the side
            charts, then dive deeper via <strong>Wine</strong> and{" "}
            <strong>Winery</strong>. Use <strong>Taster</strong> and{" "}
            <strong>Country</strong> to compare patterns and biases.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
