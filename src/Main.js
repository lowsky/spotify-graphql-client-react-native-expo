import { SearchBar } from 'react-native-elements';
import React from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, Text, View, ScrollView } from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class App extends React.Component {
    state = {
        artists: [],
        artistsByName: 'Xul Zolar',
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

    if (loading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>{'Error: ' + error}</Text>;
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
                id
                image
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

const Artist = ({ name, id, image, albums }) => (
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
      { false &&
      <View style={{alignContent: 'flex-start', flexDirection: 'row'}}>
        <View style={{flex: 0}}>
          {!!image && <Image source={{uri: image}} style={styles.artistImage}/>}
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text>Artist:</Text>
          <Text>{name}</Text>
          {<Text>Albums: &nbsp;{albums && albums.length}</Text>}
        </View>
      </View>
      }
      {
        albums.map(a => (
            <View key={a.id} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 0}}>
                {!!a.image && <Image source={{uri: a.image}} style={styles.artistImage}/>}
              </View>

              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text>{name}</Text>
                {<Text>&nbsp;</Text>}
                {<Text>{a.name}</Text>}
              </View>
            </View>
          )
        )
      }
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
