import React from 'react';
import { SearchBar } from 'react-native-elements';

export const Query = ({ onChangeText, value = '' }) => (
    <SearchBar
        value={value}
        clearIcon={{ color: '#86939e', name: 'close' }}
        icon={{ color: '#86939e', name: 'search' }}
        round
        darkTheme
        onChangeText={onChangeText}
        onClearText={onChangeText}
        placeholder="Type artists name ..."
    />
);
