import {Text , View , StyleSheet} from 'react-native';
import { Link} from 'expo-router';

export default function App(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>hellow ladybug</Text>
            <Link href="/about" style={styles.button}>
            Go to About Screen </Link>
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
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

