declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD : string;
        DB_PORT : string;
        POSTGRES_DB: string;
        NODE_ENV: string;
        HOST: string;
        CORS_ORIGIN: string;
 
        SERVER_SMTP: string;
        PORT_SMTP: string;
        LOGIN_EMAIL: string;
        PASSWORD_EMAIL: string;
        FROM_EMAIL: string;
    }
}