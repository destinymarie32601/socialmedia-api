const mongoose = require('mongoose');
const moment = require('moment');
const { Schema, model } = mongoose;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema ( 
    {
       thoughtText: {
        type:String,
        required: true,
        minLength: 1,
        maxLength: 280
       },
       createdAt: {
        type:Date,
        default: Date.now,
        get: function(timestamp) {
            return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
       },
       username: {
        type: String,
        required:true
       },
       reactions:[reactionSchema]

    },
    {
        toJSON: {
            getters: true
        },
        id:false
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;