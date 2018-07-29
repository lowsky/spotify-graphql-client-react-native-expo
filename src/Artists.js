import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';

import { Artist } from './Artist';

export function Artists({ data = {} }) {
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
                    renderItem={({ item }) => <Artist key={item.id} {...item} />}
                />
            </View>
        </ScrollView>
    );
}
