"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"
import { Card } from "@workspace/ui/components/card"

function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogin = (role) => {
    router.push("/login");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-200"
        aria-label="Open menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700"></span>
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleLogin("admin")}>Login as Admin</button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleLogin("supervisor")}>Login as Supervisor</button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleLogin("staff")}>Login as Staff</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-100 mt-auto shadow-inner">
      <div className="container mx-auto text-center text-gray-600 text-sm px-4">
        &copy; {new Date().getFullYear()} Individual Work Plan. All rights reserved.
      </div>
    </footer>
  );
}

function Header() {
  return (
    <header className="w-full py-4 bg-gray-100 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-gray-800">Individual Work Plan</h1>
        <MenuDropdown />
      </div>
    </header>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-svh gap-6">
        <h1 className="text-6xl font-extrabold text-center">
          Organize Your Work,<span className="text-purple-500"> Achieve Your Goals</span>
        </h1>
        <p className="text-xl text-gray-500 text-center max-w-2xl">
          Create personalized work plans and stay productive with our intuitive individual work management platform.
        </p>
      </div>
      <Footer />
    </>
  )
}
