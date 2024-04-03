const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function connect() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/music-streaming-website',
            opts,
        );
        console.log('Connected to MongoDB.');
    } catch (e) {
        console.log('Error connecting to MongoDB!');
    }
}

module.exports = { connect };
