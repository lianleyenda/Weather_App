import { render } from '@testing-library/react-native';
import Index from '@/app/index';

jest.mock('@/src/localizacion', () => ({
  __esModule: true,
  default: () => ({
    coordenadasDisponibles: () => true,
    coordenadas: () => ({
      latitud: -34.6,
      longitud: -58.4,
    }),
  }),
}));

jest.mock('@/src/dias/hooks', () => ({
  usarFechas: () => ({
    fechas: () => ({
      hoy: new Date(),
      ayer: new Date(),
      maniana: new Date(),
    }),
    irAlDiaAnterior: jest.fn(),
    irAlDiaSiguiente: jest.fn(),
    fechaActual: new Date(),
  }),
}));

jest.mock('@/src/clima/hooks', () => ({
  __esModule: true,
  default: () => ({
    ciudad: () => 'Buenos Aires',
    temperaturaEnGradosCelsius: () => 25,
    estaPendiente: () => false,
    huboUnProblema: () => false,
    condicionClimatica: () => 'clear',
    humedadEnPorcentaje: () => 60,
    presionEnHectopascales: () => 1013,
    velocidadDelVientoEnKilometrosPorHora: () => 10,
    temperaturaMaximaEnGradosCelsius: () => 30,
    temperaturaMinimaEnGradosCelsius: () => 20,
  }),
}));

process.env.EXPO_PUBLIC_API_KEY = 'fake-key';

describe('yo como usuario quiero ver la temperatura minima y maxima', () => {
  test('Muestra la temperatura minima y maxima en grados Celsius', () => {
    const screen = render(<Index />);

    expect(screen.getByTestId('temperatura-min')).toHaveTextContent('20°');
    expect(screen.getByTestId('temperatura-max')).toHaveTextContent('30°');
  });
});