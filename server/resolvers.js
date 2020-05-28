const base64Img = require('base64-img')
module.exports = {
  Ost: {
    artists: (parent, args, context, info) => parent.getArtists(),
    classes: (parent, args, context, info) => parent.getClasses(),
    types: (parent, args, context, info) => parent.getTypes(),
    platforms: (parent, args, context, info) => parent.getPlatforms(),
    games: (parent, args, context, info) => parent.getGames(),
    links: (parent, args, context, info) => parent.getLinkCategories(),
    discs: (parent, args, context, info) => parent.getDiscs(),
    related: (parent, args, context, info) => parent.getRelated()
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

  Disc: {
    ost: (parent) => parent.getOst()
  },

  Query: {
    osts: async (parent, args, { db }, info) => db.ost.findAll(),
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
      base64Img.imgSync(data.cover, '../public/img/series', result.dataValues.slug)
      return result.dataValues
    },
    createGame: async (parent, data, { db }, info) => {
      const game = await db.game.create(data)
      await Promise.all([
        game.setSeries(data.series),
        game.setPublishers(data.publishers)
      ])
      base64Img.imgSync(data.cover, '../public/img/game', game.dataValues.slug)

      return game.dataValues
    },
    createOst: async (parent, data, { db }, info) => {
      const ost = await db.ost.create(data)

      await Promise.all([
        new Promise((resolve, reject) => {
          Promise.all(
            data.artists.map(a => db.artist.findOrCreate(
              {
                where: { name: a }
              }
            ))
          ).then(artists => {
            return ost.setArtists(artists.map(a => a[0].dataValues.id))
          }).then(resolve)
            .catch(reject)
        }),
        Promise.all(data.links.map(async category => {
          const linkCategory = await ost.createLinkCategory(category)
          await Promise.all(category.links.map(link => linkCategory.createLink(link)))
        })),
        Promise.all(data.discs.map(d => ost.createDisc(d))),
        ost.setPlatforms(data.platforms),
        ost.setGames(data.games),
        ost.setTypes(data.types),
        ost.setClasses(data.classes),
        ost.setRelated(data.related),
        base64Img.imgSync(data.cover, '../public/img/ost', ost.dataValues.id)
      ])

      return ost
    }
  }
}
