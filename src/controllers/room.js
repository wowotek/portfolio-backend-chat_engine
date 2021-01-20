const uuid = require("uuid").v4;
const crypto = require("crypto");

const Room = require("../models/room").Room;
const EAuthority = require("./externals/authority");


module.exports.createNewRoom = async (
    creator_recipient_username= null
) => {
    const now = new Date();
    let roomModel = {
        creation: new Date(),
        recipients: []
    };

    // Recipient Creation
    let recipient;
    if(creator_recipient_username != null){
        // For Registered User
        recipient = {
            username: creator_recipient_username,
            is_valid_user: true,
            joined: new Date()
        };
    } else {
        // For Unregistered User
        const hasher = crypto.createHash("sha512");
        const userGuid = uuid().toString();
        hasher.update(`${userGuid}@${now}`);

        recipient = {
            user_id: hasher.digest("hex").toString(),
            is_valid_user: false,
            joined: new Date()
        };
    }

    // add Recipient to room
    roomModel.recipients.push(recipient);

    // Validate User and Return

    // TODO: i don't like this syntax, is this better ?
    if(recipient.is_valid_user)
        return await EAuthority.getUserDetailsByUsername(creator_recipient_username).then(async result => {
            if(result.status){
                const room = new Room(roomModel);
                return await room.save().then(() => {
                    return {
                        status: true,
                        content: room
                    }
                })
            }
            throw Error("user_not_found");
        }).catch(err => {
            console.log(err.message);
            throw Error(err.message);
        });
    else {
        const room = new Room(roomModel);
        return await room.save().then(() => {
            return {
                status: true,
                content: room
            }
        });
    }     
}