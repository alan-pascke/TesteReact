'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Image from "next/image";
import { useFetchProducts } from "../hooks/useFetchProduct";

export default function Products() {

  const [query, setQuery] = useState("");
  const {products} = useFetchProducts();

  const filteredProducts = query
  ? products.filter((product) => {
      const queryTerms = query.toLowerCase().split(" ");

      return queryTerms.every((term) =>
        product.name.toLowerCase().includes(term) ||
        product.model.toLowerCase().includes(term) ||
        product.cars.some((car) => car.toLowerCase().includes(term))
      );
    })
  : products;

  return (
    <div className="w-full flex justify-center flex-col h-full bg-white">
      <div className="border-gray-500 w-1/2 mx-auto mb-4">
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
          Pesquisa
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            onChange={(e) => setQuery(e.target.value)}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      </div>
      <div className="mb-4 border-b border-1"></div>

      <div className="flex flex-col gap-2 cell:mx-12 md:mx-0" >
        {filteredProducts.length === 0 ? (
          <p className="text-center">Nenhum produto encontrado</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index} className="card" data-testid="product">

              <div className="flex flex-none flex-col md:w-[175px] items-center justify-center text-center">
                <Image src={product.image} alt={product.name} width={180} height={180} ></Image>
                <h1 className="mt-1 text-lg font-semibold md:text-black cell:text-transparent">{product.model}</h1>
              </div>

              <div className="vertical-line"></div>

              <div className="grow h-[75%]">
                <h1 className="cell:text-lg md:text-2xl font-semibold ">{product.name}</h1>
                <div>
                  <div className="mt-4 cell:text-sm md:text-sm grid md:grid-cols-3 cell:grid-cols-2 gap-y-4 row md:grid-row-2 cell:grid-row-3">
                    <div className="text-gray-500">
                      Durabilidade 
                      <p className="product-information">{product.treadwear}</p>
                    </div>
                    <div className="text-gray-500">
                      Tração
                      <p className="product-information">{product.traction}</p>
                    </div>
                    <div className="text-gray-500">
                      Temperatura
                      <p className="product-information">{product.temperature}</p>
                    </div>
                    <div className="text-gray-500">
                      Índice de velocidade
                      <p className="product-information">{product.speedRating}</p>
                    </div>
                    <div className="text-gray-500">
                      Capacidade de Carga
                      <p className="product-information">{product.loadIndex} </p>
                    </div>
                    <div className="text-gray-500">
                      Desenho
                      <p className="product-information">{product.pattern}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          )) 
        )}
      </div>
    </div>
  )
}