module.exports = {
    apps: [
        {
            name: "backend-chat_engine",
            script: 'npm start',
            watch: true,
            ignore_watch: [
                "build",
                "node_modules"
            ],
            env: {
                NODE_ENV: "production",
                SERVICE_HOST: "0.0.0.0",
                SERVICE_PORT: 8002,
                DB_HOST: "localhost",
                DB_PORT: 27017,
                DB_NAME: "chat_engine",
                AUTHORITY_HOST: "127.0.0.1",
                AUTHORITY_PORT: 8001,
                RESTRICTED_API_KEY: "SECRET_DEVELOPMENT_KEY",
                RESTRICTED_HEADER_NAME: "SECRET_DEVELOPMENT_HEADER_NAME",
                RESTRICTED_HEADER_VALUE: "SECRET_DEVELOPMENT_HEADER_VALUE"
            }
        }
    ]
};