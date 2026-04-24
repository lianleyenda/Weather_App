import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const LayoutParaLaPantallaPrincipalDelClima = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {children}
    </SafeAreaView>
  );
};

export default LayoutParaLaPantallaPrincipalDelClima;
