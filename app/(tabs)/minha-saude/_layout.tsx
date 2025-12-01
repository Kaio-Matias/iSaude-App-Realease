import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MeusAgendamentos" options={{ title: 'Meus Agendamentos' }} />
      <Stack.Screen name="informacoes" options={{ title: 'Informações de Saúde' }} />
      <Stack.Screen name="resultado" options={{ title: 'Resultados de Exames' }} />
    </Stack>
  );
}