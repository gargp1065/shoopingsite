var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adressSchema = new Schema({
    line1: {
        type: String,
        required:true
    },

    line2: {
        type: String,
        required:true
    },
    landmark: {
        type: String,
        required:true
    },

    city: {
        type: String,
        required:true
    },

    state: {
        type: String,
        required:true
    },

    country: {
        type: String,
        required:true
    },

    pincode: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    }
})
const UserSchema = new Schema ({

    name: {
        type: String,
        required: true,
        // unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: [adressSchema]
});


module.exports = User = mongoose.model("users", UserSchema);