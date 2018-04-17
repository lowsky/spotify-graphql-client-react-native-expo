import { SearchBar } from 'react-native-elements';
import React from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, Text, View, ScrollView } from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

let artistsList = [
    {
        name: 'Marilyn Manson',
        id: 1,
    },
];

export default class App extends React.Component {
    state = {
        artists: artistsList,
        artistsByName: 'Marilyn Manson',
    };

    render() {
        return (
            <View style={styles.container}>
                <Query onChangeText={this.updateQueryArtist} value={this.state.artistsByName} />
                {!!this.state.artistsByName && <Artists byName={this.state.artistsByName} />}
                {!this.state.artistsByName && <Text>Just search for something</Text>}
            </View>
        );
    }

    updateQueryArtist = (artistsName = '') => {
        this.setState({
            ...this.state,
            artists: artistsList,
            artistsByName: artistsName,
        });
    };
}

const Query = ({ onChangeText, value = '' }) => (
    <SearchBar
        value={value}
        clearIcon={{ color: '#86939e', name: 'close' }}
        icon={{ color: '#86939e', name: 'search' }}
        round
        lightTheme
        onChangeText={onChangeText}
        onClearText={onChangeText}
        placeholder="Type artists name ..."
    />
);

const ArtistsBase = ({ data = {} }) => {
    let { artists = [], loading, error } = data;

    //loading = true;
    if (loading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>{'' + error}</Text>;
    }
    return (
        <ScrollView>
            <View>
                <FlatList
                    data={artists}
                    keyExtractor={artist => artist.id}
                    renderItem={({ item }) => (
                        <Artist key={item.id} {...item} />
                    )}
                />
            </View>
        </ScrollView>
    );
};

const ArtistsQuery = gql`
    query artists($byName: String!) {
        artists: queryArtists(byName: $byName) {
            name
            image
            id
            albums {
                name
            }
        }
    }
`;

let config = {
    options: ({ byName }) => ({
        variables: {
            byName,
        },
        pollInterval: 60 * 1000,
    }),
};

const Artists = graphql(ArtistsQuery, config)(ArtistsBase);

const Artist = ({ name, image, albums }) => (
    <View>
        <Text>{name}</Text>
        <Text>
            Albums:
            {albums && albums.length}
        </Text>
        {!!image && <Image source={{ uri: image }} style={styles.artistImage} />}
    </View>
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
    artist: {},
    artistImage: {
        height: 100,
        width: 100,
        margin: 10,
    },
});
