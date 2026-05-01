// app/page.js
'use client';
import { useState } from 'react';
import Header from './Header';
import Home from './Home';

export default function Page() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cart={cart} />
      <Home cart={cart} setCart={setCart} />
    </>
  );
}
