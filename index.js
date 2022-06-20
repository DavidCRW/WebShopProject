//BASIC
const express = require('express');
const app = express();

//STATIC
app.use(express.static('public'))
app.use(express.static('node_modules'))


//VIEWS
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})
app.get('/blog', (req, res) => {
    res.sendFile(`${__dirname}/views/blog.html`)
})
app.get('/phones', (req, res) => {
    res.sendFile(`${__dirname}/views/phones.html`)
})
app.get('/phonecases', (req, res) => {
    res.sendFile(`${__dirname}/views/phonecases.html`)
})
app.get('/watches', (req, res) => {
    res.sendFile(`${__dirname}/views/watches.html`)
})

//MONGODB
function getMongoDB() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "Gitre";
    return client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}


//PHONES PAGE
app.get('/dataPhones', (req, res) => {
    const client = getMongoDB();
    client.connect( async (err) => {
        const collection = client.db("webshop").collection("phones");
        const data = await collection.find().toArray();
        res.send(data)
        client.close();
    });
})

//PHONECASES PAGE
app.get('/dataPhoneCases', (req, res) => {
    const client = getMongoDB();
    client.connect( async (err) => {
        const collection = client.db("webshop").collection("phonecases");
        const data = await collection.find().toArray();
        res.send(data)
        client.close();
    });
})


//WATCHES PAGE
app.get('/dataWatches', (req, res) => {
    const client = getMongoDB();
    client.connect( async (err) => {
        const collection = client.db("webshop").collection("watches");
        const data = await collection.find().toArray();
        res.send(data)
        client.close();
    });
})



//SERVER START
app.listen(3000)