'use client';

type Props = {
  isOpen: boolean;
  puntos: number;
  onClose: () => void;
  onCanjear: () => void;
};

export default function RedeemModal({ isOpen, puntos, onClose, onCanjear }: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 1 }}>
                17 de mayo de 2026
              </p>
              <h2 style={{ margin: '12px 0 6px', fontSize: 36, fontWeight: 800, color: '#111827' }}>
                Canje de Puntos
              </h2>
              <p style={{ margin: 0, fontSize: 16, color: '#4b5563' }}>
                Total de puntos acumulados:
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => {
                  // Acción de Basurero
                }}
                style={{
                  padding: '12px 18px',
                  borderRadius: 9999,
                  border: '1px solid rgba(14,165,233,0.35)',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Basurero
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 140, borderRadius: '50%', border: '8px solid rgba(14,165,233,0.25)' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 38, fontWeight: 800, color: '#0ea5e9' }}>{puntos}</p>
                  <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Puntos</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <button
              onClick={onCanjear}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: 24,
                borderRadius: 24,
                border: '1px solid rgba(14,165,233,0.35)',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <span style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #0ea5e9', display: 'grid', placeItems: 'center', color: '#0ea5e9', fontSize: 28 }}>
                💳
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                Transferencia bancaria
              </span>
            </button>

            <button
              onClick={onCanjear}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: 24,
                borderRadius: 24,
                border: '1px solid rgba(14,165,233,0.35)',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <span style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #0ea5e9', display: 'grid', placeItems: 'center', color: '#0ea5e9', fontSize: 28 }}>
                ▦
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                QR
              </span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 20px',
                borderRadius: 14,
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
