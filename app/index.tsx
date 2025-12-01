import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona imediatamente para o login ao abrir o app
  return <Redirect href="/login" />;
}