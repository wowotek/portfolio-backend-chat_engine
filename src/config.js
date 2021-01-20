const SERVICE = {
    HOST: process.env.SERVICE_HOST || "0.0.0.0",
    PORT: process.env.SERVICE_PORT || 8000
};

const DATABASE = {
    HOST: process.env.DATABASE_HOST || "127.0.0.1",
    PORT: process.env.DATABASE_PORT || 27017
};

const EXTERNAL = {
    AUTHORITY: {
        HOST: process.env.AUTHORITY_HOST || "127.0.0.1",
        PORT: process.env.AUTHORITY_PORT || 8101
    }
}


module.exports = {
    SERVICE,
    DATABASE,
    EXTERNAL
};