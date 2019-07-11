const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const {logMsg} = require('./simpleLogger');

var url = "mongodb://localhost:27017/mydb";

const put = async (quote) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db('mydb');

        let collection = db.collection('quotes');
        let res = await collection.insertOne(quote);
        
        if (res) {
            await logMsg('INFO', 'Inserted quote');
            return "Quote saved!"
        }
        return "Something went wrong :("
    } catch (e) {
        console.log(e);
    }
}

const get = async (user) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return
    }

    try {
         const db = client.db('mydb')
         
         let collection = db.collection('quotes');
         let quotes = await collection.find({user: user}).toArray();
  
         if (quotes) {
            await logMsg('INFO', 'fetch quotes for user: ' + user)
            return quotes;
         }
         return "Something went wrong"
    } catch (e) {
         console.log(e);
    }
}
const getRelease = async (release) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db('mydb');

        let collection = db.collection('releases');
        var res = await collection.find().limit(1).sort({$natural: -1}).toArray();
        
        if (res) {
            await logMsg('INFO', 'fetched release');
            console.log(res)
            return res
        } else {
	   console.log("Somethign went wrong")
        }
    } catch (e) {
        console.log(e);
    }
}

const putRelease = async (release) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db('mydb');

        let collection = db.collection('releases');
        var res = await collection.insertOne({name: release})

        if (res) {
            await logMsg('INFO', 'fetched release');
            return res
        } else {
           console.log("Somethign went wrong")
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    put,
    get,
    getRelease,
    putRelease
}

