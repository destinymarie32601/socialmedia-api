///const mongoose = require('mongoose');
const moment = require('moment'); //import required modules
const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema( //reaction schema
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type:String,
            required:true,
            maxLength:280
        },
        username: {
            type:String,
            required: true,
        },
        createdAt: {
            type:Date,
            default: Date.now,
            get: function(timestamp) {
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            }
        }

    }
);
module.exports = ReactionSchema; //export reaction schema