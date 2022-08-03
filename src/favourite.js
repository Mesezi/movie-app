import React from 'react';
import FavCard from './favourite-card.js'
import { modeContext } from './modeContext.js';

export default function Favourite (props){
    const mode = React.useContext(modeContext)

let sortItem ={
    backgroundColor: mode ? "black": "white",
    color: mode ? "white": "black",

}
    const [inStorage , setInStorage] = React.useState() 
    const [sort , setSort] = React.useState('Recently Added'); 
    const [sortToggle , setSortToggle] = React.useState(false); 

    function likedItems (){
        let likedTvandMovie = JSON.parse(sessionStorage.getItem('liked'))

    if(likedTvandMovie.length < 1 ){
        setInStorage("empty") 
    }

    else{
        if(sort === "Highest rated"){
            likedTvandMovie.sort(function(a, b)
            { return b.vote-a.vote})
        }
        
        else if (sort === "Alphabetically"){
            likedTvandMovie.sort(function(a, b)
            {return a.title.localeCompare(b.title);})
            
        }
        else if (sort === "Recently Released"){
            likedTvandMovie.sort(function(a, b)
            { 
             if (b.year === a.year){
               return b.month-a.month
            }
            else {
                return b.year-a.year
            }
                })
        }
   

         setInStorage(likedTvandMovie.map(movie => <FavCard title={movie.title} 
            overview={movie.overview} 
            key={movie.id} 
            id={movie.id}   
            image={`${props.baseImageURL}${movie.posterImg}`} 
            backdrop = {`https://image.tmdb.org/t/p/original${movie.backdropImg}`}
            like = {movie.like}
            remove = {removeShow}
            vote ={movie.vote}
            year={movie.year}
            setPopUp={props.setPopUp}
           setPopUpToggle={props.setPopUpToggle}
            />)) 
    }

        
    }


    React.useEffect(function(){
        likedItems()
    }
        , [sort])

    function removeShow(id){
        let likedInStorage = JSON.parse(sessionStorage.getItem('liked'));
           likedInStorage.forEach((item, index) => {
              if (item.id === id){
               likedInStorage.splice(index, 1);
               let newLike = JSON.stringify(likedInStorage);
                  sessionStorage.setItem('liked', newLike);
              }
               } 
            )  
            likedItems();
     }


function sortToggler(sort){
setSort(sort)
setSortToggle(prev => !prev)
}

    

return (
    <>
    {inStorage !=="empty" ? <div className='d-flex justify-content-end gap-2'>
    <p className='m-0 fw-bold'>Sort by:</p>
        <div className='sort'>
            <p className='m-0 fw-bold' onClick={()=> setSortToggle(prev => !prev)}>{sort}</p>
        
        {sortToggle && <div style={sortItem} className='sort-items'>
            <ul>
                <li onClick={()=> sortToggler('Highest rated')}>Highest rated</li>
                <li onClick={()=> sortToggler('Recently Added')}>Recently Added</li>
                <li onClick={()=> sortToggler('Alphabetically')}>Alphabetically</li>
                <li onClick={()=> sortToggler('Recently Released')}>Recently Released</li>
            </ul>
        </div> }

        </div>

    </div> : ''}
    
    <div className=''>
    {inStorage === "empty" ? <div className='d-flex h-100 justify-content-center align-items-center'>NOTHING HERE</div> : inStorage}
    </div>
    </>
)
}