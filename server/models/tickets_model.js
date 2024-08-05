const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId:{
        type:Number,
        required: true
    },
    partyName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    purchasedDate:{
        type: Date,
        required: true
    },
    price:{
        type:Number,// Price in dollars
        required: true
    },
    promoCode:{
        type: String,
       

    }
})

module.exports =  mongoose.model('Tickets', ticketSchema);