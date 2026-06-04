import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function About() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={StyleSheet.flatten([styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }])}>
      <Text style={StyleSheet.flatten([styles.title, { color: isDark ? '#fff' : '#000' }])}>
        About LadyBug
      </Text>
      <Text style={StyleSheet.flatten([styles.description, { color: isDark ? '#ccc' : '#666' }])}>
        This is a simple app skeleton with routing built with Expo and Expo Router.
      </Text>
      
      <Pressable
        style={StyleSheet.flatten([styles.button, { backgroundColor: isDark ? '#333' : '#007AFF' }])}
        onPress={() => router.back()}
      >
        <Text style={StyleSheet.flatten([styles.buttonText, { color: isDark ? '#fff' : '#fff' }])}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
