const pokemonTypes = [
  {
    name: "all",
    color: "#f7f7f7",
    textColor: "#1c1c1c",
  },
  {
    name: "normal",
    color: "#A8A878",
    textColor: "#f7f7f7",
  },
  {
    name: "fire",
    color: "#F08030",
    textColor: "#f7f7f7",
  },
  {
    name: "water",
    color: "#6890F0",
    textColor: "#f7f7f7",
  },
  {
    name: "electric",
    color: "#F8D030",
    textColor: "#f7f7f7",
  },
  {
    name: "grass",
    color: "#78C850",
    textColor: "#f7f7f7",
  },
  {
    name: "ice",
    color: "#98D8D8",
    textColor: "#f7f7f7",
  },
  {
    name: "fighting",
    color: "#C03028",
    textColor: "#f7f7f7",
  },
  {
    name: "poison",
    color: "#A040A0",
    textColor: "#f7f7f7",
  },
  {
    name: "ground",
    color: "#E0C068",
    textColor: "#f7f7f7",
  },
  {
    name: "flying",
    color: "#A890F0",
    textColor: "#f7f7f7",
  },
  {
    name: "psychic",
    color: "#F85888",
    textColor: "#f7f7f7",
  },
  {
    name: "bug",
    color: "#A8B820",
    textColor: "#f7f7f7",
  },
  {
    name: "rock",
    color: "#B8A038",
    textColor: "#f7f7f7",
  },
  {
    name: "ghost",
    color: "#705898",
    textColor: "#f7f7f7",
  },
  {
    name: "dragon",
    color: "#7038F8",
    textColor: "#f7f7f7",
  },
  {
    name: "steel",
    color: "#B8B8D0",
    textColor: "#f7f7f7",
  },
  {
    name: "fairy",
    color: "#EE99AC",
    textColor: "#f7f7f7",
  },
];

const pokemonList = document.getElementById("pokemon-list");
function showPokemon(pokemon) {
  let pokeId = pokemon.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const pokemonItem = document.createElement("div");
  pokemonItem.classList.add("pokemon-item");
  pokemonItem.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-image">
      <img src="${
        pokemon.sprites.other["official-artwork"].front_default
      }" alt="${pokemon.name}">
    </div>
    <div class="pokemon-info">
      <div class="pokemon-name-frame">
        <p class="chip pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-name">${pokemon.name}</h2>
      </div>
      <div class="pokemon-types">
        ${pokemon.types
          .map((type) => {
            const colorBtn = pokemonTypes.find(
              (pokemonType) => pokemonType.name === type.type.name
            ).color;
            const textColorBtn = pokemonTypes.find(
              (pokemonType) => pokemonType.name === type.type.name
            ).textColor;

            return `<p class="${type.type.name} pokemon-type chip" style="background-color: ${colorBtn}; color: ${textColorBtn}">${type.type.name}</p>`;
          })
          .join("")}
      </div>
      <div class="pokemon-stats">
        <p class="chip pokemon-stat">${pokemon.height}m</p>
        <p class="chip pokemon-stat">${pokemon.weight}kg</p>
      </div>
    </div>
  `;

  pokemonList.append(pokemonItem);
}

const navList = document.getElementById("nav-list");
const buildShowPokemonType = (pokemonDataArray) => (pokemonType) => {
  const navItem = document.createElement("li");
  navItem.classList.add("nav-item");

  const colorBtn = pokemonTypes.find(
    (type) => pokemonType.name === type.name
  ).color;

  const textColorBtn = pokemonTypes.find(
    (type) => pokemonType.name === type.name
  ).textColor;

  navItem.innerHTML = `
    <button id="${pokemonType.name}" class="chip nav-item-btn" style="background-color: ${colorBtn}; color: ${textColorBtn}">${pokemonType.name}</button>
  `;

  navItem.addEventListener("click", () => {
    pokemonList.innerHTML = "";

    const pokemonDataArrayFilter =
      pokemonType.name === "all"
        ? pokemonDataArray
        : pokemonDataArray.filter((data) =>
            data.types.some((type) => type.type.name.includes(pokemonType.name))
          );

    pokemonDataArrayFilter.forEach((data) => showPokemon(data));
  });

  navList.append(navItem);
};

const requests = [];
for (let i = 1; i <= 196; i++) {
  requests.push(
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) =>
      response.json()
    )
  );
}

Promise.all(requests)
  .then((pokemonDataArray) => {
    pokemonDataArray.forEach((data) => showPokemon(data));
    const showPokemonType = buildShowPokemonType(pokemonDataArray);
    pokemonTypes.forEach((pokemonType) => showPokemonType(pokemonType));
  })
  .catch((error) => {
    console.error("Error al obtener los datos de los Pokémon:", error);
  });
