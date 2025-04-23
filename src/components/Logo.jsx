import React from 'react'

function Logo({width = "100px" ,height= "100px" }) {
  return (
    <div>
      
       <img 
       className='rounded-xl'
       src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-41Kkm4eDbSzPz4fV1UuZnj_2VyMiVh1KYCpdbKgoo9FK-JUHmOck13SvuZ3M8VgdpZc&usqp=CAU' width={70}/>
    </div>
  )
}

export default Logo
