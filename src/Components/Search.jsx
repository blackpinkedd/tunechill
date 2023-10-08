/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react'
import Axios from 'axios'
import Player from './Player'
import './Style.css'

const  Search = () => {
    const[query , setQuery] = useState('') //SEARCH QUERY
    const[songs, setSongs] = useState([])
    const[albums, setAlbums] = useState([])
    const[urlLoaded, setUrlLoaded] = useState('')
    const[respnse, setRespnse] = useState('')
    const[respnse2, setRespnse2] = useState('')
    const[topRes, setTopRes] = useState([])
    const[id, setId] = useState("")
    const[title, setTitle] = useState("")
    const[url, setUrl] = useState("")
    const[albumUrl, setAlbumUrl]= useState([])
    const [random, setRandom] = useState([]);

    const [queue, setQueue] = useState([]);
    var[sngOrAlb, setSngOrAlb] = useState('')


const q = (event) =>{
setQuery(event.target.value)
}


  const search = () =>{
//http://localhost:8080/api/info?query= 
//https://chillapi.herokuapp.com/api/info?query=bts
Axios.get(`https://saavn.me/search/albums?query=${query}`)
  .then((response) =>{
    if(response.data.data.total === 0){}
else
setRespnse2("Albums")

setAlbums(response.data.data.results)
    })

Axios.get(`https://saavn.me/search/songs?query=${query}&page=1&limit=50`)
  .then((response) =>{
    if(response.data.data.total === 0)
          setRespnse("No Result Found Sorry....")
    else
    setRespnse("Songs")
     setSongs(response.data.data.results)
    })
  }
 

//Player Instance
//RandomNextSong
const RandomNextSong = () =>{
    Axios.get(`https://saavn.me/search/songs?query=english&page=1&limit=50`)
    .then((response) =>{
      setRespnse("Songs")
       setRandom(response.data.data.results)
      })
}

//Fetch and add to queue Albums
const fetchUrls =  (url) =>{  
 fetch(`https://saavn.me/albums?link=${url}`)
  .then(response => response.json())
  .then((data) => {

    data.data.songs.forEach(songUrl => {
     var audioUrls = songUrl.downloadUrl[4].link
       queue.push({Url : audioUrls, name: songUrl.name});
    });
      console.log (queue)
      setUrlLoaded('Done')

  })
  .catch(error => {
    console.error('Error fetching API:', error);
  });

  }

//var img = image.replace(/50/g, "150") //0, 91  Image

const handleKeySearch = (e) =>{
  if(e.key === 'Enter')
  search()
}

var artistName;

return (
      <>
      <div className='margin'>
<div className='search'>
     <div className="input-group flex-wrap">
  <input type="text" onKeyDown={(e) => handleKeySearch(e)} className="form-control" onChange={q} placeholder="Enter a song,album,queue" aria-describedby="addon-wrapping"/>
  <button type='submit'  className='btn btn-dark' onClick={() => search() }>SEARCH</button>
</div>
</div>
<br />
<br />
        <div className='topResult'>
         <br />
         {topRes.map((items) =>{
           return(
             <>
             <h3>TOP MATCH</h3>
             <ul>
             <a className='rounded mx-auto d-block' href='#'  onClick={() => setId(items.id) + setTitle(items.title + "  - " + items.description)} >
             <img className="img-thumbnail" src={items.image.replace(/50/g, "150") }/>
             <p className='toptitle'>{items.title + "  - " + items.description}</p>
             </a>
             </ul>
             </>
           )
         })}
        </div>
{/**_____________Songs_______________ */}
         <div className='srchRes' >
           <div className="songs">
           <h5>{respnse }</h5>
             {songs.map((items) =>{
           return(
             <>
            <a href='#!' >
            <ul className='shadow-sm p-3 mb-2 bg-body rounded' 
            onClick={() =>{
            setSngOrAlb('song');
            setUrl(items.downloadUrl[3].link);
            setTitle(items.name + "  - " + items.album.name);
            console.log(items.downloadUrl[3].link, sngOrAlb)}}>
           <img  src={items.image[0].link}/>
           <li>{items.name.replace(/&quot;/g, '') + "  - " + items.album.name.replace(/&quot;/g, '')}</li>
           <br />
           <li className='artistsName'>{items.primaryArtists}</li>
           </ul>
           </a>
           </>
           ) 
         })}
           </div>
{/**_____________Albums_______________ */}

           <div className="albums">
           <h5>{respnse2}</h5>
             {albums.map((items) =>{
           return(
             <>
             <a href='#!'>
            <ul className='shadow-sm p-3 mb-2 bg-body rounded'
             onClick={() => { 
              setSngOrAlb('alb');
              fetchUrls(items.url);
              setTitle(items.name)
              console.log(items.url, sngOrAlb)
               }}>
           <img src={items.image[0].link}/>
           <li>{items.name.replace(/&quot;/g, '') + "  - " + items.primaryArtists[0].name}</li>
                    <br />     

    {items.primaryArtists.map((name) =>{
      {artistName = name.name+ ", "}

            return(
              <>
           <li className='artistsName'>{(artistName.slice(0,-1))}</li>
            </>)
             })}
           </ul>
           </a>
           </>
           ) 
         })}
           </div>
         </div>
         <br /> <br /> <br /> <br /> 
       {/** <div className="queue">
           <h5>Respnse</h5>
         {Respnse.map((items) =>{
           return(
             <>
            <div className='d-flex shadow-sm p-3 mb-3 bg-body rounded' 
             onClick={() =>  console.log('clicked' + items.title + 'url = ' + items.url)} >
           <img className="img-thumbnail" src={items.image}/>
           <p>{items.title}</p>
           </div> 
           </>
           ) 
         })}
        
        </div>
*/} 
</div>

<button onClick={() => {
  queue.length =0;
  setSngOrAlb('song');
  setUrlLoaded('Not_Done')
}
  }
   id="queueClearBtn">clear queue</button>

     
<br/>
<br/>
<br/>
<br/>


      {<Player title={title} url={url} albumUrls={queue} UrlLoaded = {urlLoaded} sngOrAlb={sngOrAlb}/>}
    </>
  )
}

export default Search;

 
