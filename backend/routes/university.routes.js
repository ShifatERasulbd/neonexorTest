const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
}

function validateUniversityBody(body) {
  if (!body?.name || !body?.slug || !body?.website) {
    return "name, slug and website are required";
  }
  return null;
}

router.get("/", async (req, res) => {
  try {
    const universities = await prisma.university.findMany({
      include: { admissions: true, scholarships: true },
    });
    return res.status(200).json(universities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid university id" });
    }

    const university = await prisma.university.findFirst({
      where: { id },
      include: { admissions: true, scholarships: true },
    });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    return res.status(200).json(university);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const validationError = validateUniversityBody(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { name, slug, website } = req.body;
    const university = await prisma.university.create({
      data: { name, slug, website },
    });

    return res.status(201).json(university);
  } catch (error) {
    const statusCode = error.code === "P2002" ? 400 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid university id" });
    }

    const validationError = validateUniversityBody(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { name, slug, website } = req.body;
    const university = await prisma.university.update({
      where: { id },
      data: { name, slug, website },
    });

    return res.status(200).json(university);
  } catch (error) {
    const statusCode = error.code === "P2025" ? 404 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid university id" });
    }

    const { name, slug, website } = req.body;
    if (!name && !slug && !website) {
      return res.status(400).json({ error: "Provide at least one field to update" });
    }

    const university = await prisma.university.update({
      where: { id },
      data: { name, slug, website },
    });

    return res.status(200).json(university);
  } catch (error) {
    const statusCode = error.code === "P2025" ? 404 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid university id" });
    }

    await prisma.university.delete({ where: { id } });
    return res.status(200).json({ message: "University deleted" });
  } catch (error) {
    const statusCode = error.code === "P2025" ? 404 : 500;
    return res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;
