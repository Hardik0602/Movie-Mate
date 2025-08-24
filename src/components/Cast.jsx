import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import robertPattison from './../images/robertPattinson.jpg'
import { useNavigation } from '@react-navigation/native'
export default function Cast({ cast }) {
    let castName = 'Robert Pattinson'
    let characterName = 'Bruce Wayne'
    let navigation = useNavigation()
    return (
        <View className='my-6'>
            <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Person', person)}
                                key={index}
                                className='mr-4 items-center'>
                                <View className='rounded-full h-24 w-24 items-center overflow-hidden border border-neutral-500'>
                                    <Image
                                        source={robertPattison}
                                        className='rounded-2xl h-24 w-20'
                                        resizeMode='cover' />
                                </View>
                                <Text className='text-white text-xs mt-1'>{
                                    characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                                }</Text>
                                <Text className='text-neutral-400 text-xs mt-1'>{
                                    castName.length > 10 ? castName.slice(0, 10) + '...' : castName
                                }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}