"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "@/api/axios";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import CurrentUserContext from "../hooks/CurrentUser";

export default function Login() {
  const [bodyData, setBodyData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { actualiser, setActualiser } = useContext(CurrentUserContext);

  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBodyData({ ...bodyData, [name]: value });
    setSubmit(true);
  };

  const valide = (value) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!value.email) {
      error.email = "Veillez remplie ce champ";
    } else if (!regex.test(value.email)) {
      error.email = "Format de mail incorrecte ";
    }
    if (!value.password) {
      error.password = "Veillez remplie ce champ";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(bodyData));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      axios
        .post("/auth/login", bodyData)
        .then(({ data }) => {
          cookie.set("token", data.token);
          cookie.set("userId", data.userId);
          setActualiser(!actualiser);
          router.push("/vote");
        })
        .catch((err) => console.log(err));
    }
  }, [formErrors]);

  return (
    <div
      className="mt-10 w-full max-w-2xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    border-slate-200 border py-16 rounded-xl"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <h1>Connexion</h1>
        {/* USERNAME */}
        <div className="w-full mt-8">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
            placeholder="Ismael Silue"
          >
            Nom utilisateur
          </label>
          <div className="mt-2">
            <input
              onChange={handleInput}
              type="email"
              name="email"
              id="username"
              autoComplete="Nom d'utilisateur"
              className=" p-3"
            />
          </div>
        </div>
        {/* PASSWORD */}

        <div className="w-full mt-8">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mot de Passe
          </label>
          <div className="mt-2">
            <input
              onChange={handleInput}
              type="password"
              name="password"
              id="password"
              autoComplete="Nom d'utilisateur"
              className="p-3"
            />
          </div>
        </div>
        <button className="btn btn-primary mt-8">Connexion</button>
      </form>
    </div>
  );
}
