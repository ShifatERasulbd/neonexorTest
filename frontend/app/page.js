"use client";

import { useEffect, useState } from "react";
import { fetchUniversities } from "@/lib/api";
import ScrapeControls from "@/components/ScrapeControls";
import UniversityTable from "@/components/UniversityTable";

export default function HomePage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setError("");  
    try {
      const data = await fetchUniversities();
      setUniversities(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main>
      <div className="topbar">
        <div>
          <h1>University Scraper Dashboard</h1>
          <p style={{ marginTop: 6 }}>Admissions, tuition, eligibility and scholarships from scraped sources</p>
        </div>
        <span className="badge">{universities.length} universities</span>
      </div>

      <ScrapeControls onDone={loadData} />

      <section className="card" style={{ marginBottom: 16 }}>
        <h2>Collected Data</h2>
        <p style={{ marginTop: 8 }}>
          This dashboard reads data from the REST API and PostgreSQL-backed storage.
        </p>
      </section>

      {loading ? <p>Loading data...</p> : <UniversityTable universities={universities} />}

      {error ? (
        <div className="card" style={{ marginTop: 16, borderColor: "#fecaca" }}>
          <strong style={{ color: "#b91c1c" }}>Error:</strong> {error}
        </div>
      ) : null}
    </main>
  );
}
