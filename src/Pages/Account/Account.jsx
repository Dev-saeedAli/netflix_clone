import React, {useState, useEffect} from 'react'
import "../Account/Account.css"
import { AllContext } from '../../Context/Context'
import {doc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase_Configue'
import {AiOutlineClose, AiOutlineCloseCircle} from "react-icons/ai"
import YouTube from 'react-youtube'

const Account = () => {
  const { user } = AllContext()
  const [embed, setEmbed] = useState([])
  const [video, setVideo] = useState(false)
  let [saved, setSaved] = useState([])
  const movieRef = doc(db, "users", user?.email)
  
  useEffect(()=>{
    onSnapshot(doc(db, "users", `${user?.email}`) , (doc) => {
      setSaved(doc.data()?.savedMovie)
    })
  }, [user?.email])
  
  const updateList = async (id) =>{
    let updatedMovies = saved.filter(list => list.id !== id)
     await updateDoc(movieRef, {
      savedMovie : updatedMovies,
    })
  }

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

  // console.log(savedMovie);

  return (
    <div className='account-screen'>
        <div className="bg">
          <h2>Favourites</h2>
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
        {
        saved.map(movie =>{
          return(
            <div key={movie.id} className='lists' onClick={()=> getMovies(movie.id)}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt="" />
                   <p>{movie.title}</p>
          
                  <div className="overlay">
                   <span onClick={()=> updateList(movie.id)}><AiOutlineClose/></span>
                  </div>
            </div>
            
          )
        })
      }
    </div>
   
  )
}

export default Account
