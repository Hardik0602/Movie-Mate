import axios from "axios";
import blank from '../images/blank.jpg'
// const API_KEY = 'your_tmdb_api_key_here'
const API_KEY = 'ae5f1f25dc3d53c9e82db3843ee2b2a3'
const API_BASE = 'https://api.themoviedb.org/3/'
const trendingMoviesEndpoint = `${API_BASE}trending/movie/day?api_key=${API_KEY}`
const upcomingMoviesEndpoint = `${API_BASE}movie/upcoming?api_key=${API_KEY}`
const topRatedMoviesEndpoint = `${API_BASE}movie/top_rated?api_key=${API_KEY}`
export const image_500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image_342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image_185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null
export const image_blank=blank
const apiCall = async (endpoint, parms) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: parms ? parms : {}
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
}
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}