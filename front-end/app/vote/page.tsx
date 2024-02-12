'use client'
import React, { useState,useEffect,useContext } from 'react'
import { Button } from '@nextui-org/button'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import { FaCheck } from "react-icons/fa6";
import axios from '@/api/axios';
import CurrentUserContext from '../hooks/CurrentUser';
import cookie from 'js-cookie';


export default function Vote
() {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  let [isVoteBtnDisabled, setIsVoteBtnDisabled] = useState(false)
  const[candis,setCandis] = useState([])
  const { user,socket,setUserVoted } = useContext(CurrentUserContext);

  // When the user clicks "vote" for a candidate, the candidate info should be displayed
  let [ selectedCandidate, setSelectedCandidate ] = useState({firstName: '', lastName: '', id: 0, imgName: ''})

  function validateVote () {
    axios.get(`/test/associations/${user.id}/${selectedCandidate.id}`).then(({data})=> {
      
      socket.current.emit("Voted",cookie.get("userId"))
      socket.current.on("useVoted",data=>{
        console.log(data);  
        setUserVoted(data)
      })
      alert("Vote confirmer");
    }).catch(err=>alert('Vous avez déja votez')
    )
    setIsVoteBtnDisabled(true)
  
    setTimeout(() => {
      setIsVoteBtnDisabled(false)
      onClose()
    }, 1000);
  }

  function chooseCandidate (candidate:any) {
    console.log(candidate )
    setSelectedCandidate(candidate);
    onOpen()
;  } 
useEffect(()=>{
axios.get('/test/nb-votes').then(({data})=>{
  setCandis(data.candidats)
}).catch(err=>console.log(err)
)
},[])
  
  return (
    <main>
      {/* <VoteConfirmationModal isOpen={isOpen} name={12}/> */}
      <section className="container mx-auto px-4">
        <h1 className="mt-14">Choisissez votre Président</h1>
        <p className="text-slate-600 text-xl mt-5">
          Lequel de ces candidats correspond le plus à ce que vous attendez du Président de l’IDSI ?
        </p>

        
        {/* CANDIDATE VOTE CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-14 gap-4 gap-y-8">
          {candis.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col items-center rounded-3xl shadow-md overflow-hidden">
                <div className="w-full flex justify-center bg-gray-200">
                  <img src={`images/${item.nom}.jpg`} alt="Candidat 1" className='h-60 bg-black'/>
                </div>
                <Button className="btn btn-primary my-4" onPress={() => chooseCandidate(item)}>Voter</Button>
              </div>
            </div>
          ))}
          
        </div>
      </section>

      
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement={"center"}
        isDismissable={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -40,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            }
          }
        }}
        >
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Voter {selectedCandidate.lastName + " " +  selectedCandidate.firstName} ?</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button color="primary" isDisabled={isVoteBtnDisabled} onPress={validateVote}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    </main>
  )
}
