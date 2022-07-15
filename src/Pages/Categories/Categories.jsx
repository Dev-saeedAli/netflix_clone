import React from 'react'
import "../Categories/Categories.css"
import Rows from '../Rows/Rows'
import { AllContext } from "../../Context/Context"
const Categories = () => {
  const { popular, topRated, upcoming, trending, recommedation } = AllContext()

  return (
    <div className='allCards'>
      <Rows title="Upcoming" movies={upcoming}/>
      <Rows title="Top-Rated" movies={topRated}/>
      <Rows title="Popular" movies={popular}/>
      <Rows title="Recommendation" movies={recommedation}/>
      <Rows title="Trending" movies={trending}/>
    </div>
  )
}

export default Categories
