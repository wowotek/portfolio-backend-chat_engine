const Schema = require("mongoose").Schema;
const models = require("mongoose").model;


const RoomModels = {
    recipients: {
        // Contain Username, stored by Authority
        type: [
            {
                username: {
                    type: String,
                    required: true
                },
                is_valid_user: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                joined: {
                    type: Date,
                    required: true,
                    default: () => new Date()
                }
            }
        ],
        required: true
    },
    creation: {
        type: Date,
        required: true,
        default: () => new Date()
    }
};

const RoomScheme = new Schema(RoomModels);
const Room = models("rooms", RoomScheme);


module.exports = {
    Room
};