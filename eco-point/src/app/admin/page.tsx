// src/app/admin/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import StatsChart from '@/components/StatsChart';
import { fakeContainers } from '@/data/fakeContainers';
import { fakeStats } from '@/data/fakeStats';
import { fakeUsers } from '@/data/fakeUsers';

export default function AdminPage() {
  const totalRecycled = fakeStats.reduce((sum, stat) => sum + stat.peso, 0);
  const totalPoints = fakeStats.reduce((sum, stat) => sum + stat.puntos, 0);
  const fullContainers = fakeContainers.filter(c => c.estado === 'lleno').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogin={() => {}} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel Administrativo</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-500 text-sm font-semibold mb-2">RESIDUOS RECICLADOS</div>
            <div className="text-3xl font-bold">{totalRecycled.toFixed(1)} kg</div>
            <div className="text-xs text-gray-400 mt-2">En el período actual</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-500 text-sm font-semibold mb-2">PUNTOS REPARTIDOS</div>
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-xs text-gray-400 mt-2">A todos los usuarios</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-500 text-sm font-semibold mb-2">CONTENEDORES LLENOS</div>
            <div className="text-3xl font-bold">{fullContainers}</div>
            <div className="text-xs text-gray-400 mt-2">Requieren vaciado</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-500 text-sm font-semibold mb-2">USUARIOS ACTIVOS</div>
            <div className="text-3xl font-bold">{fakeUsers.length}</div>
            <div className="text-xs text-gray-400 mt-2">En el sistema</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StatsChart
            title="Tipos de Residuos"
            type="bar"
            data={[
              { label: 'Plástico', value: 150, color: '#3B82F6' },
              { label: 'Papel', value: 120, color: '#F59E0B' },
              { label: 'Vidrio', value: 90, color: '#10B981' },
              { label: 'Orgánico', value: 60, color: '#F97316' },
              { label: 'Metal', value: 40, color: '#6B7280' },
            ]}
          />

          <StatsChart
            title="Distribución de Puntos"
            type="pie"
            data={[
              { label: 'Juan Pérez', value: 250, color: '#3B82F6' },
              { label: 'María García', value: 420, color: '#10B981' },
              { label: 'Carlos López', value: 180, color: '#F59E0B' },
            ]}
          />
        </div>

        {/* Contenedores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Estado de Contenedores</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4">Nombre</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-left py-3 px-4">Ubicación</th>
                  <th className="text-left py-3 px-4">Capacidad</th>
                  <th className="text-left py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {fakeContainers.map(container => (
                  <tr key={container.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{container.nombre}</td>
                    <td className="py-3 px-4">{container.tipo}</td>
                    <td className="py-3 px-4">{container.ubicacion.direccion}</td>
                    <td className="py-3 px-4">
                      <div className="bg-gray-200 rounded-full h-2 w-24 overflow-hidden">
                        <div
                          className="bg-green-500 h-full"
                          style={{ width: `${(container.nivelActual / container.capacidad) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          container.estado === 'disponible'
                            ? 'bg-green-100 text-green-700'
                            : container.estado === 'lleno'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {container.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
