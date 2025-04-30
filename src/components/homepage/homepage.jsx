import './homepage.css';
import {useState, useEffect} from 'react';

export default function HomePage({currentSearch}) {
  const [displayControl, setDisplayControl] = useState('relative');
  

  useEffect(() => {
    const homePageDiv = document.querySelector('.home-page-container');
    setDisplayControl((prev) => 
      homePageDiv.style.scale === '0' ? 'none' : 'block'
    );
  }, [currentSearch])
  console.log(displayControl);
  
  return (
    <div className='home-page-container' style={{scale: currentSearch === '' ? '1' : '0', display: displayControl}}>
      <div className='home-page-div'>
        <h1 className='home-page-title'>
          Welcome to my Move Library website!
        </h1>
        <article className='home-page-article'>
          This website was developed as a hobby project for my own benefit, as a means to practice web development. I am a self-taught aspiring web developer, currently learning JavaScript using React as my library/framework. 

          All data was collected from <a href='https://www.themoviedb.org/' className='themoviedb-link'>The Movie Data Base</a> using their <a href='https://developer.themoviedb.org/reference/intro/getting-started' className='themoviedb-api-link'>API</a>. 
        </article>
      </div>
    </div>
  )
}