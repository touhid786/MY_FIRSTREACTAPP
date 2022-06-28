const { default: mongoose } = require("mongoose");

function DbConnect () {
    const DB_URL =process.env.DB_URL;

    mongoose.connect(DB_URL, { 

    });

    const db=mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to MongoDB');
    }
    );

}

module.exports=DbConnect;