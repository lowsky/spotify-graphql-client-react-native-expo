import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Query />
                <Artists />
            </View>
        );
    }
}

const Query = () => <TextInput placeholder="search for artist" />;

const Artists = () => (
    <ScrollView style={styles.artists}>
        <Text>Artists...</Text>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        alignItems: 'stretch',
        paddingTop: 20,
    },
    artists: {
        backgroundColor: 'white',
    },
});
