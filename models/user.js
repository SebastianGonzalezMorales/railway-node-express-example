const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

usersSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', usersSchema);
exports.usersSchema = usersSchema;
