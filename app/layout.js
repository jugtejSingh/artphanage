import "./globals.css";
import {CartAnimation, CartProvider} from "@/app/shop/[slug]/CartContext";

export const metadata = {
  title: "Artphanage",
  description: "Artphanage, An e-commerce that allow orphanages to sell their artwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>
      <CartProvider>
        {children}
      </CartProvider>
      </body>
    </html>
  );
}
