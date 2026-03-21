const prisma = require("../config/prisma");
const { scrapeUniversityDetails } = require("../services/scraper.service");
const universitiesSeed = require("../data/universities.json");

function validateUniversityPayload(body) {
  if (!body?.name || !body?.slug || !body?.website) {
    return "name, slug, and website are required";
  }
  return null;
}

async function upsertScrapedUniversity({ name, slug, website }) {
  const scraped = await scrapeUniversityDetails(website);

  const university = await prisma.university.upsert({
    where: { slug },
    update: { name, website },
    create: { name, slug, website },
  });

  await prisma.admission.deleteMany({ where: { universityId: university.id } });
  await prisma.scholarship.deleteMany({ where: { universityId: university.id } });

  await prisma.admission.create({
    data: {
      universityId: university.id,
      details: scraped.admissionDetails,
      eligibility: scraped.eligibility,
      tuitionFees: scraped.tuitionFees,
    },
  });

  await prisma.scholarship.create({
    data: {
      universityId: university.id,
      details: scraped.scholarshipDetails,
    },
  });

  return university;
}

async function scrapeSingleUniversity(req, res) {
  try {
    const validationError = validateUniversityPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const university = await upsertScrapedUniversity(req.body);
    return res.status(201).json({ message: "Scraped successfully", university });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function scrapeSeedUniversities(req, res) {
  try {
    const results = [];

    for (const item of universitiesSeed) {
      const university = await upsertScrapedUniversity(item);
      results.push({ id: university.id, name: university.name, slug: university.slug });
    }

    return res.status(201).json({ message: "Seed scrape completed", results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  scrapeSingleUniversity,
  scrapeSeedUniversities,
};
