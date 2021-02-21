const fs = require('fs')

const [version] = process.argv.slice(2)
console.log('myArgs: ', version)

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
packageJson.version = `${version}`
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf8')
