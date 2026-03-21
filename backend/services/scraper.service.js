const axios = require("axios");
const cheerio = require("cheerio");

function extractByKeywords(text, keywords) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const matched = lines.filter((line) =>
    keywords.some((keyword) => line.toLowerCase().includes(keyword))
  );

  return matched.slice(0, 12).join(" | ") || "Not available";
}

async function scrapeUniversityDetails(url) {
  const response = await axios.get(url, {
    timeout: 20000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(response.data);
  const bodyText = $("body").text().replace(/\s+/g, " ");

  const admissionDetails = extractByKeywords(bodyText, [
    "admission",
    "application",
    "deadline",
  ]);

  const eligibility = extractByKeywords(bodyText, [
    "eligibility",
    "requirements",
    "qualification",
  ]);

  const tuitionFees = extractByKeywords(bodyText, [
    "tuition",
    "fee",
    "cost",
  ]);

  const scholarshipDetails = extractByKeywords(bodyText, [
    "scholarship",
    "financial aid",
    "funding",
  ]);

  return {
    admissionDetails,
    eligibility,
    tuitionFees,
    scholarshipDetails,
  };
}

module.exports = {
  scrapeUniversityDetails,
};
