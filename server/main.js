
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const db = require('./models')

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
})

const app = express()
server.applyMiddleware({ app, path: '/api' })

app.use(express.static('app/public'))

db.sequelize.sync().then(async () => {
  const ostTypes = await db.type.findAll()
  if (!ostTypes.length) {
    await db.type.bulkCreate([
      { name: 'Original Soundtrack' },
      { name: 'GameRip' },
      { name: 'Vocal' },
      { name: 'Arrangement' }
    ])
  }
  const ostClass = await db.class.findAll()
  if (!ostClass.length) {
    await db.class.bulkCreate([
      { name: 'Game' },
      { name: 'Animation' }
    ])
  }
  const listener = app.listen({ port: 3005 }, () =>
    console.log(`🚀 Server ready at http://localhost:${listener.address().port}${server.graphqlPath}`)
  )
})
