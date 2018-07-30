import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query } from './Query';
import { Artists } from './Artists';

export default class Main extends React.Component {
    state = {
        artistsByName: 'Xul Zolar',
    };

    render() {
        const { artistsByName = '' } = this.state;

        return (
            <View style={styles.container}>
                <Query onChangeText={this.updateQueryArtist} value={artistsByName} />
                {!!artistsByName && <ArtistsWithData byName={artistsByName} />}
                {!artistsByName && <Text>Just search for something...</Text>}
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

const ArtistsWithData = graphql(ArtistsQuery, config)(Artists);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        alignItems: 'stretch',
        paddingTop: 50,
    },
});
