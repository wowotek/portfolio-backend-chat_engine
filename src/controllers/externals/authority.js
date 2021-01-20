const axios = require("axios").default;

const AuthorityConfig = require("../../config").EXTERNAL.AUTHORITY;

const HOST = `http://${AuthorityConfig.HOST}:${AuthorityConfig.PORT}`;
const AXIOS_CONFIG = {
    headers: {
        "x-api-key": process.env.RESTRICTED_API_KEY || "SECRET_DEVELOPMENT_KEY"
    }
};
AXIOS_CONFIG.headers[process.env.RESTRICTED_HEADER_NAME || "SECRET_DEVELOPMENT_HEADER_NAME"] = process.env.RESTRICTED_HEADER_VALUE || "SECRET_DEVELOPMENT_HEADER_VALUE";

module.exports.ping = async () => {
    const ENDPOINT = `${HOST}/misc/ping`;

    return await axios.get(
        ENDPOINT,
        AXIOS_CONFIG
    ).then(async response => {
        if(response.status == 200){
            if(response.data.status.toLowerCase() == "success"){
                if(response.data.content.toLowerCast() == "pong!"){
                    return true;
                }
            }
        }
        throw Error("not_responding");
    }).catch(err => {
        console.log(err.message);
        throw Error("not_responding");
    });
};

module.exports.getUserDetailsByUsername = async (
    target_username
) => {
    const ENDPOINT = `${HOST}/user/details/username/${target_username}`;

    return await axios.get(
        ENDPOINT,
        AXIOS_CONFIG
    ).then(async response => {
        if(response.status == 200){
            if(response.data.status == "success"){
                return response.data.content
            }
        }
        throw Error("user_not_found");
    }).catch(async err => {
        console.log(err.message);
        throw Error("user_not_found");
    });
}