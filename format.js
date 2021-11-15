const colors = require('colors')

// helpers
const sanitizeDamageRelations = hash =>
  Object.entries(hash).reduce(
    (hash, [k, v]) => ({ ...hash, [k]: v.map(i => i.name) }),
    {}
  )

const sanitizePokemon = pkmn => ({
  ...pkmn,
  types: pkmn.types.map(({ type }) => type.name),
})

const formatMoves = moves =>
  moves
    .sort((a, b) => a.level - b.level)
    .map(
      ({ level, name }) =>
        `${String(level).padStart(3)} | ${name.replace(/-/g, ' ')}`
    )
    .join('\n')

const typeColors = {
  normal: colors.white('normal'),
  fighting: colors.red('fighting'),
  flying: colors.cyan('flying'),
  poison: colors.magenta('poison'),
  ground: colors.grey('ground'),
  rock: colors.red('rock'),
  bug: colors.magenta('bug'),
  ghost: colors.magenta('ghost'),
  steel: colors.bgGrey.black('steel'),
  fire: colors.bgRed.black('fire'),
  water: colors.blue('water'),
  grass: colors.green('grass'),
  electric: colors.yellow('electric'),
  psychic: colors.magenta('psychic'),
  ice: colors.cyan('ice'),
  dragon: colors.cyan('dragon'),
  dark: colors.bgGrey.white('dark'),
  fairy: colors.magenta('fairy'),
  unknown: colors.white('unknown'),
  shadow: colors.bgGrey.white('shadow'),
}

module.exports = {
  formatMoves,
  sanitizeDamageRelations,
  sanitizePokemon,
  typeColors,
}
