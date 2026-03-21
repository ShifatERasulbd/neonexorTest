export default function UniversityTable({ universities }) {
  if (!universities.length) {
    return <p>No data yet. Run scraping to populate the database.</p>;
  }

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>University</th>
            <th>Admission Details</th>
            <th>Eligibility</th>
            <th>Tuition Fees</th>
            <th>Scholarship</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => {
            const admission = university.admissions?.[0];
            const scholarship = university.scholarships?.[0];

            return (
              <tr key={university.id}>
                <td>
                  <strong>{university.name}</strong>
                  <div style={{ fontSize: 12, marginTop: 6 }}>
                    <a href={university.website} target="_blank" rel="noreferrer">
                      {university.website}
                    </a>
                  </div>
                </td>
                <td>{admission?.details || "Not available"}</td>
                <td>{admission?.eligibility || "Not available"}</td>
                <td>{admission?.tuitionFees || "Not available"}</td>
                <td>{scholarship?.details || "Not available"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
