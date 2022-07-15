import React, { Fragment } from 'react'
import "../Rows/Rows.css"
import YouTube from 'react-youtube'
import {AiOutlineCloseCircle,AiOutlineHeart, AiTwotoneHeart} from "react-icons/ai"
import { useState } from 'react'
import { AllContext } from "../../Context/Context"
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase_Configue'

const Rows = ({movies, title}) => {
  const [embed, setEmbed] = useState([])
  const [video, setVideo] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user } = AllContext()


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
    const saveShow = async (movie) =>{
       if(user?.email){
        setSaved(true)
        alert("Added to favourites...")
       await updateDoc(doc( db, "users", user?.email), {
         savedMovie : arrayUnion({
           id : movie.id,
           img: movie.backdrop_path,
           title : movie.original_title
         })
       })
       }else{
        alert("Please login to save movies...")
       }
    }

  
  // console.log(embed);

  return (
    <>
      <h2>{title}</h2>
     <div className='cards'>
      {movies?.map((movie, index) => {
        return (
             <Fragment>
              <div key={index} className="container" onClick={() => getMovies(movie.id)}>
              <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` :`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
              <div className="overlay">
                  {/* <AiTwotoneHeart /> */}
                 <span onClick={()=> saveShow(movie)}>
                  <AiOutlineHeart/> 
                  </span>
                <p>{movie.original_title}</p>
                </div>
              </div>
              </Fragment>
          )
        })}
     </div>
          {
            video ? (
              <div className='video'>
              <YouTube
               videoId={embed[0].key}
              />
              <AiOutlineCloseCircle onClick={() => setVideo(false)}/>
              </div>
            ) : (
              null
            )
          }
        </>
  )
}

export default Rows
