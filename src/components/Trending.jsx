import React from "react";
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import TheBatman from "./../images/TheBatman.jpg";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image_500, image_blank } from "../api/Api";
const { width, height } = Dimensions.get("window");
export default function Trending({ data }) {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.navigate('Movie', { item })
    }
    return (
        <View className='my-5'>
            <Text className='text-white text-xl mx-4 mb-4'>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{
                    alignItems: 'center',
                    display: 'flex'
                }} />
        </View>
    );
}
const MovieCard = ({ item, handleClick }) => {
    // console.log(item.poster_path)
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={TheBatman}
                source={item.poster_path
                    ? { uri: image_500(item.poster_path) }
                    : image_blank}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className='rounded-3xl' />
        </TouchableWithoutFeedback>
    )
}