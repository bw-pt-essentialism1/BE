const server = require('./server.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});