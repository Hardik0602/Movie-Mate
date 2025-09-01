import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Trending from '../components/Trending';
import List from '../components/List';
import { TouchableOpacity } from 'react-native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/Api';
export default function Home({ navigation }) {
    const insets = useSafeAreaInsets()
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        // console.log(data)
        if (data && data.results) {
            setTrending(data.results)
            setLoading(false)
        }
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        // console.log(data)
        if (data && data.results) {
            setUpcoming(data.results)
            setLoading(false)
        }
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        // console.log(data)
        if (data && data.results) {
            setTopRated(data.results)
            setLoading(false)
        }
    }
    return (
        <View className='flex-1 bg-neutral-800' style={{ paddingTop: insets.top }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View className='flex-row mx-4 items-center justify-between'>
                <MagnifyingGlassIcon size={30} strokeWidth={2} color={'transparent'} />
                <Text className='text-3xl font-bold text-white'><Text className='text-[#eab308]'>M</Text>ovies</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
                </TouchableOpacity>
            </View>
            {loading
                ? <Loading />
                : <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}>
                    {trending.length > 0 && <Trending data={trending} />}
                    {upcoming.length > 0 && <List title='Upcoming' data={upcoming} />}
                    {topRated.length > 0 && <List title='Top Rated' data={topRated} />}
                </ScrollView>}
        </View>
    )
}