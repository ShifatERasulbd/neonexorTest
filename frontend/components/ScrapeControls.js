"use client";

import { useState } from "react";
import { scrapeSingleUniversity, triggerSeedScrape } from "@/lib/api";

export default function ScrapeControls({ onDone }) {
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    website: "",
  });

  const onSeed = async () => {
    setError("");
    setLoadingSeed(true);
    try {
      await triggerSeedScrape();
      await onDone();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingSeed(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoadingSingle(true);

    try {
      await scrapeSingleUniversity(form);
      setForm({ name: "", slug: "", website: "" });
      await onDone();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingSingle(false);
    }
  };

  return (
    <div className="grid grid-2" style={{ marginBottom: 16 }}>
      <div className="card stack">
        <h3>Bulk Scrape</h3>
        <p style={{ margin: 0 }}>Scrape default university sources and update the database.</p>
        <button onClick={onSeed} disabled={loadingSeed}>
          {loadingSeed ? "Scraping..." : "Run Seed Scrape"}
        </button>
      </div>

      <form className="card stack" onSubmit={onSubmit}>
        <h3>Single University Scrape</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="website">Website URL</label>
          <input
            id="website"
            type="url"
            value={form.website}
            onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
            required
          />
        </div>

        <button type="submit" disabled={loadingSingle}>
          {loadingSingle ? "Scraping..." : "Scrape University"}
        </button>
      </form>

      {error ? (
        <div className="card" style={{ gridColumn: "1 / -1", borderColor: "#fecaca" }}>
          <strong style={{ color: "#b91c1c" }}>Error:</strong> {error}
        </div>
      ) : null}
    </div>
  );
}
