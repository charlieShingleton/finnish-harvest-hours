module.exports = {
  connectMongoose
};

const mongoose = require("mongoose");

const mongo = {
  host: "127.0.0.1",
  port: "27017",
  name: "saldot"
};

let db;

function connectMongoose() {
  return new Promise((resolve, reject) => {
    if (db) {
      return db;
    }
    mongoose.Promise = global.Promise;

    // database connect
    return mongoose
      .connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.name}`, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log(`MongoDB connection created on port: ${mongo.port}`);
        resolve(db);
      })
      .catch(err => {
        console.error(
          new Error(
            `Error creating MongoDB connection: is the mongo server running?`
          )
        );
        reject(err);
      });
  });
}
