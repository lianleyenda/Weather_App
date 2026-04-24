import usarPronosticoClimatico from '@/src/clima/hooks';
import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavParaDesplazarseEntreDias from '@/src/dias';
import { usarFechas } from '@/src/dias/hooks';
import usarLocalizacion from '@/src/localizacion';
import { View, Text } from 'react-native';
import IconosClima from '@/src/iconos';
import { Droplets, Wind, Gauge } from 'lucide-react-native';

export default function Index() {
  const { fechas, irAlDiaAnterior, irAlDiaSiguiente, fechaActual } = usarFechas();
  const { coordenadas, coordenadasDisponibles } = usarLocalizacion();

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  if (!API_KEY) {
    return <Text style={{ color: "black" }}>Falta API KEY</Text>;
  }

  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias
        {...fechas()}
        irAlDiaAnterior={irAlDiaAnterior}
        irAlDiaSiguiente={irAlDiaSiguiente}
      />

      <View testID='localizacion' style={{ flex: 1 }}>
        {!coordenadasDisponibles() ? (
          <Text style={{ color: "black", textAlign: "center" }}>
            Obteniendo ubicación...
          </Text>
        ) : (
          <TarjetaParaDatosClimaticos
            fecha={fechaActual}
            latitud={coordenadas().latitud}
            longitud={coordenadas().longitud}
            clave_de_api={API_KEY}
          />
        )}
      </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
}

const TarjetaParaDatosClimaticos = (
  props: Parameters<typeof usarPronosticoClimatico>[0]
) => {
  const {
    ciudad,
    temperaturaEnGradosCelsius,
    estaPendiente,
    huboUnProblema,
    condicionClimatica,
    humedadEnPorcentaje,
    presionEnHectopascales,
    velocidadDelVientoEnKilometrosPorHora,
    temperaturaMaximaEnGradosCelsius,
    temperaturaMinimaEnGradosCelsius,
  } = usarPronosticoClimatico(props);

  if (estaPendiente()) {
    return <Text style={{ color: "black" }}>Cargando clima...</Text>;
  }

  if (huboUnProblema()) {
    return <Text style={{ color: "black" }}>Error al cargar clima</Text>;
  }


 return (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", paddingVertical: 20 }}>
    
    <Text testID='Nombre-Ciudad' style={{ color: "black", fontSize: 22, fontWeight: "bold", letterSpacing: 2 }}>
      {ciudad().toUpperCase()}
    </Text>

    {/* Ícono */}
    <IconosClima  condicion={condicionClimatica()} size={180} />


    <View style={{ gap: 10, alignSelf: "flex-start", paddingLeft: 30 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Droplets size={18} color="black" />
        <Text style={{ color: "black", fontSize: 14 }}>{humedadEnPorcentaje()}%</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Gauge size={18} color="black" />
        <Text style={{ color: "black", fontSize: 14 }}>{presionEnHectopascales()} hPa</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Wind size={18} color="black" />
        <Text style={{ color: "black", fontSize: 14 }}>{velocidadDelVientoEnKilometrosPorHora()} km/h</Text>
      </View>
    </View>

<View style={{ alignItems: "center" }}>
  <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 12 }}>
    <Text testID='temperatura-min' style={{ color: "black", opacity: 0.6, fontSize: 20, marginBottom: 6 }}>
      {temperaturaMinimaEnGradosCelsius()}°
    </Text>
    <Text testID='temperatura' style={{ color: "black", fontSize: 50, fontWeight: "bold" }}>
      {temperaturaEnGradosCelsius()}°C
    </Text>
    <Text testID='temperatura-max' style={{ color: "black", opacity: 0.6, fontSize: 20, marginBottom: 6 }}>
      {temperaturaMaximaEnGradosCelsius()}°
    </Text>
  </View>

  <View style={{ flexDirection: "row", alignItems: "center", width: 200, marginTop: 10 }}>
    <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    <Text style={{ color: "black", fontSize: 12, marginHorizontal: 8, letterSpacing: 1 }}>
      ACTUAL
    </Text>
    <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
  </View>
</View>
</View>

);
};