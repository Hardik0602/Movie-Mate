import axios from "axios";
import blank from '../images/blank.jpg'
const API_KEY = 'your_tmdb_api_key_here'
const API_BASE = 'https://api.themoviedb.org/3/'
const trendingMoviesEndpoint = `${API_BASE}trending/movie/day?api_key=${API_KEY}`
const upcomingMoviesEndpoint = `${API_BASE}movie/upcoming?api_key=${API_KEY}`
const topRatedMoviesEndpoint = `${API_BASE}movie/top_rated?api_key=${API_KEY}`
export const image_500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image_342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image_185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null
export const image_blank = blank
const movieDetailsEndpoint = id => `${API_BASE}movie/${id}?api_key=${API_KEY}`
const movieCreditsEndpoint = id => `${API_BASE}movie/${id}/credits?api_key=${API_KEY}`
const similarMovieEndpoint = id => `${API_BASE}movie/${id}/similar?api_key=${API_KEY}`
const personDetails = id => `${API_BASE}person/${id}?api_key=${API_KEY}`
const personMovies = id => `${API_BASE}person/${id}/movie_credits?api_key=${API_KEY}`
const searchMoviesEndpoint = `${API_BASE}search/movie?api_key=${API_KEY}`
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
export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovie = (id) => {
    return apiCall(similarMovieEndpoint(id))
}
export const fetchPersonDetails = (id) => {
    return apiCall(personDetails(id))
}
export const fetchPersonMovies = (id) => {
    return apiCall(personMovies(id))
}
export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params)
}