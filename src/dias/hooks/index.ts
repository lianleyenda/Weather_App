import { useState } from 'react';

export const usarFechas = () => {
  const [fechaActual, setFechaActual] = useState(new Date());

  const irAlDiaAnterior = () => {
    const nueva = new Date(fechaActual);
    nueva.setDate(nueva.getDate() - 1);
    setFechaActual(nueva);
  };

  const irAlDiaSiguiente = () => {
    const nueva = new Date(fechaActual);
    nueva.setDate(nueva.getDate() + 1);
    setFechaActual(nueva);
  };

  const fechas = () => {
    const hoy = fechaActual;

    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);

    const maniana = new Date(hoy);
    maniana.setDate(hoy.getDate() + 1);

    return { hoy, ayer, maniana };
  };

  return {
    fechas,
    fechaActual,
    irAlDiaAnterior,
    irAlDiaSiguiente,
  };
};