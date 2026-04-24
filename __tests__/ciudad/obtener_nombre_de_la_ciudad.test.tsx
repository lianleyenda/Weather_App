import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '@/app/index';
import usarLocalizacion from '@/src/localizacion';
import { usarFechas } from '@/src/dias/hooks';
import usarPronosticoClimatico from '@/src/clima/hooks';

jest.mock('@/src/localizacion');
jest.mock('@/src/dias/hooks');
jest.mock('@/src/clima/hooks');

process.env.EXPO_PUBLIC_API_KEY = 'fake-key';


beforeEach(() => {
  (usarLocalizacion as jest.Mock).mockReturnValue({
    coordenadas: () => ({ latitud: -34.6, longitud: -58.4 }),
    coordenadasDisponibles: () => true,
  });

  (usarFechas as jest.Mock).mockReturnValue({
    fechas: () => ({
      hoy: new Date(),
      ayer: new Date(),
      maniana: new Date(),
    }),
    irAlDiaAnterior: jest.fn(),
    irAlDiaSiguiente: jest.fn(),
    fechaActual: new Date(),
  });

  (usarPronosticoClimatico as jest.Mock).mockReturnValue({
    ciudad: () => 'Luis J. Garcia',
    temperaturaEnGradosCelsius: () => 25,
    estaPendiente: () => false,
    huboUnProblema: () => false,
    condicionClimatica: () => 'clear',
    humedadEnPorcentaje: () => 60,
    presionEnHectopascales: () => 1013,
    velocidadDelVientoEnKilometrosPorHora: () => 10,
    temperaturaMaximaEnGradosCelsius: () => 28,
    temperaturaMinimaEnGradosCelsius: () => 20,
  });
});

test('muestra el nombre de la ciudad', () => {
  const { getByTestId } = render(<Index />);

  const ciudad = getByTestId('Nombre-Ciudad').props.children;
  expect(['LUIS J. GARCIA', 'INGENIERO BUDGE']).toContain(ciudad);
});