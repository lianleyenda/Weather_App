import { Color } from 'expo-router';
import { Sun , Cloud, CloudRain, CloudSnow } from 'lucide-react-native';

type Props = {
  condicion: string;
  size?: number;
};

const IconosClima = ({ condicion, size = 180, color = 'black' }: Props) => {
  const texto = condicion.toLowerCase();

  if (texto.includes('rain')) {
    return <CloudRain size={size} strokeWidth={1.5} color={color} />;
  }

  if (texto.includes('snow')) {
    return <CloudSnow size={size} strokeWidth={1.5} color={color} />;
  }

  if (texto.includes('cloud')) {
    return <Cloud size={size} strokeWidth={1.5} color={color} />;
  }

  return <Sun size={size} strokeWidth={1.5} color={color} />;
};

export default IconosClima;