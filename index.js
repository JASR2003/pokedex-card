const getRandomPokemon = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
  const numberRandom = getRandomPokemon(1, 500);
  fetchData(numberRandom);
})


const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json()

    console.log(data);

    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      hp: data.stats[0].base_stat,
      xp: data.base_experience,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      ataqueEsp: data.stats[3].base_stat,
    }
    crearCard(pokemon);
  } catch (error) {
    console.log(error)
  }
}

const crearCard = (pokemon) => {

  const flex = document.querySelector('.flex');
  const template = document.getElementById('template-card').content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment() 

  clone.querySelector('.card-header-img').setAttribute('src' , pokemon.img);
  clone.querySelector('.card-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
  clone.querySelector('.card-experience').innerHTML = `${pokemon.xp} exp`;
  clone.querySelectorAll('.card-value h3')[0].textContent = pokemon.ataque + 'K';
  clone.querySelectorAll('.card-value h3')[1].textContent = pokemon.ataqueEsp + 'K';
  clone.querySelectorAll('.card-value h3')[2].textContent = pokemon.defensa + 'K';

  fragment.appendChild(clone);
  flex.appendChild(fragment);
}

