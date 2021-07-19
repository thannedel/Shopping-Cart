const express = require('express');
const axios = require ('axios')
const app = express();


app.get('/products', (req, res) => {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const results = {}
            results.totalNumberOfPages = {
                pages: Math.ceil(response.data.length/limit)
            }
            if (endIndex < response.data.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.results = response.data.slice(startIndex, endIndex)
            res.json(results)})
        .catch(err => console.error(err));
})


const PORT = 5000
app.listen(PORT, () => {console.log(`Server started on ${PORT}`)})