import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Trending from '../components/Trending';
import List from '../components/List';
export default function Home() {
    const insets = useSafeAreaInsets()
    const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6])
    const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6])
    const [topRated, setTopRated] = useState([1, 2, 3, 4, 5, 6])
    return (
        <View className='flex-1 bg-neutral-800' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View className='flex-row mx-4 items-center justify-between'>
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
                <Text className='text-3xl font-bold text-white'><Text className='text-[#eab308]'>M</Text>ovies</Text>
                <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}>
                <Trending data={trending} />
                <List title='Upcoming' data={upcoming} />
                <List title='Top Rated' data={topRated} />
            </ScrollView>
        </View>
    )
}