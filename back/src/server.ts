import express,{ Express } from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import useRouter from './routes';
import { initDbStore } from './config';

config();
/**
 * Classe représentant le serveur de l'application.
 */
export class Server {
    private app : Express;
    private port : number|string = 3000;

    /**
    * Initialise une nouvelle instance de la classe Server.
    */
    constructor() {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        console.log(process.env.CORS_ORIGIN);
        
        this.app.use(cors({
            origin : [
              process.env.CORS_ORIGIN
            ],
            credentials : true
          }));

         this.port = process.env.NODEJS_PORT || this.port;
    }

    /**
     * Initialise la base de données.
     * @throws {Error} Si une erreur survient lors de l'initialisation de la base de données.
     */
    public async initDb(){
        try {
            await initDbStore();
            console.log("Database initialized successfully");
          } catch (err) {
            console.error(`Error initializing database: ${err.message}`);
            process.exit(1); // Arrêtez le processus en cas d'erreur grave
        }
    }

    /**
    * Démarre le serveur.
    */
    public startServer = () => {
        this.onServerListen();
    };
    
    /**
      * Écoute les connexions sur le port spécifié.
      */
    private onServerListen = () => {
        this.app.listen(this.port, () => {
            console.log(`Express is listening at http://localhost:${this.port}`);
            console.log(`For exploring the apis open: http://localhost:${this.port}/api-docs`);
        });
    };


    /**
     * Récupère l'instance de l'application Express.
     * @returns {Express} L'instance de l'application Express.
     */
    public getApp = () => {
        return this.app;
    };

    /**
     * Configure les routes de l'application.
     */
    public setRoutes = () => {
        this.app.use(useRouter);
    };


}