import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, ListView, FlatList} from 'react-native';


export default class App extends React.Component {

    state = {
        artistsName : ''
    };

    render() {
        return (
            <View style={styles.container}>
                <Query onChangeText={this.updateQueryArtist.bind(this)} />
                <Artists text={this.state.artistsName} />
            </View>
        );
    }
    updateQueryArtist (artistsName) {
        this.setState({
            ...this.state,
            artistsName: artistsName
        });
    }
}


const Query = ({onChangeText}) => <TextInput
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        style={styles.query}
        keyboardType={'web-search'}
        returnKeyType={'search'}
        placeholder="search for artist"
    />;

const Artists = ({text}) => (
    <ScrollView style={styles.artists}>
        <Text>{`Artists:`}</Text>
        <Text>{`...${text}...`}</Text>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        alignItems: 'stretch',
        paddingTop: 20,
    },
    query: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        borderColor: '#1db853',
        fontSize: 24,
    },
    artists: {
        backgroundColor: 'white',
    },
});