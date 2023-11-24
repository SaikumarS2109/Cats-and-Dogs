import Image from 'next/image'
import catImg from '../public/cat-svgrepo-com.svg';
import Link from 'next/link';
import { useState } from 'react';
{/* You can find more great svgs at https://www.svgrepo.com/vectors/cat/ */}

// For the data type we receive from Cat API
interface Cat {
  fact: string,
  length: number
}

// to shuffle the array, this will make the UI spread with facts and images
const shuffle = (array:Array<string>) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default async function Home () {
  
  let data: Array<string> = []
  let isError = false
  try {
    //We can choose to not cache these results and load something new everytime, it all depends on what we want to show in the front page
    var catResp = await fetch('https://catfact.ninja/facts?limit=15')
    var catJson = await catResp.json()

    var catFacts: Array<string> = catJson.data.map( (cat: Cat) => { return cat.fact })

    var dogResp = await fetch('https://dog.ceo/api/breeds/image/random/40')
    var dogJson = await dogResp.json()

    let dogs: Array<string> = dogJson.message;

    data = dogs.concat(catFacts)
    data = shuffle(data)

  } catch (e){
    //if Error set the bool to true
    isError = true
    console.log(e)
  }

  
  // Render the individual Images / Facts
  const dogImages = data?.map((animal:string) => { 
    if(animal.startsWith('https://'))
      return <div className="masonry-item"> <img className='rounded-xl' src={animal} alt="Picture of an adorable dog "/> </div> 
    else
      return (
        <div className="masonry-item"> 
          <div className='relative rounded-xl'> Cat fact: 
            <Image className='absolute top-0 right-0 cat-icon me-2' src={catImg} alt="Cute cat icon"/> 
            <p>{animal}</p>
          </div> 
        </div>
      )
  })

  // Render the background of images and facts with the button to go to generate page
  const animalData = 
  <>
    <div className="masonry-container">  
      {dogImages}
    </div>
    <div className='center-screen ask-user content-around grid rounded-lg'>
      <div className='text-center'>
        <div> Click here to view an interesting cat fact or an adorable dog picture</div>
        <Link href={'/generator'}>
        <button className='btn rounded-full bg-blue-800 p-2 mt-3'>Go to Generator</button>
        </Link>
      </div>
    </div>
  </>

  // Render only the center div explaining there was an error, this should not stop the user to go to generate page, so still link the route
  const errorData = 
  <>
  <div className='center-screen ask-user-error content-around grid rounded-lg'>
    <div className='text-center'>
      <p>Oops something went wrong with loading the page, try again!</p>
      <div> Click here to view an interesting cat fact or an adorable dog picture</div>
      <Link href={'/generator'}>
      <button className='btn rounded-full bg-blue-800 p-2 mt-3'>Go to Generator</button>
      </Link>
    </div>
  </div>
  </>
  
  // Render the final data
  const finalData = isError? errorData: animalData
  
    return (
      <main>
        {finalData}
      </main>
    )
}
