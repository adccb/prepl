const { sanitizeDamageRelations, sanitizePokemon } = require('./format.js')

const axios = require('axios')
const API_BASE = 'https://pokeapi.co/api/v2'

// api endpoint builders because ugh rest
const builders = {
  none: data => data,
  default: data => [API_BASE, data].join('/'),
  versionGroup: data => [API_BASE, 'version-group', data].join('/'),
  pokemon: data => [API_BASE, 'pokemon', data].join('/'),
}

// generic api request fn
const get = (endpoint, builder = builders.default) =>
  axios.get(builder(endpoint)).then(({ data }) => data)

// requests to be made once on load and held in a closure
const versionGroup = get('firered-leafgreen', builders.versionGroup)
const types = get('type')
  .then(({ results }) =>
    Promise.all(results.map(({ url }) => get(url, builders.none)))
  )
  .then(types =>
    types.reduce(
      (hash, { name, damage_relations }) => ({
        ...hash,
        [name]: sanitizeDamageRelations(damage_relations),
      }),
      {}
    )
  )

const pokemon = versionGroup
  .then(group => get(group.pokedexes[0].url, builders.none))
  .then(pokedex => pokedex.pokemon_entries)
  .then(entries =>
    Promise.all(
      entries.map(
        async ({ pokemon_species }) =>
          await get(pokemon_species.name, builders.pokemon)
      )
    )
  )
  .then(pokemon => Promise.resolve(pokemon.map(sanitizePokemon)))

module.exports = { builders, get, pokemon, types, versionGroup }
