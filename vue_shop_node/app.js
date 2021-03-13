const express = require('express')
const compression = require('compression')
const history = require('connect-history-api-fallback');

const app = express()

// 刷新出现404问题
app.use(history({
    verbose: true,
    index: '/'
}))

// 一定要写到静态托管之前，gzip
app.use(compression())
app.use(express.static('./dist'))

app.listen(3456, () => {
    console.log('server running at http://127.0.0.1:3456')
})
