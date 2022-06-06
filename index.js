const app = require('./app')
const chalk = require('chalk')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(chalk.yellow.inverse(('Gramoday backend server is up and running on port ' + PORT)))
})