import "./globals.css";

export const metadata = {
  title: "Artphanage",
  description: "Artphanage, An e-commerce that allow orphanages to sell their artwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  );
}
