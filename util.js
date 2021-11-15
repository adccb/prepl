const validatePokemon = pkmn =>
  new Promise((res, rej) =>
    pkmn ? res(pkmn) : rej('you need a pokemon bro\n'.grey)
  )

module.exports = { validatePokemon }
