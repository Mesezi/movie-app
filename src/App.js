import React from 'react';
import './App.css';
import Favourite from './favourite.js'
import Search from './search.js'
import Movie from './Movie.js'
import { modeContext } from './modeContext';
import Toronto from './assets/wallpaper.webp'
import Bee from './assets/wallpaper2.webp'
import PopUp from './popup.js'


function App() {
  let APIKEY = "b539135d279b98cdd2308fb636dce4d8"
  let baseURL = 'https://api.themoviedb.org/3/';
  let configData = true;
  let baseImageURL = "https://image.tmdb.org/t/p/w500";

  const [tabs , tabsFunc] = React.useState("movie")
  const [mode , setMode] = React.useState('')
  const [popUpToggle , setPopUpToggle] = React.useState(false)
  const [popUp , setPopUp] = React.useState('')

  const body = document.querySelector("body");
  let currentHour = new Date();

window.onload= () => {
  let checkbox = document.querySelector("#checkbox");
  if (currentHour.getHours() >= 18){
    checkbox.checked = true
  } 
  setMode(checkbox.checked);
}


body.style.backgroundColor = `${mode?"rgb(15, 15, 15)":"whitesmoke"}`
body.style.color = `${mode?"white":"black"}`

let heroBg = {
  backgroundColor : mode ? " rgb(5, 5, 5, .5)":"rgb(5, 5, 5, .5)",
  }
  let navStyle = {
  boxShadow : mode ? " 0 0px 12px rgb(0, 0, 0)":"0 -1px 6px rgb(0, 0, 0)",
  }

function likeStorage (){
    let liked = JSON.parse(localStorage.getItem('liked'));
    if (liked === null || undefined){
      localStorage.setItem('liked', JSON.stringify([]))
    }
}
likeStorage();
  
   function changeTab(current){
    tabsFunc(current);
}

return (
  <div className=''>
  {popUpToggle && <PopUp popUp = {popUp} setPopUpToggle={setPopUpToggle}/>}
<header>
<nav style={navStyle} className='d-flex justify-content-between p-3 align-items-center'>
  <h1>MOVIE APP</h1>

<div className='d-flex align-items-center gap-1'>
<i className="fa-solid fa-sun"></i>
<label className="switch" id="switch">
    <input id='checkbox' type="checkbox" onClick={()=> setMode(prev => !prev)}/>
    <span className="slider round"></span>
  </label>
  <i className="fa-regular fa-moon"></i>
</div>
  

</nav>
</header>

{tabs==="movie" && <section className="hero">
{mode ? <img src={Toronto}></img> : <img src={Bee}></img>}
<div style={heroBg}  className="hero-details">
  <h1 className='ps-3'>
Welcome.
</h1>
<p className='ps-3'>
Explore all your favourite movies, and TV shows</p></div>
</section>}
 

  <div className='container'>
<div className='tab'>
<div className={tabs === "movie" ?'active-tab':''} onClick={()=> changeTab("movie")}> <p >Movie </p><i className="fa-solid fa-clapperboard"></i></div>
  
  <div className={tabs === "search" ?'active-tab':''} onClick={()=> changeTab("search")}><p >Search </p><i className="fa-solid fa-magnifying-glass"></i></div>
  
  <div className={tabs === "favourite" ?'active-tab':''} onClick={()=> changeTab("favourite")}> <p >Favourites  </p><i className="fa-solid fa-bookmark"></i></div>
 
  
</div>

<section>

<modeContext.Provider value={mode}>
{tabs === "movie" ? <Movie APIKEY = {APIKEY} baseURL={baseURL} baseImageURL={baseImageURL} mode = {mode} 
setPopUp={setPopUp} setPopUpToggle={setPopUpToggle}/> : tabs === "favourite" ?
 <Favourite APIKEY = {APIKEY} baseURL={baseURL} baseImageURL={baseImageURL} mode = {mode} setPopUp={setPopUp} setPopUpToggle={setPopUpToggle}/> : 
 <Search mode = {mode} APIKEY = {APIKEY} baseURL={baseURL} baseImageURL={baseImageURL} setPopUp={setPopUp} setPopUpToggle={setPopUpToggle} />}
</modeContext.Provider>

</section>


  </div>
 

</div>
  );

  
}

export default App;









/* function top10movies () {
  let arr = []
  for (let i = 0; i < 5; i++){
   arr.push (<Movies title = {movies[i]} image = {movies[i]} year = {movies[i]}
    key = {movies[i]}/>)}
  topMoviesFunc (prev => arr)
}
top10movies() */











/* let arr = [
  {
    no:1,
    id:1
  },
  {
    no:1,
    id:2
  }
  ,
  {
    no:1,
    id:3
  }
  ]
  const [num, numFunc] = React.useState(arr)
  function increase(id){
  numFunc(prev => {
    return prev.map(item => {
      return item.id === id ? {...item, no: item.no == 20 ? 20 : item.no + 1} : item
    })
  })
   
   }
   function decrease(id){
    numFunc(prev => {
      return prev.map(item => {
        return item.id === id ? {...item, no: item.no == 0 ? 0 : item.no - 1} : item
      })
    })
     
     }

let arrComponent = num.map(item => (
<Header num= {item.no} id={item.id} increase={increase} decrease={decrease} key={item.id} />
))


return (
<div>
{arrComponent}
</div>
);
 */
