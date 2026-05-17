'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCurrentUser, logOut } from '@/lib/auth';
import { User } from '@/types/user';
import { Container } from '@/types/container';
import { fakeContainers } from '@/data/fakeContainers';
import MapView from '@/components/MapView';

const TIPO_COLOR: Record<Container['tipo'], string> = {
  plastico: '#3b82f6',
  papel: '#f59e0b',
  vidrio: '#06b6d4',
  organico: '#22c55e',
  metal: '#6b7280',
};

const ESTADO_COLOR: Record<Container['estado'], string> = {
  disponible: '#22c55e',
  lleno: '#ef4444',
  mantenimiento: '#f59e0b',
};

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Container | null>(null);

  useEffect(() => {
    getCurrentUser().then(u => {
      if (!u) {
        router.replace('/login');
        return;
      }
      setUser(u);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await logOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: "'Poppins', sans-serif", background: '#f8f8fa',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '4px solid #e5e7eb', borderTopColor: '#6B3FA0',
            margin: '0 auto 14px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#888', fontSize: '0.88rem', margin: 0 }}>Cargando...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      fontFamily: "'Poppins', sans-serif", overflow: 'hidden',
    }}>

      {/* ── NAVBAR ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 58, flexShrink: 0,
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)', zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/imagenes/logo-recipoint.png"
            alt="Eco-Point"
            width={34}
            height={34}
            style={{ objectFit: 'contain' }}
            priority
          />
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#6B3FA0' }}>
            Eco-Point
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

          {/* Puntos */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#f3ecff', borderRadius: 20, padding: '5px 13px',
          }}>
            <span style={{ fontSize: '0.95rem' }}>⭐</span>
            <span style={{ fontSize: '0.83rem', fontWeight: 700, color: '#6B3FA0' }}>
              {user?.puntos ?? 0} pts
            </span>
          </div>

          {/* Avatar + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#6B3FA0', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0,
            }}>
              {(user?.nombre?.[0] ?? '?').toUpperCase()}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>
              {user?.nombre} {user?.apellido}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px', borderRadius: 8,
              border: '1.5px solid #e5e7eb', background: '#fff',
              fontSize: '0.78rem', fontWeight: 500, color: '#666',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ── BODY: mapa + sidebar ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* MAPA */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapView containers={fakeContainers} onContainerSelect={setSelected} />
        </div>

        {/* SIDEBAR */}
        <aside style={{
          width: 296, background: '#fff', borderLeft: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
        }}>

          {/* Header sidebar */}
          <div style={{
            padding: '14px 16px 10px', borderBottom: '1px solid #f0f0f0', flexShrink: 0,
          }}>
            <h2 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#222' }}>
              Contenedores cercanos
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#999' }}>
              {fakeContainers.length} puntos de reciclaje · Cochabamba
            </p>
          </div>

          {/* Leyenda */}
          <div style={{
            display: 'flex', gap: 10, padding: '8px 16px',
            borderBottom: '1px solid #f5f5f5', flexShrink: 0,
          }}>
            {(['disponible', 'lleno', 'mantenimiento'] as Container['estado'][]).map(e => (
              <span key={e} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.66rem', color: '#666' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ESTADO_COLOR[e], display: 'inline-block' }} />
                {e}
              </span>
            ))}
          </div>

          {/* Lista */}
          <div style={{ overflowY: 'auto', flex: 1, padding: '10px 12px' }}>
            {fakeContainers.map(c => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                style={{
                  padding: '11px 13px', borderRadius: 10, marginBottom: 8, cursor: 'pointer',
                  border: `2px solid ${selected?.id === c.id ? '#6B3FA0' : '#efefef'}`,
                  background: selected?.id === c.id ? '#f9f5ff' : '#fafafa',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                {/* Tipo + estado */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700, color: '#fff',
                    background: TIPO_COLOR[c.tipo], borderRadius: 5, padding: '2px 8px',
                    textTransform: 'capitalize',
                  }}>
                    {c.tipo}
                  </span>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    color: ESTADO_COLOR[c.estado], textTransform: 'capitalize',
                  }}>
                    {c.estado}
                  </span>
                </div>

                {/* Nombre */}
                <p style={{ margin: '0 0 2px', fontSize: '0.8rem', fontWeight: 600, color: '#222' }}>
                  {c.nombre}
                </p>

                {/* Dirección */}
                <p style={{ margin: '0 0 8px', fontSize: '0.7rem', color: '#999' }}>
                  {c.ubicacion.direccion}
                </p>

                {/* Barra de nivel */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '0.64rem', color: '#aaa' }}>Nivel de llenado</span>
                    <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#555' }}>{c.nivelActual}%</span>
                  </div>
                  <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${c.nivelActual}%`,
                      background: c.nivelActual >= 80
                        ? '#ef4444'
                        : c.nivelActual >= 50
                          ? '#f59e0b'
                          : '#22c55e',
                      borderRadius: 3,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
