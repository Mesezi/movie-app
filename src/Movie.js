

import React from 'react';
import MovieCard from './movie-card.js'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";




export default function (props){
   const [upcomingTV , setUpcomingTV] = React.useState([]) // upcomingTV  shows state
   const [popularTV , setPopularTV] = React.useState([]) // popularTV shows state
   const [topTV , setTopTV] = React.useState([]) // popularTV shows state

   const [upcomingMovie , setUpcomingMovie] = React.useState([]) // upcoming  movie state
   const [popularMovie , setPopularMovie] = React.useState([]) // popular movie state
   const [topMovie , setTopMovie] = React.useState([]) // popular movie state

   const [showTracker , setShowTracker] = React.useState(true)

  function getShowDetails(type, category, setterFunction){
   let url = `${props.baseURL}${type}/${category}?api_key=${props.APIKEY}&language=en-US&page=1`;
   fetch(url)
 .then(result=>result.json())
 .then((data)=>{
  data = data.results.map(item => ({...item, like: false})) // map through all results and add a like state of false
        let liked = JSON.parse(sessionStorage.getItem('liked'));// get liked shows fromlocal storage
     data.forEach(item => {
           for(let i = 0; i < liked.length; i++){// for each tv show in popularTV, loop through liked tv shows in local storage to check if both id's match
              if(item.id === liked[i].id){
               item.like = true// change their like state to true, for the id's that match 
              }
           }
        });
       setterFunction(data.map( show =>  <SwiperSlide> <MovieCard title={show.name||show.title} 
           overview={show.overview} 
           key={show.id} 
           id={show.id}   
           image={`${props.baseImageURL}${show.poster_path}`} 
           backdrop = {`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
           like = {show.like}
           toggleLike = {toggleLike}
           vote ={show.vote_average}
           setPopUp={props.setPopUp}
           setPopUpToggle={props.setPopUpToggle}
           year = {show.release_date || show.first_air_date}/>
           </SwiperSlide>
           ));
 })
}

  React.useEffect (function () {  
   getShowDetails('tv', 'top_rated', setTopTV)
   getShowDetails('tv', 'popular', setPopularTV)
   getShowDetails('tv', 'on_the_air', setUpcomingTV)
   
   getShowDetails('movie', 'top_rated', setTopMovie)
   getShowDetails('movie', 'popular', setPopularMovie)
   getShowDetails('movie', 'upcoming', setUpcomingMovie)
   }, [showTracker])  

//



function toggleLike(data){
   let likedInStorage = JSON.parse(sessionStorage.getItem('liked'));
   if(!data.like){
      likedInStorage.unshift(
         {id:data.id,title:data.title,posterImg:data.image,backdropImg:data.backdrop,like:true,overview:data.overview,vote:data.vote,year:data.year,month:data.month})  
      let newLike = JSON.stringify(likedInStorage);
      sessionStorage.setItem('liked', newLike);
      setShowTracker(prev=> !prev)
   }
   else{
      likedInStorage.forEach((item, index) => {
         if (item.id === data.id){
          likedInStorage.splice(index, 1);
          let newLike = JSON.stringify(likedInStorage);
             sessionStorage.setItem('liked', newLike);
             setShowTracker(prev=> !prev)
         }
          }
       )  
   }
   
}

         
return (
   <>
<main className='my-5'>
<h2>Popular TV Shows <i className="fa-solid fa-tv"></i></h2>
<div className='movie-con'>
<Swiper
modules={[Navigation, Autoplay, Pagination]}
 pagination={{dynamicBullets: true,}}

      spaceBetween={10}
      slidesPerView={"auto"}
    >
      {popularTV}
</Swiper>
</div> 

    <h2>Popular Movies <i className="fa-solid fa-film"></i></h2>
    <div className='movie-con'>
    <Swiper
    modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{dynamicBullets: true,}}
    >
      {popularMovie}
</Swiper>
</div>
   </main>

<main className='my-5'>
<h2>Upcoming TV Shows <i className="fa-solid fa-tv"></i></h2>
<div className='movie-con'>
<Swiper
modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{dynamicBullets: true,}}
    >
      {upcomingTV}
</Swiper>
</div>

    <h2>Upcoming Movies <i className="fa-solid fa-film"></i></h2>
    <div className='movie-con'>
    <Swiper
    modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{dynamicBullets: true,}}
    >
      {upcomingMovie}
</Swiper>
</div>
</main>

<main className='my-5'>

<h2>On Air TV Shows <i className="fa-solid fa-tv"></i></h2>
<div className='movie-con'>
<Swiper
modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{dynamicBullets: true,}}
    >
      {topTV}
</Swiper>
</div>

    <h2>Top Movies <i className="fa-solid fa-film"></i></h2>
    <div className='movie-con'>
    <Swiper
    modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{dynamicBullets: true,}}
    >
      {topMovie}
</Swiper></div>
</main>

    
</>
  
)

} 