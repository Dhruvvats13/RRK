const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://dhruvsharma2002:Dhruvsharma12@cluster0.yshx9q4.mongodb.net/rrkmern?retryWrites=true&w=majority';

const connectToMongo = () => {
  return mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("connected to mongo");
      return Promise.all([
        mongoose.connection.db.collection("food_items").find({}).toArray(),
        mongoose.connection.db.collection("foodCategory").find({}).toArray()
      ]);
    })
    .then(([data, CatData]) => {
      return { data, CatData };
    })
    .catch(err => console.log("---" + err));
};

module.exports = connectToMongo;
