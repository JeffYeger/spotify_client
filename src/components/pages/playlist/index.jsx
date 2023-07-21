
import { useContext, useEffect, useState } from 'react'
import PlayerContext from '../../../PlayerContext'
import axios from 'axios'
import styles from './styles.module.css'
import PlaylistCard from '../../PlaylistCard'

function Playlist() {
const {playlists,setPlaylists}= useContext(PlayerContext)
// const [username, setUsername] = useState([])
const [search,setSearch]= useState([])
const [constPlay,setConstPlay] = useState([])

const options = {
  method: 'GET',
  url: 'http://localhost:1001/playlist/getplaylist',
  params: {
  },
  headers: {
    'authorization': "Bearer "+ localStorage.getItem('token')

  }
}

useEffect(()=> {
axios.request (options)
  .then ((res)=> {
 
//  setUsername(res.data[0].user.name)
  const endResult = res.data
  console.log (endResult)
  setConstPlay(endResult)
  setPlaylists(endResult)})
  .catch ((error)=> {
   console.log (error)
  })
},[])


  const handleChange = (e)=>{
    setSearch(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length === 0){
      setPlaylists(constPlay)}
    else if (search.length > 0) {
      const filteredPlaylist = playlist.filter((song) => {
       
        if (song.title.toLowerCase().includes(search)) {
          return song
        }
      })
  
      setPlaylists(filteredPlaylist);
     
      
    }
  }

  const handleClick = () => {
   return console.log ('clicked')
  }

  return <div className={styles.home}>

<div className={styles.search}>
     <form>
      <input style={{borderRadius:"30px"}} onChange={handleChange} type="search" placeholder="Search your favorites" />
      <button className={styles.searchbutton} onClick={handleSubmit}>Search</button>
    </form>
    </div>
    
    <div className={styles.titletext}>   <h2 className={styles.basictext}>Playlists</h2> </div>
 
      
  
<div className={styles.video_container}>


  {playlists.map((playlist,index)=>{
    return  <PlaylistCard  key = {index} data = {playlist} />
  })}
</div>
</div>
}
export default Playlist