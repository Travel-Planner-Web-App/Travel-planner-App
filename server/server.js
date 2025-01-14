const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('react')
});

app.listen(3000, () =>{
    console.log("Server Online")
    console.log("Likewise")
})