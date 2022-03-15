const mongoose = require("mongoose");
// Ta bort kommentar för den text-sträng ni använder.
mongoose.connect(process.env.MONGO_DB);
// mongoose.connect(process.env.CONNECTION_STRING)
// mongoose.connect(process.env.DATABASE_CONNECTION)
