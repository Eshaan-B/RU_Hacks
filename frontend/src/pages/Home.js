import React from 'react';
import QrCode from '../components/QrCode';


function Home() {

  return (
    <div className='home'>
      <h1 className='main'>Workshops going on now!</h1>
      <div className='todo-app'>
      <QrCode></QrCode>
      </div>

    </div>
  );
}

export default Home;
