import { Container } from '@/types/container';

// Coordenadas verificadas en zonas de alto tránsito estudiantil - Cochabamba
export const fakeContainers: Container[] = [
  {
    id: 'cont-001',
    nombre: 'Punto Verde - Plaza Central',
    ubicacion: {
      lat: -17.3939,
      lng: -66.1568,
      direccion: 'Plaza 14 de Septiembre, Centro',
    },
    compartimentos: { plastico: 45, vidrio: 30, latas: 60 },
    estado: 'disponible',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-002',
    nombre: 'Punto Verde - El Prado',
    ubicacion: {
      // Av. Heroínas (El Prado) - paseo peatonal muy transitado por universitarios
      lat: -17.3924,
      lng: -66.1762,
      direccion: 'El Prado, Av. Heroínas',
    },
    compartimentos: { plastico: 82, vidrio: 90, latas: 78 },
    estado: 'lleno',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-003',
    nombre: 'Punto Verde - UMSS',
    ubicacion: {
      // Campus central UMSS, Av. Oquendo entre Jordán y Gral. Achá
      lat: -17.3940,
      lng: -66.1952,
      direccion: 'Av. Oquendo s/n, Campus UMSS',
    },
    compartimentos: { plastico: 0, vidrio: 0, latas: 0 },
    estado: 'mantenimiento',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-004',
    nombre: 'Punto Verde - Plaza Colón',
    ubicacion: {
      // Plaza Colón, zona norte del centro histórico
      lat: -17.3877,
      lng: -66.1564,
      direccion: 'Plaza Colón, Av. Ayacucho',
    },
    compartimentos: { plastico: 55, vidrio: 40, latas: 30 },
    estado: 'disponible',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-05-16'),
  },
  {
    id: 'cont-005',
    nombre: 'Punto Verde - Av. Ballivián',
    ubicacion: {
      // Av. Ballivián norte, zona de cafés y comercios frecuentados por estudiantes
      lat: -17.3895,
      lng: -66.1568,
      direccion: 'Av. Ballivián y C. Colombia',
    },
    compartimentos: { plastico: 20, vidrio: 15, latas: 25 },
    estado: 'disponible',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-05-16'),
  },
];

export function getContainerById(id: string): Container | undefined {
  return fakeContainers.find(c => c.id === id);
}

export function getAvailableContainers(): Container[] {
  return fakeContainers.filter(c => c.estado === 'disponible');
}

export function nivelPromedio(c: Container): number {
  const { plastico, vidrio, latas } = c.compartimentos;
  return Math.round((plastico + vidrio + latas) / 3);
}
