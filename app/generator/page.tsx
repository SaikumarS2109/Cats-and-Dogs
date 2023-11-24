import React from 'react';
import HandleUser from './HandleUser'
import './generator.css'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';


export default function GeneratorPage(){
    return (
        <div className='h-screen p-4 generator'>
            <div className='align-top text-center'>
                Powered by the wonderful folks over at
                &nbsp;<a className='text-blue-600 dark:text-white hover:underline' href='https://catfact.ninja/'>Cat Ninja</a> and
                &nbsp;<a className='text-blue-600 dark:text-white hover:underline' href='https://dog.ceo'>Dog CEO</a>
            </div>
            <div className='align-top text-center'>
                {/* Handle client side events here */}
                <HandleUser/>
            </div>
        </div>
    )
}


