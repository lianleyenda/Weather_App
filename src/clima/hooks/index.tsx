import { useQuery } from '@tanstack/react-query';

export const usarPronosticoClimatico = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
}) => {
  
  const fechaFormateada = fecha.toISOString().split('T')[0]; // "2026-04-23"

const { isPending, isFetched, isError, error, data } = useQuery({
  queryKey: [fechaFormateada, latitud.toPrecision(2), longitud.toPrecision(2)],
  queryFn: async () => {
    const resultado = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&dt=${fechaFormateada}`
    );

    const data = await resultado.json();

    if (!resultado.ok || data.error) {
      throw new Error(data?.error?.message || 'Error al obtener clima');
    }

    return data;
  },
});
  const diaPronostico = () => data?.forecast?.forecastday?.[0]?.day;

return {
  estaPendiente: () => isPending,
  huboUnProblema: () => isError,
  consultaExitosa: () => isFetched,
  descripcionDelProblema: () => (isError ? (error as Error).message : ''),
  ciudad: () => data?.location?.name ?? '',
  condicionClimatica: () => diaPronostico()?.condition?.text ?? '',
  humedadEnPorcentaje: () => diaPronostico()?.avghumidity ?? 0,
  presionEnHectopascales: () => data?.forecast?.forecastday?.[0]?.hour?.[12]?.pressure_mb ?? 0,
  velocidadDelVientoEnKilometrosPorHora: () => diaPronostico()?.maxwind_kph ?? 0,
  temperaturaEnGradosCelsius: () => diaPronostico()?.avgtemp_c ?? 0,
  temperaturaMaximaEnGradosCelsius: () => diaPronostico()?.maxtemp_c ?? 0,
  temperaturaMinimaEnGradosCelsius: () => diaPronostico()?.mintemp_c ?? 0,
};
};

export default usarPronosticoClimatico;
