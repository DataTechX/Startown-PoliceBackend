import fastify from 'fastify'

const app = fastify()
const api = '/api/v1'
app.register(require('@fastify/cors'), {
    origin: '*',
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
})
import oauthPlugin from './routes/auth'
app.register(oauthPlugin, { prefix: `${api}` })

app.post('/test', async (request, reply) => {
    // reply.send('เข้ามาทำไม')
    console.log('crack', request.body);
    
})
app.post('/testx', async (request, reply) => {
    // reply.send('เข้ามาทำไม')
    console.log('not crack', request.body);
    
})


app.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

