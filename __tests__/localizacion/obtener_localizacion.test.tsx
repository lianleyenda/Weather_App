import { render, screen } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/app/index';

process.env.EXPO_PUBLIC_API_KEY = 'fake-key';


jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(async () => ({ coords: { latitude: 10, longitude: 20 } })),
}));

jest.mock('@/src/localizacion');
import usarLocalizacion from '@/src/localizacion';

// 👇 Helper para no repetir el wrapper en cada test
const renderConQueryClient = (componente: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // 👈 evita reintentos en tests
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      {componente}
    </QueryClientProvider>
  );
};

describe('Yo como usuario quiero visualizar los datos del clima de la fecha para saber vestirme', () => {

  test('Muestra mensaje de carga cuando no hay localizacion', () => {
    (usarLocalizacion as jest.Mock).mockReturnValue({
      coordenadas: () => ({ latitud: 0, longitud: 0 }),
      coordenadasDisponibles: () => false,
    });

    renderConQueryClient(<Index />);

    expect(screen.getByTestId('localizacion')).toBeTruthy();
    expect(screen.getByText('Obteniendo ubicación...')).toBeTruthy();
  });

  test('Oculta el mensaje cuando ya tiene localizacion', () => {
    (usarLocalizacion as jest.Mock).mockReturnValue({
      coordenadas: () => ({ latitud: 10, longitud: 20 }),
      coordenadasDisponibles: () => true,
    });

    renderConQueryClient(<Index />);

    expect(screen.getByTestId('localizacion')).toBeTruthy();
    expect(screen.queryByText('Obteniendo ubicación...')).toBeNull();
  });
});