import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
const { width, height } = Dimensions.get("window")
export default function Loading() {
    return (
        <View
            style={{
                height: height,
                width: width
            }}
            className='absolute flex-1 justify-center items-center'>
            <Progress.CircleSnail thickness={12} size={160} color={'#eab308'} />
        </View>
    )
}