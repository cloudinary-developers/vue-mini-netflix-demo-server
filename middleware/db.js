// ./middlewares/db.js
var mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    banner: String,
    trailer: String,
    created_at: Date,
    id: mongoose.Schema.ObjectId
})

module.exports = {
    // Connect/Disconnect middleware
    connectDisconnect: (req, res, next) => {
        // Create connection using Mongo Lab URL
        // available in Webtask context
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        // Create a mongoose model using the Schema
        req.movieModal = connection.model('Movie', MovieSchema);
        req.on('end', () => {
            // Disconnect when request
            // processing is completed
            mongoose.connection.close();
        })
        // Call next to move to
        // the next Express middleware
        next()
    },
}