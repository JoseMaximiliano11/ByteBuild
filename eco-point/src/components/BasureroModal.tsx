'use client';

type Item = {
  nombre: string;
  descripcion: string;
  puntos: string;
  cantidad: number;
  color: string;
};

type Props = {
  isOpen: boolean;
  puntos: number;
  onClose: () => void;
};

const items: Item[] = [
  { nombre: 'Botella Plástico', descripcion: '0.05 Bs · 0.5 pts', puntos: '5', cantidad: 5, color: '#eef2ff' },
  { nombre: 'Botella Vidrio', descripcion: '0.20 Bs · 2 pts', puntos: '3', cantidad: 3, color: '#f8fafc' },
  { nombre: 'Lata', descripcion: '0.20 Bs · 2 pts', puntos: '1', cantidad: 1, color: '#fff7ed' },
];

export default function BasureroModal({ isOpen, puntos, onClose }: Props) {
  if (!isOpen) return null;

  const displayPoints = puntos === 0 ? 4.5 : puntos;
  const totalArticulos = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalBs = items.reduce((sum, item) => {
    const match = item.descripcion.match(/([0-9]+\.?[0-9]*) Bs/);
    return sum + (match ? Number(match[1]) * item.cantidad : 0);
  }, 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 980,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
          background: '#ffffff',
        }}
      >
        <div style={{ padding: 28, background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, color: '#fff' }}>
            <div>
              <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1.2, fontSize: 13, opacity: 0.85 }}>
                Basurero inteligente
              </p>
              <h2 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em' }}>
                Eco-Point Cochabamba
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                border: '1px solid rgba(255,255,255,0.32)',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                borderRadius: 9999,
                padding: '10px 18px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Cerrar
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, padding: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>
                  Artículos detectados
                </p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6b7280' }}>
                  Escanea y suma puntos en tiempo real
                </p>
              </div>
              <div style={{ padding: '10px 16px', borderRadius: 9999, background: '#eef2ff', color: '#1d4ed8', fontWeight: 700, fontSize: 13 }}>
                Activo
              </div>
            </div>

            {items.map((item) => (
              <div key={item.nombre} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 18, borderRadius: 22, background: item.color, border: '1px solid #e5e7eb' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>{item.nombre}</p>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563' }}>{item.descripcion}</p>
                </div>
                <div style={{ minWidth: 24, textAlign: 'center', fontWeight: 700, color: '#111827', fontSize: 16 }}>
                  {item.cantidad}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderRadius: 22, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Artículos</p>
                <p style={{ margin: '8px 0 0', fontSize: 20, fontWeight: 800, color: '#111827' }}>{totalArticulos}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Total Bs</p>
                <p style={{ margin: '8px 0 0', fontSize: 20, fontWeight: 800, color: '#111827' }}>{totalBs.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ padding: 28, borderRadius: 32, border: '2px solid #c7d2fe', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1.2, color: '#0f172a' }}>
                    Escanear para canjear
                  </p>
                </div>
                <div style={{ padding: '10px 16px', borderRadius: 9999, background: '#eef2ff', color: '#1d4ed8', fontSize: 12, fontWeight: 700 }}>
                  {displayPoints} pts
                </div>
              </div>
              <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 280, borderRadius: 36, background: '#0f172a', padding: 18, display: 'grid', placeItems: 'center' }}>
                <img
                  src="/imagenes/eco-point-qr.png"
                  alt="QR para canjear puntos"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 24, background: '#fff', padding: 16 }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ padding: 18, borderRadius: 24, background: '#eff6ff', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#1d4ed8' }}>Artículos</p>
                <p style={{ margin: '10px 0 0', fontSize: 22, fontWeight: 800, color: '#111827' }}>{totalArticulos}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 24, background: '#eff6ff', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#1d4ed8' }}>Total Bs</p>
                <p style={{ margin: '10px 0 0', fontSize: 22, fontWeight: 800, color: '#111827' }}>{totalBs.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
