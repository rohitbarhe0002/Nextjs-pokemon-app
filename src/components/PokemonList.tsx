// import Link from "next/link";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// export default function PokemonList({ pokemons }: { pokemons: { name: string, url: string }[] }) {
//     console.log(pokemons,"=====pokemons");
//   return (

//     <div className="bg-gray-300 min-h-screen p-8 flex flex-col items-center">
//     <div className="max-w-4xl w-full">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">
//         Example Home Screen UI
//       </h1>

//       <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
//         {/* Dropdown Select */}
//         <div className="mb-4">
//           <div className="relative">
//             <select className="appearance-none w-full md:w-96 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option>Select</option>
//               <option>Option 1</option>
//               <option>Option 2</option>
//               <option>Option 3</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg
//                 className="fill-current h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="flex mb-6">
//           <div className="relative flex-grow mr-2">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//             </div>
          
//           </div>
//           <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-md">
//             Search
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Bulbasaur Card */}
//           {
//               pokemons.map((pokemon, index) => {
//                   return (
                    
                 
//                     <div className="bg-white p-4 rounded-lg shadow-sm">
//                     <div className="flex justify-center mb-4">
//                       <img
//                         src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
//                         className="h-40 w-40"
//                       />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">
//                  {pokemon.name}
//                     </h3>
//                     <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`} className="text-blue-500 hover:text-blue-700">
                   
//                       Details →
                    
//                     </Link>
//                   </div>
                    
//                 )
//             })
//         }

   

//           {/* Venusaur Card */}
          
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }

"use client";   

import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);
  const [types, setTypes] = useState<string[]>([]);

  // Fetch Pokémon Types from API
  useEffect(() => {
    async function fetchTypes() {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      const data = await response.json();
      setTypes(data.results.map((t: { name: string }) => t.name));
    }
    fetchTypes();
  }, []);

  // Filter Pokémon based on search and selected type
  useEffect(() => {
    let results = pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (type) {
      async function filterByType() {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const typePokemons = data.pokemon.map((p: any) => p.pokemon.name);
        results = results.filter((p) => typePokemons.includes(p.name));
        setFilteredPokemons(results);
      }
      filterByType();
    } else {
      setFilteredPokemons(results);
    }
  }, [search, type, pokemons]);

  return (
    <div className="bg-gray-300 min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Pokémon Search & Filter
        </h1>

        <div className="bg-gray-200 p-6 rounded-lg shadow-sm">
          {/* Dropdown Select */}
          <div className="mb-4">
            <div className="relative">
              <select
                className="appearance-none w-full md:w-96 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex mb-6">
            <div className="relative flex-grow mr-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Pokémon..."
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Pokémon List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredPokemons.map((pokemon) => (
              <div key={pokemon.name} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <img
                    src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                    className="h-40 w-40"
                    alt={pokemon.name}
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                  {pokemon.name}
                </h3>
                <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`} className="text-blue-500 hover:text-blue-700">
                   
                    Details →
                    
                  </Link>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPokemons.length === 0 && (
            <p className="text-center text-gray-700 mt-4">No Pokémon found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// 🟢 Fetch Pokémon Data Using SSR
export async function getServerSideProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

  return {
    props: {
      pokemons: data.results,
    },
  };
}


