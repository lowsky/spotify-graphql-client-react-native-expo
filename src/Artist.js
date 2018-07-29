import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const Artist = ({ name, image, albums }) => (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
        {false && (
            <View style={{ alignContent: 'flex-start', flexDirection: 'row' }}>
                <View style={{ flex: 0 }}>
                    {!!image && <Image source={{ uri: image }} style={styles.artistImage} />}
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text>Artist:</Text>
                    <Text>{name}</Text>
                    <Text>Albums: &nbsp;{albums && albums.length}</Text>
                </View>
            </View>
        )}
        {albums.map(album => <AlbumInfo key={album.id} album={album} />)}
    </View>
);

const AlbumInfo = ({ album }) => (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 0 }}>
            {!!album.image && <Image source={{ uri: album.image }} style={styles.artistImage} />}
        </View>

        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text>{name}</Text>
            <Text>&nbsp;</Text>
            <Text>{album.name}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    artistImage: {
        height: 100,
        width: 100,
        margin: 10,
    },
});
