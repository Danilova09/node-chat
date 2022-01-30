const fs = require('fs').promises;
const {nanoid} = require('nanoid');
const fileName = './dataBase.json';
let data = [];

module.exports = {
    async init () {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    getMessages() {
        return data;
    },
    addItem(item) {
        item.id = nanoid();
        item.datetime = new Date().toISOString();
        data.push(item);
        return this.save();
    },
    save() {
        return fs.writeFile(fileName, JSON.stringify(data,null, 2));
    }
}