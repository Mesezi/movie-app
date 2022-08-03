

import React from 'react';
import MovieCard from './movie-card.js'
import whiteLoading from './assets/pulse white.gif'
import darkLoading from './assets/black pulse.gif'




export default function Search(props){
  let styles = {
backgroundColor :props.mode ? "rgba(35, 35, 35, 1)":"whitesmoke",
color :props.mode ? "white":"black",
borderBottom: props.mode ? "none":"2px solid black",
  }



   const [searchedtv , setSearchedTv] = React.useState("") // 
   const [searchedKeyword , setSearchedKeyword] = React.useState("")

function Like(data){
   let likedInStorage = JSON.parse(sessionStorage.getItem('liked'));
   if(!data.like){
      likedInStorage.unshift(
         {id:data.id,title:data.title,posterImg:data.image,backdropImg:data.backdrop,like:true,overview:data.overview,vote:data.vote,year:data.year,month:data.month})  
      let newLike = JSON.stringify(likedInStorage);
      sessionStorage.setItem('liked', newLike);
      search();
   }
   else{
      likedInStorage.forEach((item, index) => {
         if (item.id === data.id){
          likedInStorage.splice(index, 1);
          let newLike = JSON.stringify(likedInStorage);
             sessionStorage.setItem('liked', newLike);
             search();
         }
          }
       )  
   }
   
}

function handler(event){
   setSearchedTv(<img alt={props.mode} className='loading' src={props.mode ? whiteLoading : darkLoading} />)
      setSearchedKeyword(event.target.value);
      search();
      }

      function search(){
        let url =  `${props.baseURL}search/multi?api_key=${props.APIKEY}&language=en-US&query=${searchedKeyword}&page=1&include_adult=false`
         fetch(url)
         .then(result=>result.json())
         .then((data)=>{
            data = data.results.slice(0, 8);
            data = data.map(item => ({...item, like: false}))
         let liked = JSON.parse(sessionStorage.getItem('liked'));// get liked shows from local storage
         data.forEach(item => {
            for(let i = 0; i < liked.length; i++){// for searched show, loop through liked shows in local storage to check if both id's match
               if(item.id === liked[i].id){
                item.like = true// change their like state to true, for the id's that match 
               }
            }
         }
         
         );
        
            setSearchedTv(data.map(item => <MovieCard title={item.name||item.title} 
               overview={item.overview} 
               key={item.id} 
               id={item.id}   
               image={`${props.baseImageURL}${item.poster_path}`} 
               backdrop = {`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
               like = {item.like}
               toggleLike = {Like}
               vote ={item.vote_average}
               setPopUp={props.setPopUp}
               setPopUpToggle={props.setPopUpToggle}
               year = {item.release_date || item.first_air_date}/>))
  
              
            

         }).catch(err => setSearchedTv(<p>Try another Keyword</p>));
        
}

         
return(
   <>
<div className='container-fluid sticky-top'>
<div className="search-box">
       <div className='form ' >
<input type='text' style={styles} placeholder='Search Movies, TV shows, ...' onChange={handler}/>
   </div>
</div>
</div>
    
{searchedKeyword && <div className='search-details my-3'>{searchedtv}</div>}
</>
  
)

} 