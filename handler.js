const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
export const hello = async (event, context) => {
  mongoose.connect(
    process.env.ATLAS_URI,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection successful!");
  });
};