const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://darren-user:jpmpNIJHLvEA0UVu@cluster0.2yyh4.mongodb.net/shopping_cart?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected');
            _db = client.db()
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!'

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;