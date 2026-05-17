// src/data/fakeStats.ts
// Datos de prueba de estadísticas

import { WasteStats } from '@/types/container';

export const fakeStats: WasteStats[] = [
  {
    id: 'stat-001',
    containerId: 'cont-001',
    userId: '1',
    peso: 2.5,
    tipo: 'plastico',
    puntos: 25,
    timestamp: new Date('2024-05-10'),
  },
  {
    id: 'stat-002',
    containerId: 'cont-002',
    userId: '1',
    peso: 1.2,
    tipo: 'latas',
    puntos: 14,
    timestamp: new Date('2024-05-11'),
  },
  {
    id: 'stat-003',
    containerId: 'cont-003',
    userId: '2',
    peso: 3.0,
    tipo: 'vidrio',
    puntos: 24,
    timestamp: new Date('2024-05-12'),
  },
  {
    id: 'stat-004',
    containerId: 'cont-004',
    userId: '2',
    peso: 2.0,
    tipo: 'plastico',
    puntos: 20,
    timestamp: new Date('2024-05-13'),
  },
  {
    id: 'stat-005',
    containerId: 'cont-005',
    userId: '3',
    peso: 1.5,
    tipo: 'latas',
    puntos: 18,
    timestamp: new Date('2024-05-14'),
  },
];

export function getStatsByUserId(userId: string): WasteStats[] {
  return fakeStats.filter(stat => stat.userId === userId);
}

export function getStatsByContainerId(containerId: string): WasteStats[] {
  return fakeStats.filter(stat => stat.containerId === containerId);
}

export function getTotalPointsByUser(userId: string): number {
  return fakeStats
    .filter(stat => stat.userId === userId)
    .reduce((sum, stat) => sum + stat.puntos, 0);
}

export function getStatsInRange(startDate: Date, endDate: Date): WasteStats[] {
  return fakeStats.filter(
    stat => stat.timestamp >= startDate && stat.timestamp <= endDate
  );
}

export function getTopContributors(limit: number = 10): Array<{ userId: string; puntos: number }> {
  const userPoints: Record<string, number> = {};

  fakeStats.forEach(stat => {
    if (!userPoints[stat.userId]) {
      userPoints[stat.userId] = 0;
    }
    userPoints[stat.userId] += stat.puntos;
  });

  return Object.entries(userPoints)
    .map(([userId, puntos]) => ({ userId, puntos }))
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, limit);
}
