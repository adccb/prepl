const readline = require('readline')
const { formatMoves } = require('./format.js')
const { moveLevelsFor, typeInteractionsFor } = require('./command.js')
const { validatePokemon } = require('./util.js')

process.stdin.resume()
process.stdin.setEncoding('utf8')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.emitKeypressEvents(process.stdin)
process.on('SIGINT', process.exit)

rl.on('line', async chunk => {
  const [command, pkmn, modifier] = chunk.split(/\s+/)

  switch (command) {
    case 'my':
      validatePokemon(pkmn)
        .then(pkmn =>
          moveLevelsFor(pkmn, modifier).then(moveset =>
            Object.entries(moveset).forEach(([method, moves]) => {
              console.log()
              console.log(method)
              console.log(formatMoves(moves))
              console.log()
            })
          )
        )
        .catch(console.log)
      break
    case 'a':
    case 'an':
    case 'against':
      validatePokemon(pkmn)
        .then(() => typeInteractionsFor(pkmn).then(console.log))
        .catch(console.log)
      break
  }
})
