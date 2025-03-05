import { getPokemonDetails } from "@/lib/api";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PokemonDetailsProps {
  params: {
    name: string; // Explicitly set as string instead of `any`
  };
}

export default async function PokemonDetails({ params }: PokemonDetailsProps) {
  const pokemon = await getPokemonDetails(params.name);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Pokémon Details
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="flex items-center text-teal-600 hover:text-teal-800 mb-6 font-medium transition duration-300">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>

          <div className="overflow-hidden rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-8 flex justify-center rounded-t-lg">
              <img
                src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                alt={`${pokemon.name} image`}
                className="h-64 w-64 object-contain drop-shadow-lg"
              />
            </div>

            <div className="bg-yellow-200 p-6 rounded-b-lg">
              <div className="mb-3">
                <span className="font-bold text-gray-900">Name:</span>
                <span className="text-gray-800 ml-2 capitalize">{pokemon.name}</span>
              </div>

              <div className="mb-3">
                <span className="font-bold text-gray-900">Height:</span>
                <span className="text-gray-800 ml-2">{pokemon.height}</span>
              </div>

              <div className="mb-3">
                <span className="font-bold text-gray-900">Weight:</span>
                <span className="text-gray-800 ml-2">{pokemon.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
