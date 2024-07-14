const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200,h_200');
});

const opts = { toJSON: { virtuals: true } };

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    images: [imageSchema],
    lastActivity: {
        type: Date,
        default: Date.now,
    },
    interactions: {
        type: Number,
        default: 0
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }, opts);

// Configure passportLocalMongoose to use email as the username field
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
