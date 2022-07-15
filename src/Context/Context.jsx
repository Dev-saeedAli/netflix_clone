import React , {createContext, useContext, useState} from 'react'
import { useEffect } from 'react'
import { db } from '../Firebase/Firebase_Configue'
import { auth } from '../Firebase/Firebase_Configue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AppContext = createContext(null)

export const MainContext = ({children}) => {
  const [user, setUser] = useState("")
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popular, setPopular] = useState([])
  const [trending, setTrending] = useState([])
  const [recommedation, setRecommendation] = useState([])
  const [randomBg , setRandomBg] = useState("")

  const getUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=`
  const getTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  const getTrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
  const getPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  const getRecommendation = `https://api.themoviedb.org/3/movie/100/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`

  const signup = async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password)
    if(email){
      await setDoc(doc(db, "users", email), {
        savedMovie : []
      })
  }
  }
  const signin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }
  const logout = () => {
    return  signOut(auth)
  }

    useEffect(()=> {

     const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser)
     })

      const allUpcoming = async () => {
          const response = await fetch(getUpcoming)
          const data = await  response.json()
          await setUpcoming(data.results)
          // console.log("upcoming" ,data.results);
        }
        const allTopRated = async () => {
          const response = await fetch(getTopRated)
          const data = await  response.json()
          await setTopRated(data.results)
          // console.log("toprated", data.results);
        }
        const allPopular = async () => {
          const response = await fetch(getPopular)
          const data = await  response.json()
          await setPopular(data.results)
          // console.log("popular",data.results);
        }
        const allTrending = async () => {
          const response = await fetch(getTrending)
          const data = await  response.json()
          await setTrending(data.results)
          await setRandomBg(data.results[Math.floor(Math.random()* data.results.length)])
          // console.log("trending",data.results);
        }
        const allRecommendation = async () => {
          const response = await fetch(getRecommendation)
          const data = await  response.json()
          await setRecommendation(data.results)
          // console.log("recommendation",data.results);
      }
      
      allUpcoming()
      allTopRated()
      allPopular()
      allTrending()
      allRecommendation()
      return () => {
        unsubscribe()
      }
    }, [])

  return (
    <AppContext.Provider value={{popular, topRated, upcoming, trending, recommedation, randomBg, signin, signup, logout, user}}>
      {children}
    </AppContext.Provider>
  )
}

export const AllContext = () => {
  return useContext(AppContext)
}