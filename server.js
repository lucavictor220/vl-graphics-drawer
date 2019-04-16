const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

var options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}

app.use(express.static('./', options))

app.get('/', (req, res) => {
  const index = fs.readFileSync('./index.html', 'utf-8');
  res.send(index);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))