import "./globals.css";

export const metadata = {
  title: "University Scraper Dashboard",
  description: "Dashboard for scraped university admissions and scholarship data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
