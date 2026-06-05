import { Text, View, StyleSheet } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Buttons';

const PlaceholderImage = require('@/assets/images/ladybug.jpeg');

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Ladybug 🐞</Text>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 20,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    marginTop: 20,
  },
});