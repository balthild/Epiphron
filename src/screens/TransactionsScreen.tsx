import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { Centering } from '@/components/Centering';

export function TransactionsScreen() {
  return (
    <Centering>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </Centering>
  );
}
