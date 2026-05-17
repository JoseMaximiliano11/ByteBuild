export interface Container {
  id: string;
  nombre: string;
  ubicacion: {
    lat: number;
    lng: number;
    direccion: string;
  };
  compartimentos: {
    plastico: number;  // % de llenado (0-100)
    vidrio: number;
    latas: number;
  };
  estado: 'disponible' | 'lleno' | 'mantenimiento';
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WasteStats {
  id: string;
  containerId: string;
  userId: string;
  peso: number;
  tipo: 'plastico' | 'vidrio' | 'latas';
  puntos: number;
  timestamp: Date;
}

export enum WasteType {
  PLASTIC = 'plastico',
  GLASS = 'vidrio',
  CANS = 'latas',
}

export const WASTE_POINTS: Record<WasteType, number> = {
  [WasteType.PLASTIC]: 10,
  [WasteType.GLASS]: 8,
  [WasteType.CANS]: 12,
};

export const WASTE_LABELS: Record<WasteType, string> = {
  [WasteType.PLASTIC]: 'Botellas de plástico',
  [WasteType.GLASS]: 'Vidrio',
  [WasteType.CANS]: 'Latas',
};
