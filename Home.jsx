// app/Home.jsx
'use client';
import { useState, useEffect } from "react";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  function handleAddToCart(product) {
    setCart(prev => [...prev, product]);
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center text-xl text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Our Products
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <li
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[180px] h-[180px] object-contain mb-4 rounded"
            />
            <strong className="text-lg font-semibold text-gray-800 mb-2">
              {product.title}
            </strong>
            <span className="text-green-600 font-bold text-md mb-2">
              ${product.price}
            </span>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
