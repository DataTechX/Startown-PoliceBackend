import { FastifyRequest} from "fastify"


export type AuthTokenRequest = FastifyRequest<{

    Body: {
        Token_key: string,
        Authentication: string,
        AuthenticationToken: number
    }

}>