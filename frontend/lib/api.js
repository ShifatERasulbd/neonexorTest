const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchUniversities() {
  const response = await fetch(`${API_URL}/universities`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch universities");
  }
  return response.json();
}

export async function triggerSeedScrape() {
  const response = await fetch(`${API_URL}/scrape/seed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Seed scrape failed");
  }

  return payload;
}

export async function scrapeSingleUniversity(body) {
  const response = await fetch(`${API_URL}/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Scrape failed");
  }

  return payload;
}
