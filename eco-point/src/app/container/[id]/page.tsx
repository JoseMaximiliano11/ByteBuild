// src/app/container/[id]/page.tsx
'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import QRGenerator from '@/components/QRGenerator';
import { fakeContainers } from '@/data/fakeContainers';
import { fakeStats } from '@/data/fakeStats';
import { Container, WasteStats } from '@/types/container';

export default function ContainerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const containerId = params.id as string;

  const container = useMemo<Container | null>(
    () => fakeContainers.find(c => c.id === containerId) ?? null,
    [containerId]
  );

  const stats = useMemo<WasteStats[]>(
    () => (container ? fakeStats.filter(s => s.containerId === containerId) : []),
    [container, containerId]
  );

  if (!container) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onLogin={() => router.push('/login')} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Contenedor no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  const fillPercentage = (container.nivelActual / container.capacidad) * 100;

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
            <div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Tipo</label>
                  <p className="text-lg">{container.tipo.toUpperCase()}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Ubicación</label>
                  <p className="text-lg">{container.ubicacion.direccion}</p>
                  <p className="text-sm text-gray-500">
                    Coordenadas: {container.ubicacion.lat}, {container.ubicacion.lng}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Estado</label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                      container.estado === 'disponible'
                        ? 'bg-green-100 text-green-700'
                        : container.estado === 'lleno'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {container.estado}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">
                    Capacidad
                  </label>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        fillPercentage < 50
                          ? 'bg-green-500'
                          : fillPercentage < 80
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {container.nivelActual} / {container.capacidad} kg ({fillPercentage.toFixed(1)}%)
                  </p>
                </div>
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
                <p className="text-2xl font-bold">{stats.reduce((sum, s) => sum + s.peso, 0).toFixed(1)} kg</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Puntos Repartidos</p>
                <p className="text-2xl font-bold">{stats.reduce((sum, s) => sum + s.puntos, 0)}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {stats.slice(0, 5).map(stat => (
                  <div key={stat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Usuario {stat.userId}</p>
                      <p className="text-sm text-gray-600">
                        {stat.peso} kg de {stat.tipo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+{stat.puntos} pts</p>
                      <p className="text-xs text-gray-500">
                        {stat.timestamp.toLocaleDateString()}
                      </p>
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
