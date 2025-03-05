export async function getPokemonTypes() {
    const res = await fetch("https://pokeapi.co/api/v2/type", { cache: "no-store" });
    const data = await res.json();
    return data.results.map((type: any) => type.name);
  }
  
  export async function getPokemonsByType(type: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`, { cache: "no-store" });
    const data = await res.json();
    return data.pokemon.map((p: any) => p.pokemon);
  }
  

  export async function getPokemonDetails(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { cache: "no-store" });
    return res.json();
  }