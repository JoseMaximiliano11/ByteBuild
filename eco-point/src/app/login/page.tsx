// src/app/login/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="auth-root" style={{ fontFamily: "'Poppins', sans-serif" }}>
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

      <div className="auth-right">
        <div className="auth-tabs" style={{
          display: 'flex',
          background: '#F5F5F7', borderRadius: 10,
          padding: 4, gap: 4, flexShrink: 0,
          margin: '28px 28px 0',
        }}>
          <Link href="/register" style={{
            flex: 1, padding: '9px 0', borderRadius: 7,
            background: 'transparent', border: 'none',
            fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500,
            color: '#888', cursor: 'pointer', textAlign: 'center',
            textDecoration: 'none', display: 'block',
          }}>
            Crear Cuenta
          </Link>
          <span style={{
            flex: 1, padding: '9px 0', borderRadius: 7,
            background: '#6B3FA0', border: 'none',
            fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500,
            color: '#fff', textAlign: 'center', display: 'block',
            boxShadow: '0 2px 10px rgba(107,63,160,0.3)',
          }}>
            Iniciar Sesión
          </span>
        </div>

        <div className="auth-form-wrap">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}