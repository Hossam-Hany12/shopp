'use client';
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from "react";

export default function Header({ cart }) {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
        setShowCart(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">My Store</h1>
      <nav className="flex items-center gap-6">
        <ul className="flex gap-6 text-gray-600 font-medium items-center">
          <li className="hover:text-blue-600 transition"><Link href="/home">Home</Link></li>
          <li className="hover:text-blue-600 transition"><Link href="/">Products</Link></li>
          <li className="hover:text-blue-600 transition"><Link href="/contact">Contact</Link></li>
          <li className="hover:text-blue-600 transition">
            <button onClick={() => setShowCart(!showCart)}>🛒</button>
          </li>
        </ul>

        {session && (
          <div className="relative" ref={dropdownRef}>
            <img
              src={session.user.image}
              alt="Profile"
              onClick={() => setOpenMenu(!openMenu)}
              className="w-10 h-10 rounded-full cursor-pointer"
            />

            {openMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md p-4 z-50">
                <p className="text-sm font-medium text-gray-800 mb-1">{session.user.name}</p>
                <p className="text-sm text-gray-500 mb-3">{session.user.email}</p>
                <button
                  onClick={() => signOut()}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded"
                >
                  Sign Out
                </button>
              </div>
            )}

            {showCart && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-md p-4 z-50 text-black">
                <h2 className="text-lg font-bold mb-2">Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500">No products yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                    {cart.map((item, index) => (
                      <li key={index} className="py-2 flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-green-600">${item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
