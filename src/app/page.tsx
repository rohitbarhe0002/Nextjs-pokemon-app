import {  getPokemonsByType } from "@/lib/api";
import PokemonList from "../components/PokemonList";

export default async function Home() {
  const pokemons = await getPokemonsByType("fire"); 

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Pokémon Search</h1>
      <PokemonList pokemons={pokemons} />
    </main>
  );
}
