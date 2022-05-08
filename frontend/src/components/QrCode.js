import React from 'react'
import qr from './assets/qr.png'

import works from './work'

function QrCode() {
    
 return works.map((work,index)=>(
<div className='todo-row'>
    <div className="info">

        <div key={index}><h1>{work.title}</h1></div>
        <div key={index}>{work.src}</div>
    </div>
    <img src={qr} className='image' alt="" srcset="" />
</div>
 ));

}


export default QrCode