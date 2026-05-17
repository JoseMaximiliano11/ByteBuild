'use client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCanjear: () => void;
  puntos: number;
};

export default function PointsModal({ isOpen, onClose, onCanjear, puntos }: Props) {
  if (!isOpen) return null;

  const fecha = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
        <div
          style={{
            position: 'relative',
            minHeight: 260,
            padding: 36,
            color: '#ffffff',
            backgroundImage:
              "linear-gradient(160deg, rgba(99, 102, 241, 0.45), rgba(56, 189, 248, 0.3)), url('/imagenes/cachabamba.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <div style={{ maxWidth: 520 }}>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.9 }}>
              {fecha}
            </p>
            <h2 style={{ margin: '12px 0 10px', fontSize: 38, lineHeight: 1.05, fontWeight: 800 }}>
              Incentivos y Descuentos
            </h2>
            <p style={{ margin: 0, fontSize: 16, opacity: 0.9 }}>
              Total de puntos acumulados:
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 36,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: '10px solid rgba(255,255,255,0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{puntos}</span>
            <span style={{ marginTop: 4, fontSize: 14, opacity: 0.85 }}>Puntos</span>
          </div>
        </div>

        <div style={{ padding: 36, background: '#f8f9ff' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
            <div style={{ flex: '1 1 320px' }}>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#121827' }}>
                Bono Económico
              </p>
              <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.75, color: '#4b5563' }}>
                Transferencia a cuenta bancaria por alcanzar 1000 pts.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onCanjear();
              }}
              style={{
                minWidth: 200,
                padding: '14px 20px',
                borderRadius: 16,
                border: 'none',
                background: '#0ea5e9',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              CANJEAR PUNTOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
