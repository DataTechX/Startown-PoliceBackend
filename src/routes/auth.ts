import { FastifyInstance } from "fastify";
import { Oauth2 } from "../middleware/Oauth2";

const oauthPlugin = async (fastify: FastifyInstance, options: any) => {
    fastify.post('/oauth', Oauth2)
}

export default oauthPlugin