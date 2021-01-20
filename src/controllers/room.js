const uuid = require("uuid").v4;
const crypto = require("crypto");
const Room = require("../models/room").Room;


module.exports.createNewRoom = async (
    creator_recipient_id = null
) => {
    const now = new Date();
    let roomModel = {
        creation: new Date(),
        recipients: []
    };

    // Recipient Creation
    let recipient;
    if(creator_recipient_id != null){
        // For Registered User
        recipient = {
            user_id: creator_recipient_id,
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

    // Validate User
    if(recipient.is_valid_user){
        // TODO: check with authority

        // TODO: throw error if authority's user not found
    }

    roomModel.recipients.push(recipient);
    const room = new Room(roomModel);
    await room.save();

    return {
        status: true,
        content: room
    }
}