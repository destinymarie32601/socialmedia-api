const mongoose = require('mongoose'); //import required modules
const { Schema, model } = mongoose;
const Thought = require("./Thought");

//user schema
const userSchema = new Schema( //define the userinput 
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, //match to an email
    thoughts: [ //attatch the thoughts and friends to user
        {
            type:Schema.Types.ObjectId,
            ref: Thought,
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User; //export user
