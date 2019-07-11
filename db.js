const fs = require('fs'); // Node.js File System Module - allows me to work with the file system on my computer.
                          // Common use for the File System module: Read files || Create files || Update files || Delete files || Rename files
module.exports = {
    load: () => {
        let content = {};
        try {
            content = JSON.parse( fs.readFileSync('./db.json') ); // aici imi citeste local dintr-un fisier de tip JSON; eu trebuie sa le iau din BD
        } catch (err) {
            console.log( 'Empty db file' );
        }
        return content;
    },
    save: _content => {
        fs.writeFile('./db.json' , JSON.stringify(_content) , () => {} )
    }
}
