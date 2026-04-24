import { fireEvent, render } from '@testing-library/react-native';
import NavParaDesplazarseEntreDias from '@/src/dias';

describe('yo como usuario quiero ver que se pueda mover entre días', () => {
test('Permite navegar al día anterior y siguiente', () => {
  const irAlDiaAnterior = jest.fn();
  const irAlDiaSiguiente = jest.fn();

  const hoy = new Date('september 21, 2025');
  const ayer = new Date('september 20, 2025');
  const maniana = new Date('september 22, 2025');

  const screen = render(
    <NavParaDesplazarseEntreDias
      hoy={hoy}
      maniana={maniana}
      ayer={ayer}
      irAlDiaAnterior={irAlDiaAnterior}
      irAlDiaSiguiente={irAlDiaSiguiente}
    />
  );

  fireEvent.press(screen.getByTestId('boton-anterior'));
  expect(irAlDiaAnterior).toHaveBeenCalled();

  fireEvent.press(screen.getByTestId('boton-siguiente'));
  expect(irAlDiaSiguiente).toHaveBeenCalled();
});
});