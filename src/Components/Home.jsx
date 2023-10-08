/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import Search from './Search'
import Axios from 'axios'
import Player from './Player'
import Navbar from '../Components/Navbar';

import './Style.css'
function Home() {

  const [newTrendingSong, setNewTrendingSong] = useState([]) 
  const [newTrendingAlbum, setNewTrendingAlbum] = useState([]) 
  const [topPlaylist, setTopPlaylist] = useState([]) 
   
  useEffect(() => {
    Axios.get('https://saavn.me/modules?language=hindi,english')
    .then((res) =>{
      setNewTrendingSong(res.data.data.trending.songs)
      setNewTrendingAlbum(res.data.data.trending.albums)
        //setTopPlaylist(res.data.data.results.top_playlists)
      })
    }) 


   return (
     <>
     <Navbar />
          <br /> 
          <br /> 

     <Search />
     <br /> 
     <br /> 
     <br /> 

     <h4>New Trending</h4>
     <div className="newTrending">
      
      <div className="songs">
         <br />
       {newTrendingSong.map((data) =>{
         return(
          <img src={data.image[2].link} className="img-thumbnail" />
         )
       })}
      </div>
<br/>
<br />
  <h5>Albums</h5>

<div className="albums">

  <br />

  <br />

{newTrendingAlbum.map((data) =>{
         return(
          <img src={data.image[2].link} className="img-thumbnail" />
         )
       })
}
</div>
     </div>
     {/*
     <h4>Top-Playlists</h4>

     <div className="topPlaylist">
     {topPlaylist.map((data) =>{
         return(
          <img src={data.image} className="img-thumbnail" />
         )
       })
}
     </div>*/}
     </>
  )
}

export default Home

 
