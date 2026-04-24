import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { View, Pressable } from 'react-native';

const NavParaDesplazarseEntreDias = ({
  hoy,
  maniana,
  ayer,
  irAlDiaAnterior,
  irAlDiaSiguiente,
}: {
  hoy: Date;
  maniana: Date;
  ayer: Date;
  irAlDiaAnterior: () => void;
  irAlDiaSiguiente: () => void;
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
      <Pressable
      testID='boton-anterior'
        onPress={irAlDiaAnterior}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <Icon as={ChevronLeft} color="black" />
        <Text style={{ color: 'black', opacity: 0.6 }}>
          {formatearFecha(ayer)}
        </Text>
      </Pressable>

      <View>
        <Text testID='fecha-hoy' style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
          {formatearFecha(hoy)}
        </Text>
      </View>

      <Pressable
        testID='boton-siguiente'
        onPress={irAlDiaSiguiente}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <Text style={{ color: 'black', opacity: 0.6 }}>
          {formatearFecha(maniana)}
        </Text>
        <Icon as={ChevronRight} color="black" />
      </Pressable>
    </View>
  );
};

const formatearFecha = (fecha: Date) => {
  const fecha_con_formato = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });

  return fecha_con_formato.replace(`/${fecha.getFullYear()}`, '');
};

export default NavParaDesplazarseEntreDias;