const  User  = require('../models/User');

const userController = { 
    getAllUsers( req, res) { //get all users
        User.find({})
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get single user by id and populated thought/friends
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .select("-__v")
        .populate({
            path: "friends",
        })
        .populate({
            path: "thoughts",
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //post a new user
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
    //put to update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {
            new: true,
            runValidators:true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    //delete to remove user by id
    deleteUser ({ params}, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    //post to add friend to user list
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new:true, runValidators:true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    //delete to remove friend from users friend list
    removeFriend({ params }, res) {
        console.log("remove fried", params.friendId);
        User.findOneAndUpdate (
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true}
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
};
module.exports = userController;