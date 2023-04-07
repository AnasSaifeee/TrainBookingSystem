const mongoose = require ('mongoose');
const bookingSchema = new mongoose.Schema({
    coaches:{
        coachA:{
            rowA0:{
               type:Number,
        },
            rowA1:{
               type:Number,
        },
            rowA2:{
               type:Number,
        },
            rowA3:{
               type:Number,
        },
            rowA4:{
               type:Number,
        },
            rowA5:{
               type:Number,
        },
            rowA6:{
               type:Number,
        },

            rowA7:{
               type:Number,
        },
            rowA8:{
               type:Number,
        },
            rowA9:{
               type:Number,
        },
            rowA10:{
               type:Number,
        },
            rowA11:{
               type:Number,
        },
            rowA12:{
               type:Number,
        },
    },
    
   
}})

const BookingSeats = mongoose.model("bookingSchema",bookingSchema)

module.exports={BookingSeats}