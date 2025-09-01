import { View, Text, StatusBar, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TheBatman from "./../images/TheBatman.jpg";
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import List from '../components/List';
import Loading from '../components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovie, image_500, image_blank } from '../api/Api';
const { width, height } = Dimensions.get("window");
export default function Movie() {
  const { params: { item } } = useRoute()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [favorite, setFavorite] = useState(false)
  let movieName = 'The Batman'
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState([])
  useEffect(() => {
    // console.log(item.id)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item])
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    // console.log(data)
    if (data) {
      setMovie(data)
    }
    setLoading(false)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    // console.log(data)
    if (data && data.cast) {
      setCast(data.cast)
    }
    setLoading(false)
  }
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovie(id)
    // console.log(data)
    if (data && data.results) {
      setSimilar(data.results)
    }
    setLoading(false)
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
      <View className='w-full'>
        <View
          style={{ paddingTop: insets.top }}
          className='absolute z-10 w-full flex-row items-center justify-between px-4'>
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
              <Image
                // source={TheBatman}
                source={movie?.poster_path
                  ? { uri: image_500(movie?.poster_path) }
                  : image_blank}
                style={{
                  height: height * 0.65,
                  width: width
                }}
                resizeMode='cover' />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{
                  width: width,
                  height: height * 0.4,
                  position: 'absolute',
                  bottom: 0
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }} />
            </View>
        }
      </View>
      {
        loading
          ? null
          : <>
            <View
              style={{ marginTop: -height * 0.1 }}
              className='space-y-3'>
              {/* <Text className='text-white text-center text-3xl font-bold'>{movieName}</Text> */}
              <Text className='text-white text-center text-3xl font-bold'>{movie?.title}</Text>
              {/* <Text className='text-neutral-400 font-semibold text-center text-base'>2022 • PG-15 • 2h 56m</Text> */}
              <Text className='text-neutral-400 font-semibold text-center text-base'>{movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min</Text>
              <View className='flex-row justify-center mx-4 space-x-2'>
                {/* <Text className='text-neutral-400 font-semibold text-base text-center'>Action</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>•</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>Crime</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>•</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>Drama</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>•</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>Thriller</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>•</Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>Mystery</Text> */}
                {
                  movie?.genres?.map((genre, index) => {
                    let showDot = index + 1 != movie.genres.length
                    return (
                      <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>{genre?.name}  {showDot ? '•' : null}</Text>
                    )
                  })
                }
              </View>
              <Text className='text-neutral-400 mx-4 text-center text-base font-semibold'>
                {/* When a sadistic serial killer begins murdering key political figures in Gotham,
                the Batman is forced to investigate the city's hidden corruption and question his
                family's involvement. */}
                {movie?.overview}
              </Text>
            </View>
            {cast.length > 0 && <Cast cast={cast} />}
            {similar.length > 0 && <List title={'Similar Movies'} data={similar} />}
          </>
      }
    </ScrollView>
  )
}