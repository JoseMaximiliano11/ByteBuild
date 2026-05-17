'use client';

import { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { Container } from '@/types/container';

type Props = {
  containers: Container[];
  onContainerSelect?: (container: Container) => void;
};

const STATUS_COLORS: Record<Container['estado'], string> = {
  disponible: '#22c55e',
  lleno: '#ef4444',
  mantenimiento: '#f59e0b',
};

function circleIcon(color: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="14" cy="14" r="11" fill="${color}" stroke="white" stroke-width="2.5"/></svg>`,
  )}`;
}

export default function MapView({ containers, onContainerSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!mapRef.current || initialized.current) return;
    initialized.current = true;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
    const centerLat = parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT ?? '-17.3935');
    const centerLng = parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG ?? '-66.1570');
    const zoom = parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM ?? '14');

    setOptions({ key: apiKey, v: 'weekly' });

    (async () => {
      try {
        const { Map, InfoWindow } = await importLibrary('maps');
        const { Marker } = await importLibrary('marker');
        if (!mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        containers.forEach(container => {
          const marker = new Marker({
            position: { lat: container.ubicacion.lat, lng: container.ubicacion.lng },
            map,
            title: container.nombre,
            icon: circleIcon(STATUS_COLORS[container.estado]),
          });

          const infoWindow = new InfoWindow({
            content: `
              <div style="font-family:'Poppins',sans-serif;padding:4px 2px;min-width:180px">
                <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#6B3FA0">${container.nombre}</p>
                <p style="margin:0 0 5px;font-size:11px;color:#888">${container.ubicacion.direccion}</p>
                <div style="display:flex;gap:10px;font-size:11px">
                  <span>Nivel: <b>${container.nivelActual}%</b></span>
                  <span style="color:${STATUS_COLORS[container.estado]};font-weight:700;text-transform:capitalize">${container.estado}</span>
                </div>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open({ map, anchor: marker });
            onContainerSelect?.(container);
          });
        });
      } catch (err: unknown) {
        console.error('Error cargando Google Maps:', err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />
  );
}
