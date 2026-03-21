const axios = require("axios");
const cheerio = require("cheerio");

function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9\s.,]/g, "")
    .trim();
}

function extractSentencesByKeywords(text, keywords) {
  const sentences = text
    .split(/[\.\!\?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  const matched = [];
  for (const sentence of sentences) {
    if (keywords.some((kw) => sentence.toLowerCase().includes(kw.toLowerCase()))) {
      matched.push(sentence);
      if (matched.length >= 2) break;
    }
  }

  const result = matched.slice(0, 2).join(". ");
  return result.length > 0 ? result + "." : "Not available";
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
  $("script, style, nav, footer, noscript").remove();
  const bodyText = cleanText($("body").text());

  const admissionDetails = extractSentencesByKeywords(bodyText, [
    "admission",
    "application",
    "deadline",
    "apply",
  ]);

  const eligibility = extractSentencesByKeywords(bodyText, [
    "eligibility",
    "requirement",
    "qualification",
    "qualify",
  ]);

  const tuitionFees = extractSentencesByKeywords(bodyText, [
    "tuition",
    "fee",
    "cost",
    "price",
  ]);

  const scholarshipDetails = extractSentencesByKeywords(bodyText, [
    "scholarship",
    "financial aid",
    "grant",
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
