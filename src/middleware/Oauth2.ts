// import { AuthTokenRequest } from '../types/types.oauth'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoClient } from 'mongodb'
import DiscordOauth2 from 'discord-oauth2'
import { Client, IntentsBitField } from 'discord.js'
const mongoClient = new MongoClient('mongodb://localhost:27017')

mongoClient.connect().then(() => {
    console.log('Connected to MongoDB')
})

const database = mongoClient.db('Startown')
const users = database.collection('users')

const client = new Client({ intents: 270336 })

client.on('ready', () => {
    console.log('Bot is ready')
})


const oauth = new DiscordOauth2()

type AuthTokenRequest = {
    code: string
}

function genarateToken(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomText = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters[randomIndex];
    }
    return randomText;
}


export const Oauth2 = async (request: FastifyRequest, reply: FastifyReply) => {

    const data = request.body as AuthTokenRequest

    const token = await oauth.tokenRequest({
        clientId: '887754162731909171',
        clientSecret: 'QwYS1M9oR_3Im6CXpjrFQSbwHvO83yDx',
        code: data.code,
        scope: 'identify',
        grantType: 'authorization_code',
        redirectUri: 'http://127.0.0.1:3000/'
    })

    const user = await oauth.getUser(token.access_token)
    const user_check = await users.findOne({ id: user.id })
    if (user_check) {
        let token = genarateToken(10)
        await users.updateOne({ id: user.id }, { $set: { token: token } })
        await reply.send({
            status: 200, 
            data: {
                uuid: user.id,
                
                token: token
            }
        })
    } else {

    }




}