const { pokemon, types } = require('./api.js')
const { typeColors } = require('./format.js')

const moveLevelsFor = (pkmn, modifier) =>
  pokemon.then(allPokemon =>
    allPokemon
      .find(i => i.name === pkmn)
      .moves.reduce((hash, { move, version_group_details }) => {
        const name = move.name
        const applicableVersionGroup = version_group_details.find(
          i => i.version_group.name === 'firered-leafgreen'
        )
        if (!applicableVersionGroup) return hash

        const method = applicableVersionGroup.move_learn_method.name
        if (modifier && !new RegExp(method).test(modifier)) return hash

        const toAdd = { name, level: applicableVersionGroup.level_learned_at }

        return {
          ...hash,
          [method]: [...(hash[method] || []), toAdd],
        }
      }, {})
  )

const typeInteractionsFor = pkmn =>
  pokemon.then(allPokemon =>
    types.then(allTypes => {
      const foe = allPokemon.find(i => i.name === pkmn)
      const foeTypes = foe.types.map(type => allTypes[type])
      const displayTypes = foe.types.map(i => typeColors[i]).join(' | ')

      const displayInteractions = Object.keys(foeTypes[0])
        .map(key => {
          const allInteractions = Array.from(
            new Set(foeTypes.flatMap(type => type[key]))
          )
          const displayKey = key.replace(/_/g, ' ').padEnd(20)

          if (!allInteractions.length) return

          return `${displayKey} : ${allInteractions
            .map(i => typeColors[i])
            .join(' | ')}`
        })
        .filter(Boolean)

      return [`foe ${pkmn} ${displayTypes}\n`, ...displayInteractions].join(
        '\n'
      )
    })
  )

module.exports = { moveLevelsFor, typeInteractionsFor }
