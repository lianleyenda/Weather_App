import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/lib/theme';
import { PropsWithChildren } from 'react';




export default function provedorDeTemasClarosoOscuros({children}: PropsWithChildren) {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeProvider>
  );
}


