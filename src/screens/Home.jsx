import React from 'react';
import { Button, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Home({ navigation }) {
    const insets = useSafeAreaInsets()
    return (
        <View className='flex-1 items-center justify-evenly' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <Text className='text-green-500 text-[50px]'>home</Text>
            <Button title='go to nothome' onPress={() => navigation.navigate('NotHome')} />
        </View>
    )
}