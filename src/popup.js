import React from 'react';
export default function Popup(props){
let voteStyle = {
   backgroundColor:  props.popUp.vote < 5 ? "firebrick" : props.popUp.vote < 7 ? "goldenrod" : "darkolivegreen",
}

  return(
   <div className="pop-up">
    <div className="pop-up-box">
    <img src= {props.popUp.image} alt={props.popUp.title}/>
    <span onClick={()=> props.setPopUpToggle(false)}>X</span>
    <div className='pop-up-details p-2 p-md-4'>
   <div><h2 className='pop-up-title'>{props.popUp.title}</h2> <p className='m-0'>{props.popUp.year}</p> <div className='d-flex m-0 align-items-center'><p className='m-0 p-2'>Rating:</p> 
   <p style={voteStyle} className="vote m-0 fw-bold py-1 px-2">{props.popUp.vote}</p></div></div>
    <p className='pop-up-overview m-0'>{props.popUp.overview}</p>
    </div>
      
     </div>
  </div>
  )    
}