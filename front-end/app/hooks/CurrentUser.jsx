"use client";
import axios from "@/api/axios";
import cookie from "js-cookie";
import { createContext, useEffect, useState,useRef } from "react";
import {io} from 'socket.io-client'

const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [actualiser, setActualiser] = useState(false);
  const [ActiveUser,setActiveUser] = useState([])
  const [userVoted,setUserVoted] = useState([])
  const socket = useRef()
  socket.current = new io('http://localhost:8800')

  useEffect(() => {
    if (cookie.get("userId")) {
      axios
        .get(`/utils/${cookie.get("userId")}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then(({ data }) => {
          setUser(data);
          //   console.log(data);
      socket.current.emit("newAddUser",cookie.get("userId"))
        })
        .catch((err) => {
          console.log(err);
        }); 
    }
    socket.current.on("userConnected",data=>{
      setActiveUser(data)
    })
  }, [actualiser]);

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, actualiser,setActualiser,ActiveUser,setActiveUser,userVoted,setUserVoted,socket}}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
