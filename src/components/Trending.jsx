import React from "react";
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import TheBatman from "./../images/TheBatman.jpg";
import Carousel from "react-native-snap-carousel";
const { width, height } = Dimensions.get("window");
export default function Trending({ data }) {
    return (
        <View>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{
                    alignItems: 'center',
                    display: 'flex'
                }} />
        </View>
    );
}
const MovieCard = ({ item }) => {
    return (
        <TouchableWithoutFeedback>
            <Image
                source={TheBatman}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className='rounded-3xl' />
        </TouchableWithoutFeedback>
    )
}