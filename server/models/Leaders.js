const {Schema, model} = require('mongoose');

const leaderSchema = new Schema({
    leaderName: {
        type: String,
        required: true,
        trim: true
    },
    leaderBio: {
        type: String,
        required: true,
        trim: true
    },
    leaderPhone: {
        type: String,
        required: true,
        trim: true
    },
    leaderEmail: {
        type: String,
        required: true,
        trim: true
    },
    leaderImage: {
        type: String,
        trim: true
    }
});

const Leaders = model('Leaders', leaderSchema);

module.exports = Leaders;