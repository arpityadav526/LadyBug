import { StyleSheet, Text, View } from 'react-native';

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the about page of the ladybug</Text>
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
        color: '#ffffff',
    },
});