"use client";
import Link from "next/link";
import cookie from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import CurrentUserContext from "../hooks/CurrentUser";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, actualiser, setActualiser,socket } =
    useContext(CurrentUserContext);
  const router = useRouter();

  const menuItems = {
    Accueil: "/",
    Candidats: "#",
    Statistiques: "/stats",
  };
  const pathname = usePathname();

  const disconnect = (e) => {
    socket.current.emit("clickDisconnect",cookie.get("userId"))
    cookie.remove("userId");
    cookie.remove("token");
    router.push("login");
    setUser({});
  };

  return (
    <header className="">
      <Navbar
        maxWidth="full"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link href="/" className="font-bold text-inherit text-slate-700">
              Election IDSI
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link href="/" className="font-bold text-inherit text-slate-700">
              Election IDSI
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="max-sm:hidden">
          <NavbarItem isActive={pathname == "candidates"}>
            <Link className="" color="foreground" href="#">
              Candidats
            </Link>
          </NavbarItem>

          <NavbarItem isActive={pathname == "organization"}>
            <Link className="" href="#" aria-current="page">
              Comité
            </Link>
          </NavbarItem>

          <NavbarItem isActive={pathname == "/stats"}>
            <Link className="" color="foreground" href="/stats">
              Statistiques
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
            </NavbarItem> */}
          <NavbarItem>
            {Object.keys(user).length != 0 ? (
              <Button color="warning" onClick={disconnect} variant="flat">
                Se deconnecter
              </Button>
            ) : (
              <Button as={Link} color="primary" href="login" variant="flat">
                Se connecter
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {Object.entries(menuItems).map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href={item[1]}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item[0]}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
