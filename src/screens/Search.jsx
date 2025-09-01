import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useCallback, useState } from 'react'
import TheBatman from "./../images/TheBatman.jpg";
import { XMarkIcon } from 'react-native-heroicons/outline';
import loadingImg from './../images/loading.png'
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { image_185, image_blank, searchMovies } from '../api/Api';
const { width, height } = Dimensions.get("window");
export default function Search({ navigation }) {
    const insets = useSafeAreaInsets()
    const [results, setResults] = useState([])
    let movieName = 'The Batman'
    const [loading, setLoading] = useState(false)
    const handleSearch = name => {
        // console.log(name)
        if (name && name.length > 2) {
            setLoading(true)
            searchMovies({
                query: name,
                include_adult: 'true',
                language: 'en-US',
                page: '1'
            }).then(data => {
                // console.log(data)
                if (data && data.results) {
                    setResults(data.results)
                }
                setLoading(false)
            })
        } else {
            setResults([])
            setLoading(false)
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200, []))
    return (
        <View
            style={{ paddingTop: insets.top }}
            className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='py-1 pl-6 flex-1 font-semibold text-base text-white' />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className='rounded-full p-3 m-1 bg-neutral-500'>
                    <XMarkIcon size={25} color={'white'} />
                </TouchableOpacity>
            </View>
            {
                loading
                    ? <Loading />
                    : (
                        results.length > 0
                            ? <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                                className='space-y-3'>
                                <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
                                <View className='flex-row justify-between flex-wrap'>
                                    {
                                        results.map((movie, index) => {
                                            return (
                                                <View>
                                                    <TouchableWithoutFeedback
                                                        key={index}
                                                        onPress={() => navigation.push('Movie', { item: movie })}>
                                                        <View className='space-y-2 mb-4'>
                                                            <Image
                                                                className='rounded-3xl'
                                                                // source={TheBatman}
                                                                source={movie?.poster_path
                                                                    ? { uri: image_185(movie?.poster_path) }
                                                                    : image_blank}
                                                                style={{
                                                                    height: height * 0.3,
                                                                    width: width * 0.4
                                                                }} />
                                                            <Text className='text-neutral-300 ml-1 text-center'>
                                                                {
                                                                    // movieName.length > 19 ? movieName.slice(0, 19) + '...' : movieName
                                                                    movie?.title.length > 19 ? movie?.title.slice(0, 19) + '...' : movie?.title
                                                                }
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                            : <View className='items-center justify-center flex-1'>
                                <Image
                                    source={loadingImg}
                                    className='h-80 w-80' />
                            </View>
                    )
            }
        </View>
    )
}