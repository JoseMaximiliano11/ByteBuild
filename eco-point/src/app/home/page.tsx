'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCurrentUser, logOut } from '@/lib/auth';
import { User } from '@/types/user';
import { Container } from '@/types/container';
import { fakeContainers } from '@/data/fakeContainers';
import MapView from '@/components/MapView';

const ESTADO_COLOR: Record<Container['estado'], string> = {
  disponible:   '#16a34a',
  lleno:        '#dc2626',
  mantenimiento:'#d97706',
};

const ESTADO_BG: Record<Container['estado'], string> = {
  disponible:   '#f0fdf4',
  lleno:        '#fff1f2',
  mantenimiento:'#fffbeb',
};

const ESTADO_LABEL: Record<Container['estado'], string> = {
  disponible:   'Disponible',
  lleno:        'Lleno',
  mantenimiento:'Mantenimiento',
};

const COMPARTMENT_CONFIG = [
  { key: 'plastico' as const, label: 'Plástico', color: '#3b82f6' },
  { key: 'vidrio'   as const, label: 'Vidrio',   color: '#0891b2' },
  { key: 'latas'    as const, label: 'Latas',    color: '#f97316' },
];

function barColor(pct: number, base: string) {
  if (pct >= 80) return '#dc2626';
  if (pct >= 55) return '#f59e0b';
  return base;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser]         = useState<User | null>(null);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Container | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    getCurrentUser().then(u => {
      if (!u) { router.replace('/login'); return; }
      setUser(u);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await logOut();
    router.replace('/login');
  };

  const handleSelectFromSidebar = (c: Container) => {
    setSelected(c);
    if (mapInstance.current) {
      mapInstance.current.panTo({ lat: c.ubicacion.lat, lng: c.ubicacion.lng });
      mapInstance.current.setZoom(17);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: "'Poppins', sans-serif", background: '#f8f8fa',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '3px solid #ede9fe', borderTopColor: '#7c3aed',
            margin: '0 auto 12px', animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#9ca3af', fontSize: '0.82rem', margin: 0 }}>Cargando...</p>
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
        padding: '0 20px', height: 56, flexShrink: 0,
        background: '#fff', borderBottom: '1px solid #f3f4f6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Image src="/imagenes/logo-recipoint.png" alt="Eco-Point" width={32} height={32}
            style={{ objectFit: 'contain' }} priority />
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '-0.01em' }}>
            Eco-Point
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: '#f5f3ff', borderRadius: 20, padding: '4px 11px',
          }}>
            <span style={{ fontSize: '0.78rem' }}>⭐</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed' }}>
              {user?.puntos ?? 0} pts
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: '#7c3aed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '0.78rem', fontWeight: 700, flexShrink: 0,
            }}>
              {(user?.nombre?.[0] ?? '?').toUpperCase()}
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#374151' }}>
              {user?.nombre} {user?.apellido}
            </span>
          </div>

          <button onClick={handleLogout} style={{
            padding: '5px 12px', borderRadius: 7, border: '1px solid #e5e7eb',
            background: '#fff', fontSize: '0.75rem', fontWeight: 500,
            color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Salir
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* MAPA */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapView
            containers={fakeContainers}
            onContainerSelect={setSelected}
            onMapReady={m => { mapInstance.current = m; }}
          />
        </div>

        {/* SIDEBAR */}
        <aside style={{
          width: 295, background: '#f5f5f7', borderLeft: '1px solid #ebebeb',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
        }}>

          {/* Sidebar header */}
          <div style={{
            padding: '13px 14px 10px', background: '#fff',
            borderBottom: '1px solid #ebebeb', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '0.87rem', fontWeight: 700, color: '#111827' }}>
                  Contenedores cercanos
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: '#9ca3af' }}>
                  Cochabamba · zona estudiantil
                </p>
              </div>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#7c3aed',
                background: '#f5f3ff', padding: '3px 8px', borderRadius: 20,
              }}>
                {fakeContainers.length} puntos
              </span>
            </div>

            {/* Leyenda */}
            <div style={{ display: 'flex', gap: 12, marginTop: 9 }}>
              {(['disponible', 'lleno', 'mantenimiento'] as Container['estado'][]).map(e => (
                <span key={e} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: '0.6rem', color: '#9ca3af',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: ESTADO_COLOR[e], flexShrink: 0,
                  }} />
                  {ESTADO_LABEL[e]}
                </span>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ overflowY: 'auto', flex: 1, padding: '10px 10px 14px' }}>
            {fakeContainers.map(c => {
              const isSelected = selected?.id === c.id;
              const avgFill = Math.round(
                (c.compartimentos.plastico + c.compartimentos.vidrio + c.compartimentos.latas) / 3,
              );
              const shortName = c.nombre.replace('Punto Verde - ', '');

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectFromSidebar(c)}
                  style={{
                    borderRadius: 11,
                    marginBottom: 9,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isSelected ? '1.5px solid #7c3aed' : '1.5px solid #e8e8e8',
                    boxShadow: isSelected
                      ? '0 4px 18px rgba(124,58,237,0.13)'
                      : '0 1px 3px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    background: '#fff',
                  }}
                >
                  {/* ── Card Header ── */}
                  <div style={{
                    background: isSelected ? '#f5f3ff' : ESTADO_BG[c.estado],
                    padding: '11px 13px 10px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                  }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <p style={{
                        margin: 0, fontSize: '0.84rem', fontWeight: 700,
                        color: '#0f172a', lineHeight: 1.25,
                      }}>
                        {shortName}
                      </p>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        marginTop: 5, padding: '1px 7px', borderRadius: 20,
                        fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.7)',
                        color: ESTADO_COLOR[c.estado],
                        border: `1px solid ${ESTADO_COLOR[c.estado]}30`,
                      }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: ESTADO_COLOR[c.estado],
                        }} />
                        {ESTADO_LABEL[c.estado]}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{
                        margin: 0, fontSize: '0.54rem', color: '#9ca3af',
                        textTransform: 'uppercase', letterSpacing: '0.07em',
                      }}>
                        Promedio
                      </p>
                      <p style={{
                        margin: '2px 0 0', fontSize: '1.15rem', fontWeight: 800, lineHeight: 1,
                        color: avgFill >= 80 ? '#dc2626' : avgFill >= 55 ? '#d97706' : '#16a34a',
                      }}>
                        {avgFill}%
                      </p>
                    </div>
                  </div>

                  {/* ── Compartimentos ── */}
                  <div style={{ padding: '2px 13px 4px' }}>
                    {COMPARTMENT_CONFIG.map(({ key, label, color }, i) => {
                      const pct = c.compartimentos[key];
                      const bc = barColor(pct, color);
                      return (
                        <div
                          key={key}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 0,
                            padding: '8px 0',
                            borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
                          }}
                        >
                          <span style={{
                            width: 7, height: 7, borderRadius: '50%',
                            background: color, flexShrink: 0, marginRight: 7,
                          }} />
                          <span style={{
                            fontSize: '0.69rem', color: '#4b5563',
                            width: 58, flexShrink: 0,
                          }}>
                            {label}
                          </span>
                          <div style={{
                            flex: 1, height: 4, background: '#f1f5f9',
                            borderRadius: 4, overflow: 'hidden', margin: '0 9px',
                          }}>
                            <div style={{
                              height: '100%', width: `${pct}%`,
                              background: bc, borderRadius: 4,
                              transition: 'width 0.3s ease',
                            }} />
                          </div>
                          <span style={{
                            fontSize: '0.68rem', fontWeight: 700,
                            color: bc, width: 30, textAlign: 'right', flexShrink: 0,
                          }}>
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Footer ── */}
                  <div style={{
                    padding: '7px 13px',
                    background: '#fafafa',
                    borderTop: '1px solid #f3f4f6',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                      stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ flexShrink: 0 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span style={{ fontSize: '0.63rem', color: '#9ca3af' }}>
                      {c.ubicacion.direccion}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
