import { View, Text, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import TheBatman from "./../images/TheBatman.jpg";
import { useNavigation } from '@react-navigation/native';
import { image_185, image_blank } from '../api/Api';
const { width, height } = Dimensions.get("window");
export default function List({ title, data }) {
    const navigation = useNavigation()
    let movieName = 'The Batman'
    return (
        <View className='mb-8 space-y-4'>
            <View className='mx-4'>
                <Text className='text-white text-xl'>{title}</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    data.map((item, index) => {
                        // console.log(item.poster_path)
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', { item })}>
                                <View className='space-y-1 mr-4'>
                                    <Image
                                        // source={TheBatman}
                                        source={item.poster_path
                                            ? { uri: image_185(item.poster_path) || image_blank }
                                            : image_blank}
                                        style={{
                                            height: height * 0.2,
                                            width: width * 0.3
                                        }}
                                        className='rounded-3xl' />
                                    <Text className='text-neutral-300 ml-1 text-center'>
                                        {
                                            // movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}