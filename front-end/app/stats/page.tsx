'use client'
import React,{useContext} from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { PiNoteBlank } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
import CurrentUserContext from '../hooks/CurrentUser';



export default function Stats() {
  const { ActiveUser,userVoted } =
    useContext(CurrentUserContext);
  return (
    <main>
      <div className="container mx-auto mt-4 px-8">
        <h1>Bilan des votes</h1>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-8 mt-4">
            <div className="rounded-lg shadow-md py-16 flex flex-col items-center bg-blue-50 text-blue-600">
              <div className="flex items-center gap-x-4">
                <span className="text-6xl">{ActiveUser.length}</span>
                <div className="w-16 h-16 flex flex-center justify-center items-center rounded-full bg-blue-300">
                  <span className=' text-5xl'><IoIosPeople /></span>
                </div>
              </div>
              Electeurs
            </div>
            <div className="rounded-lg shadow-md py-16 flex flex-col items-center bg-green-50 text-green-600">
              <div className="flex items-center gap-x-4">
                <span className="text-6xl">{userVoted.length}</span>
                <div className="w-16 h-16 flex flex-center justify-center items-center rounded-full bg-green-300">
                  <span className=' text-5xl'><FaCheck /></span>
                </div>
              </div>
              Votants
            </div>
        
            <div className="rounded-lg shadow-md py-16 flex flex-col items-center bg-warning-50 text-warning-600">
              <div className="flex items-center gap-x-4">
                <span className="text-6xl">2</span>
                <div className="w-16 h-16 flex flex-center justify-center items-center rounded-full bg-warning-300">
                  <span className=' text-5xl'><PiNoteBlank /></span>
                </div>
              </div>
              Bulletins nuls
            </div>
        
            <div className="rounded-lg shadow-md py-16 flex flex-col items-center bg-gray-50 text-gray-600">
              <div className="flex items-center gap-x-4">
                <span className="text-6xl">{37 - userVoted.length}</span>
                <div className="w-16 h-16 flex flex-center justify-center items-center rounded-full bg-gray-300">
                  <span className=' text-5xl'><MdOutlineAccessTime  /></span>
                </div>
              </div>
              Restants
            </div>
        </div>
      </div>
    </main>
  )
}
