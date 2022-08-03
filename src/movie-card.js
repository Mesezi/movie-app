import React from 'react';
import PopUp from "./popup.js"
import imgNotLikedLight from './assets/heart (3).png'
import imgLiked from './assets/heart (1).png'
import imgNotLikedDark from './assets/heart (2).png'
import { modeContext } from './modeContext.js';


export default function Movie(props){
const mode = React.useContext(modeContext)

function popUp(e){
   let button = e.target
   let buttonCon = button.parentElement
   let overview = buttonCon.querySelector('p').innerText;
   let title = buttonCon.querySelector('h4').innerText;
   let image = buttonCon.querySelector('.backdrop').src;
   let vote = buttonCon.querySelector('.vote').innerText;
   let year = buttonCon.querySelector('.year').innerText;
   let popUp = {title, overview, image, vote, year}
   props.setPopUp(popUp)
   props.setPopUpToggle(true);
}

let release = JSON.parse(JSON.stringify(props))

let year = release.year
let month = release.year

if (year === undefined){
   year = ''
   month = ''
}
else{
   year = year.slice(0,4)
   month = month.slice(5,7)
}


  let toggleData =  {
   id: props.id,
   title:   props.title,
    overview: props.overview,
    backdrop: props.backdrop,
   image:  props.image,
    like: props.like,
    vote: props.vote,
    year : year,
    month : month
  }
return(
   
   <div className='movie--card'>
      <span className='key none'>{props.id}</span>
<img className='backdrop none' src={props.backdrop} alt={props.title}/>
<img className='image' src={props.image}/>
<h4 className='mb-1 fw-bold'>{props.title} </h4> <span className='none year'>({year})</span>
<div className="likeBtn-container d-flex align-items-center justify-content-between"> 
<span className="vote m-0">{props.vote}</span>
<span onClick=
{()=>props.toggleLike(toggleData)}><img src={props.like ? imgLiked : mode ? imgNotLikedDark : imgNotLikedLight } /></span></div>
   <p> "{props.overview} "</p>
   <span onClick={(e) => popUp(e)}>Read more</span>
</div>


)

}



/* 
const styles = {
   backgroundColor : props.num % 2 == 0 ? "firebrick" : "green"
}
return (
   <div className='num-container'>
      <button style={styles} onClick={()=>props.decrease(props.id)}>-</button>
      <p>{props.num}</p> 
      <button style={styles} onClick={()=>props.increase(props.id)}>+</button>
   </div>

) */