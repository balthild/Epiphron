import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { Centering } from '@/components/Centering';

export function TodoScreen() {
  const route = useRoute();

  return (
    <Centering>
      <StatusBar style="auto" />
      <Text>TODO: {route.name}</Text>
    </Centering>
  );
}
