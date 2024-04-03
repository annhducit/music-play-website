class MongooseParser {
    toArray(mongooses) {
        return mongooses.map((m) => m.toObject());
    }
}

module.exports = new MongooseParser();
