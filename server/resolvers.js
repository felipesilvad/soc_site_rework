module.exports = {
  Ost: {
    artists: (parent, args, context, info) => parent.getArtists(),
    classes: (parent, args, context, info) => parent.getClasses(),
    types: (parent, args, context, info) => parent.getTypes(),
    platforms: (parent, args, context, info) => parent.getPlatforms(),
    games: (parent, args, context, info) => parent.getGames(),
    links: (parent, args, context, info) => parent.getLinks(),
    discs: (parent, args, context, info) => parent.getDiscs()
  },

  Game: {
    series: (parent, args, context, info) => parent.getSeries(),
    publishers: (parent, args, context, info) => parent.getPublishers()
  },

  Series: {
    games: (parent, args, context, info) => parent.getGames()
  },

  Publisher: {
    games: (parent, args, context, info) => parent.getGames()
  },

  Query: {
    osts: (parent, args, { db }, info) => db.ost.findAll(),
    artists: (parent, args, { db }, info) => db.artist.findAll(),
    platforms: (parent, args, { db }, info) => db.platform.findAll(),
    publishers: (parent, args, { db }, info) => db.publisher.findAll(),
    classes: (parent, args, { db }, info) => db.class.findAll(),
    series: (parent, args, { db }, info) => db.series.findAll(),
    types: (parent, args, { db }, info) => db.type.findAll(),
    games: (parent, args, { db }, info) => db.game.findAll(),
    ost: (parent, { id }, { db }, info) => db.ost.findByPk(id)
  },

  Mutation: {
    createArtist: async (parent, data, { db }, info) => {
      const result = await db.artist.create(data)
      return result.dataValues
    },
    createPlatform: async (parent, data, { db }, info) => {
      const result = await db.platform.create(data)
      return result.dataValues
    },
    createPublisher: async (parent, data, { db }, info) => {
      const result = await db.publisher.create(data)
      return result.dataValues
    },
    createSeries: async (parent, data, { db }, info) => {
      const result = await db.series.create(data)
      return result.dataValues
    },
    createGame: async (parent, data, { db }, info) => {
      console.log(data)
      const game = await db.game.create(data)

      await game.setSeries(data.series)
      await game.setPublishers(data.publishers)

      return game.dataValues
    },
    createOst: (parent, data, { db }, info) => {
      console.log(data)
    }
  }
}
