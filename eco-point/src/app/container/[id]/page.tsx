// src/app/container/[id]/page.tsx
'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import QRGenerator from '@/components/QRGenerator';
import { fakeContainers } from '@/data/fakeContainers';
import { fakeStats } from '@/data/fakeStats';
import { Container, WasteStats } from '@/types/container';

const COMPARTMENT_CONFIG = [
  { key: 'plastico' as const, label: 'Botellas de plástico', color: 'bg-blue-500' },
  { key: 'vidrio'   as const, label: 'Vidrio',               color: 'bg-cyan-500'  },
  { key: 'latas'    as const, label: 'Latas',                color: 'bg-orange-500' },
];

export default function ContainerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const containerId = params.id as string;

  const container = useMemo<Container | null>(
    () => fakeContainers.find(c => c.id === containerId) ?? null,
    [containerId],
  );

  const stats = useMemo<WasteStats[]>(
    () => (container ? fakeStats.filter(s => s.containerId === containerId) : []),
    [container, containerId],
  );

  if (!container) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogin={() => router.push('/login')} />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center py-12">
          <p className="text-gray-500">Contenedor no encontrado</p>
        </div>
      </div>
    );
  }

  const avgNivel = Math.round(
    (container.compartimentos.plastico + container.compartimentos.vidrio + container.compartimentos.latas) / 3,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogin={() => router.push('/login')} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
            >
              ← Volver
            </button>
            <h1 className="text-3xl font-bold">{container.nombre}</h1>
            <div />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Ubicación</label>
                <p className="text-lg">{container.ubicacion.direccion}</p>
                <p className="text-sm text-gray-500">
                  {container.ubicacion.lat}, {container.ubicacion.lng}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Estado</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                  container.estado === 'disponible'   ? 'bg-green-100 text-green-700'
                  : container.estado === 'lleno'      ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {container.estado}
                </span>
              </div>

              {/* Compartimentos */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-3 block">
                  Nivel por compartimento
                </label>
                <div className="space-y-3">
                  {COMPARTMENT_CONFIG.map(({ key, label, color }) => {
                    const pct = container.compartimentos[key];
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{label}</span>
                          <span className="font-bold">{pct}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${color} h-full transition-all`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-3">Promedio de llenado: <strong>{avgNivel}%</strong></p>
              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gray-100 p-6 rounded-lg">
                <QRGenerator containerId={container.id} containerName={container.nombre} />
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Escanea este código para registrar residuos
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {stats.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Estadísticas de este Contenedor</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Depósitos</p>
                <p className="text-2xl font-bold">{stats.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Peso Total</p>
                <p className="text-2xl font-bold">{stats.reduce((s, r) => s + r.peso, 0).toFixed(1)} kg</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Puntos Repartidos</p>
                <p className="text-2xl font-bold">{stats.reduce((s, r) => s + r.puntos, 0)}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {stats.slice(0, 5).map(stat => (
                  <div key={stat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Usuario {stat.userId}</p>
                      <p className="text-sm text-gray-600">{stat.peso} kg de {stat.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+{stat.puntos} pts</p>
                      <p className="text-xs text-gray-500">{stat.timestamp.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
