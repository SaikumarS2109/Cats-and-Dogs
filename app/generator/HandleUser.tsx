'use client';
import React, { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import catImg from '../../public/cat-svgrepo-com.svg'

// Handling just the client work here, so it frees our main page to be popualted with SSR data in the future if we wanted to 
export default function HandleUser(){
    const onChangeHandler = (e: any) => {
        const selected = e.currentTarget.value
        setSelectedValue(selected)

    }

    const onClick= async (event: React.MouseEvent<HTMLElement>) => {
        if(selectedValue !== ""){
            // Look for errors, doing both APIs here as they are in a conditional loop anyways
            try{
                if(selectedValue === "Cat"){   
                    const catResp = await fetch('https://catfact.ninja/fact').then((res) => res.json())
                    .then((data) => {
                        console.log('cat', data)
                        const text = <div className="cat-fact rounded-xl"> 

                            <div className='relative flex justify-between'> 
                                <p className="">Cat fact: </p>
                                <Image className='absolute top-0 right-0 cat-icon' src={catImg} alt="Cute cat icon"/> 
                            </div> 

                        <p className="text-justify">{data.fact}</p> 
                        <p className="text-center mt-1">The more you know!</p> 
                        </div> 
                        setContent(text)
                    })
                }
                else if(selectedValue === "Dog"){
                    const dogResp = await fetch('https://dog.ceo/api/breeds/image/random').then((res) => res.json())
                    .then((data) => {
                        console.log('dog', data)
                        const img = <div> 
                            <img className="dog-image rounded-xl" src={data?.message} alt="Adorable Dog Picture"/> 
                            <p>Aww such a cute dog!</p>
                            </div>
                        setContent(img)
                    })
                }
            } catch(e){
                console.log(e)
                // Set Content to show error
                const errContent = <div>Oops something went wrong! Try Again!</div>
                setContent(errContent)
            }
        }    
    }

    const [selectedValue, setSelectedValue] = useState<string>()
    
    const [content, setContent] = useState<React.JSX.Element>(<></>)

    return (
        
        <div className="mt-5">
            <div className="flex flex-col items-center">
                {/* Adding some tailwind css for radio buttons, included dark mode css to support modes if browser prefers it */}
                <div>
                    <div className="flex items-center mb-4">
                        <input id="cat-radio" type="radio" value="Cat" name="animal-radio" onChange={onChangeHandler} className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="cat-radio" className="ms-2 font-medium text-gray-900 dark:text-gray-300">Learn an interesting Cat Fact!</label>
                    </div>
                    <div className="flex items-center">
                        <input id="dog-radio" type="radio" value="Dog" name="animal-radio" onChange={onChangeHandler} className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="dog-radio" className="ms-2 font-medium text-gray-900 dark:text-gray-300">See a cute picture of a Dog</label>
                    </div>
                </div>
                <button className="btn rounded-full bg-blue-800 p-2 mt-3 w-20" onClick={onClick} disabled={selectedValue === ""}>Go!!</button>
            </div>
            <div className="flex flex-col items-center mt-5">
                {content}
            </div>
    </div>

    )
}