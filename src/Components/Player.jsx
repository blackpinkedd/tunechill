/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Style.css'
function Player(props) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [queClick, setQueClick] = useState(Boolean)
var playlist = props.albumUrls;

        const handleNextTrack = () => {
           setCurrentTrackIndex((prevIndex) =>
             prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
            );
        };

        const handlePreviousTrack = () => {
          setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? playlist.length - 1 : prevIndex - 1

           );
       };

        var songSrc; 
        var songName;
          if(props.sngOrAlb === 'alb'){
           if( props.UrlLoaded === 'Done'){
            songSrc =  playlist[currentTrackIndex].Url;
            songName =  playlist[currentTrackIndex].name;
           }
          }
      else if(props.sngOrAlb === 'song'){
        songSrc = props.url
        songName = props.title
      }
        


 const handleQueueBtn = (e) =>{
  var temp;
  if(queClick === true)
  temp = false;
  else if(queClick === false)
  temp = true;

 e.onClick = setQueClick(temp)
}
 
        return (
  <>
  <div>
  </div>
    <div>
{/**Song */}


   <AudioPlayer
       className='player'
       src={ songSrc}
       autoPlay={true}
       autoPlayAfterSrcChange	 = {true}
       onWaiting = {e => console.log("Waiting...")}
       controls
       showSkipControls	= {props.sngOrAlb === 'alb' ? true : false}
       onClickPrevious= {() => handlePreviousTrack()}
       onClickNext = {() => handleNextTrack() + console.log(songSrc)}
       header={`Now playing: ${songName}`}
       onPlay={e => console.log('Started To Play')}
       onEnded = {e => handleNextTrack()}
  />
        <button className='queueBtn' onClick={() => handleQueueBtn() }>QUEUE</button>
    </div>
<div className="queuelist">
  {queClick ?   
  <ul className="list-group ">
    {playlist.map((items) =>{
     return(
      <li className="list-group-item">{items.name}</li>
     )
    })}
</ul>
 : ''}
 </div>
    </>
  )
}

export default Player;