// src/components/AuthLayout.tsx
// Layout compartido para login y register:
// imagen de Cochabamba a la izquierda, panel blanco a la derecha.

import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-root" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── LEFT: foto Cochabamba ── */}
      <div className="auth-left">
        <Image
          src="/imagenes/cachabamba.png"
          alt="Vista aérea de Cochabamba"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="auth-logo">
          <Image
            src="/imagenes/logo-recipoint.png"
            alt="ReciPoint"
            width={140}
            height={140}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* ── RIGHT: panel auth ── */}
      <div className="auth-right">
        <div className="auth-content">
          {children}
        </div>
      </div>

    </div>
  );
}

/* ── Tabs — usan links de Next.js ── */
function Tabs() {
  // Detectamos la ruta activa en el componente padre (login/register),
  // por eso exportamos también TabsLogin y TabsRegister desde cada page.
  return null; // los tabs se renderizan dentro de cada page.tsx
}

/* ── Header para login/register */
export function AuthHeader() {
  return (
    <header className="auth-header">
      <div className="auth-brand">
        <span>Reci</span>
        <span>Point</span>
      </div>

      <nav>
        <a href="#">Mapa</a>
        <a href="#">Blogs</a>
        <a href="#">Estadísticas</a>
        <a href="#">Sobre nosotros</a>
      </nav>

      <div className="auth-meta">
        <span>100 pts</span>
        <span>Juanita</span>
      </div>
    </header>
  );
}

/* ── Footer para login/register */
export function AuthFooter() {
  return (
    <footer className="auth-footer">
      <div className="auth-footer-grid">
        <div className="auth-footer-column">
          <h3>ReciPoint</h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Una plataforma de reciclaje comunitario con datos claros y diseño accesible.
          </p>
          <div className="auth-footer-social">
            <a href="#" aria-label="Figma">F</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="Instagram">I</a>
            <a href="#" aria-label="YouTube">Y</a>
          </div>
        </div>

        <div className="auth-footer-column">
          <h3>Use cases</h3>
          <a href="#">UI design</a>
          <a href="#">UX design</a>
          <a href="#">Wireframing</a>
          <a href="#">Diagramming</a>
        </div>

        <div className="auth-footer-column">
          <h3>Explore</h3>
          <a href="#">Design</a>
          <a href="#">Prototyping</a>
          <a href="#">Development</a>
          <a href="#">Collaboration</a>
        </div>

        <div className="auth-footer-column">
          <h3>Resources</h3>
          <a href="#">Blog</a>
          <a href="#">Best practices</a>
          <a href="#">Color wheel</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}

/* ── Logo Alcaldía + Cocha ── */
export function BottomBrand() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 16, padding: '18px 28px 22px',
      borderTop: '1px solid #E0E0E6', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/imagenes/logo-gamc.png" alt="Alcaldía de Cochabamba" width={48} height={48} />
        </div>

        <div style={{ width: 1, height: 36, background: '#E0E0E6' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            <span style={{ color: '#E84C3D' }}>C</span>
            <span style={{ color: '#F39C12' }}>o</span>
            <span style={{ color: '#27AE60' }}>c</span>
            <span style={{ color: '#2980B9' }}>h</span>
            <span style={{ color: '#8E44AD' }}>a</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 600, color: '#555', lineHeight: 1.1, textTransform: 'uppercase' }}>
            <span style={{ letterSpacing: '0.08em' }}>somos</span>
            <span style={{ letterSpacing: '0.08em' }}>innovación</span>
          </div>
        </div>
      </div>
    </div>
  );
}