import React, {useState} from 'react'
import Categories from '../Categories/Categories'
import "../Homescreen/Homescreen.css"
import { AllContext } from "../../Context/Context"
import YouTube from 'react-youtube'
import {AiOutlineCloseCircle} from "react-icons/ai"
import { useNavigate } from 'react-router'


const Homescreen = () => {
  const navigate = useNavigate()
  const [embed, setEmbed] = useState([])
  const [video, setVideo] = useState(false)

  const { randomBg } = AllContext()

  // console.log(randomBg);

  const getMovies = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    const data = await response.json()
    const filteredMovie = data?.results.filter(movie =>{
     return movie?.type == "Trailer" 
    })
    if(filteredMovie){
        setEmbed(filteredMovie)
        await setVideo(true)
    }else{
      alert("No movies found")
    }
  }
  return (
    <>
    <div className='hero' 
    style={{background : `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.9)), url("https://image.tmdb.org/t/p/original${randomBg?.backdrop_path ? randomBg?.backdrop_path : randomBg.poster_path}")`}} >

      <div className="movieInfo">
        <h2>{randomBg.original_title}</h2>
        <button className="btn-options" onClick={() => getMovies(randomBg.id)}>Play</button>
        <button className="btn-options" onClick={() => navigate('/account')}>My List</button>
        <p>{randomBg.overview?.substring(0,260)}...</p>
      </div>
    </div>
      {
            video ? (
              <div className='home-video'>
              <YouTube
               videoId={embed[0].key}
              />
              <AiOutlineCloseCircle onClick={() => setVideo(false)}/>
              </div>
            ) : (
              null
            )
          }
      <Categories/>
      </>
    
  )
}

export default Homescreen
