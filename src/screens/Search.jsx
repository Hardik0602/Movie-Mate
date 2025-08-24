import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import TheBatman from "./../images/TheBatman.jpg";
import { XMarkIcon } from 'react-native-heroicons/outline';
import loadingImg from './../images/loading.png'
import Loading from '../components/Loading';
const { width, height } = Dimensions.get("window");
export default function Search({ navigation }) {
    const insets = useSafeAreaInsets()
    const [results, setResults] = useState([1, 2, 3, 4, 5, 6])
    let movieName = 'The Batman'
    const [loading, setLoading] = useState(true)
    return (
        <View
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
            className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput
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
                                        results.map((item, index) => {
                                            return (
                                                <View>
                                                    <TouchableWithoutFeedback
                                                        key={index}
                                                        onPress={() => navigation.navigate('Movie', item)}>
                                                        <View className='space-y-2 mb-4'>
                                                            <Image
                                                                className='rounded-3xl'
                                                                source={TheBatman}
                                                                style={{
                                                                    height: height * 0.3,
                                                                    width: width * 0.4
                                                                }} />
                                                            <Text className='text-neutral-300 ml-1 text-center'>
                                                                {
                                                                    movieName.length > 19 ? movieName.slice(0, 19) + '...' : movieName
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