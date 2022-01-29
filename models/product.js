const fs = require('fs');
const path = require('path');

// Path to my file system helper function
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getPoductsFromFile = (cb) => {

    // Check to insert empty array if no content
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cd([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getPoductsFromFile(products => {
            // Push to file if content
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getPoductsFromFile(cb);
    }
}