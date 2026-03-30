function truncateText(text, maxLength = 100) {
  if (!text || text === "Not available") return text;
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).split(" ").slice(0, -1).join(" ") + "...";
}

export default function UniversityTable({ universities, onEdit, onDelete }) {
  if (!universities.length) {
    return <p>No data yet. Run scraping to populate the database.</p>;
  }

  return (
    <div className="card">
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>University</th>
              <th>Admission Details</th>
              <th>Eligibility</th>
              <th>Tuition Fees</th>
              <th>Scholarship</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => {
              const admission = university.admissions?.[0];
              const scholarship = university.scholarships?.[0];

              return (
                <tr key={university.id}>
                  <td>
                    <strong style={{ fontSize: 14 }}>{university.name}</strong>
                    <div style={{ fontSize: 11, marginTop: 6, color: "#0066cc" }}>
                      <a href={university.website} target="_blank" rel="noreferrer">
                        📖 Visit Website
                      </a>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, lineHeight: 1.4 }}>
                    {truncateText(admission?.details)}
                  </td>
                  <td style={{ fontSize: 12, lineHeight: 1.4 }}>
                    {truncateText(admission?.eligibility)}
                  </td>
                  <td style={{ fontSize: 12, lineHeight: 1.4 }}>
                    {truncateText(admission?.tuitionFees)}
                  </td>
                  <td style={{ fontSize: 12, lineHeight: 1.4 }}>
                    {truncateText(scholarship?.details)}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => onEdit(university)}
                      style={{ marginRight: 8, padding: '4px 8px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(university.id)}
                      style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
