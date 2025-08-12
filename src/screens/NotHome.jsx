import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Home() {
    const insets = useSafeAreaInsets()
    return (
        <View className='flex-1' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <Text className='text-green-500 text-[50px]'> not home</Text>
        </View>
    )
}