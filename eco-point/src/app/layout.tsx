import "./globals.css";

export const metadata = {
  title: "RECI - Plataforma de Reciclaje",
  description: "Plataforma inteligente de reciclaje de Cochabamba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}