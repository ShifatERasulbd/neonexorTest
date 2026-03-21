const express = require("express");
const cors = require("cors");

const universityRoutes = require("./routes/university.routes");
const scrapeRoutes = require("./routes/scrape.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "University Scraper API is running",
		endpoints: ["/api/health", "/api/universities", "/api/scrape"],
	});
});

app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/universities", universityRoutes);
app.use("/api/scrape", scrapeRoutes);

app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ error: err.message || "Internal server error" });
});

module.exports = app;