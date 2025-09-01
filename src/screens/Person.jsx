import { View, Text, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import robertPattison from './../images/robertPattinson.jpg'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import Loading from '../components/Loading'
import List from '../components/List'
import { useRoute } from '@react-navigation/native'
import { fetchPersonDetails, fetchPersonMovies, image_342, image_blank } from '../api/Api'
const { width, height } = Dimensions.get("window");
export default function Person({ navigation }) {
    const { params: person } = useRoute()
    const insets = useSafeAreaInsets()
    const [favorite, setFavorite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [personData, setPersonData] = useState([])
    useEffect(() => {
        // console.log(person)
        getPersonDeatils(person.id)
        getPersonMovies(person.id)
    }, [person])
    const getPersonDeatils = async (id) => {
        const data = await fetchPersonDetails(id)
        // console.log(data)
        if (data) {
            setPersonData(data)
        }
        setLoading(false)
    }
    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id)
        // console.log(data)
        if (data && data.cast) {
            setPersonMovies(data.cast)
        }
        setLoading(false)
    }
    return (
        <ScrollView
            className='flex-1 bg-neutral-800'
            contentContainerStyle={{ paddingBottom: 20 }}>
            <View
                style={{ paddingTop: insets.top }}
                className='z-10 w-full flex-row items-center justify-between px-4'>
                <TouchableOpacity
                    className='rounded-xl p-1 bg-[#eab308]'
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                    className='rounded-xl p-1'
                    onPress={() => setFavorite(!favorite)}>
                    <HeartIcon size={35} strokeWidth={2.5} color={favorite ? '#eab308' : 'white'} />
                </TouchableOpacity>
            </View>
            {
                loading
                    ? <Loading />
                    : <View>
                        <View className='items-center'>
                            <View className='items-center h-72 w-72 overflow-hidden rounded-full border border-neutral-500'>
                                <Image
                                    // source={robertPattison}
                                    source={personData?.profile_path
                                        ? { uri: image_342(personData?.profile_path) }
                                        : image_blank}
                                    style={{
                                        height: height * 0.35,
                                        width: width * 0.7
                                    }}
                                    resizeMode='cover' />
                            </View>
                        </View>
                        <View className='mt-6'>
                            {/* <Text className='text-3xl text-white font-bold text-center'>Robert Pattinson</Text> */}
                            <Text className='text-3xl text-white font-bold text-center'>{personData?.name}</Text>
                            {/* <Text className='text-base text-neutral-500 font-bold text-center'>London, United Kingdom</Text> */}
                            <Text className='text-base text-neutral-500 font-bold text-center'>{personData?.place_of_birth}</Text>
                        </View>
                        <View className='mt-6 p-4 mx-3 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Gender</Text>
                                {/* <Text className='text-neutral-300 text-sm'>Male</Text> */}
                                <Text className='text-neutral-300 text-sm'>{personData?.gender == 1 ? 'Female' : 'Male'}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Birthday</Text>
                                {/* <Text className='text-neutral-300 text-sm'>13-05-1986</Text> */}
                                <Text className='text-neutral-300 text-sm'>{personData?.birthday}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Known for</Text>
                                {/* <Text className='text-neutral-300 text-sm'>Acting</Text> */}
                                <Text className='text-neutral-300 text-sm'>{personData?.known_for_department}</Text>
                            </View>
                            <View className='px-2 items-center'>
                                <Text className='text-white font-semibold'>Populairty</Text>
                                {/* <Text className='text-neutral-300 text-sm'>315,000</Text> */}
                                <Text className='text-neutral-300 text-sm'>{personData?.popularity?.toFixed(2)}%</Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            <Text className='text-white text-lg'>Biography</Text>
                            {/* <Text className='text-neutral-400 text-base text-justify'>Robert Douglas Thomas
                                Pattinson was born May 13, 1986 in London, England, to
                                Richard Pattinson, a car dealer importing vintage cars,
                                and Clare Pattinson (née Charlton), who worked as a booker
                                at a model agency. He grew up in Barnes, southwest London
                                with two older sisters. Robert discovered his love for music
                                long before acting and started learning the guitar and piano
                                at the age of four. He became a big cinephile for love of auteur
                                cinema in his early teens and preferred to watch films rather than
                                doing his homework. In his late teens and early twenties, he used to
                                perform solo acoustic guitar gigs at open mic nights in bars and pubs
                                around London where he sung his own written songs. Thinking about becoming
                                a musician or going to university to study speech-writing, he never thought
                                about pursuing an acting career and his drama teacher in school even advised
                                him not to join the drama club because she thought he wasn't made for the
                                creative subjects. But as a teenager, he joined the local amateur theatre club
                                after his father convinced him to attend because he was quite shy. At age 15
                                and after two years of working backstage, he auditioned for the play 'Guys and
                                Dolls' and he got his first role as a Cuban dancer with no lines. He got the lead
                                part in the next play 'Our Town', was spotted by a talent agent who was sitting in
                                the audience and he began looking for professional roles.</Text> */}
                                <Text className='text-neutral-400 text-base text-justify'>{personData?.biography || 'N/A'}</Text>
                        </View>
                        <List title={'Movies'} data={personMovies} />
                    </View>
            }
        </ScrollView>
    )
}