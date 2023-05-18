import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-4xl font-bold text-zinc-100">
        Misael Lopes, brabo!
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
