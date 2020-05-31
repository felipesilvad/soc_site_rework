const base64Img = require('base64-img')
const { Op } = require('sequelize')

const img = (data, path, file) => {
  return new Promise((resolve, reject) => {
    base64Img.img(data, path, file, function (err, filepath) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(filepath)
    })
  })
}

module.exports = {
  Ost: {
    artists: (parent, args, context, info) => parent.getArtists(),
    classes: (parent, args, context, info) => parent.getClasses(),
    types: (parent, args, context, info) => parent.getTypes(),
    platforms: (parent, args, context, info) => parent.getPlatforms(),
    games: (parent, args, context, info) => parent.getGames(),
    links: (parent, args, context, info) => parent.getLinkCategories(),
    discs: (parent, args, context, info) => parent.getDiscs({ order: [['number', 'ASC']] }),
    related: (parent, args, context, info) => parent.getRelated(),
    available: (parent) => parent.getAvailables()
  },

  LinkCategory: {
    links: (parent, args, context, info) => parent.getLinks()
  },

  Game: {
    series: (parent, args, context, info) => parent.getSeries(),
    publishers: (parent, args, context, info) => parent.getPublishers(),
    platforms: (parent, args, context, info) => parent.getPlatforms()
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
    osts: (parent, args, { db }, info) => db.ost.findAll(),
    artists: (parent, args, { db }, info) => db.artist.findAll(),
    platforms: (parent, args, { db }, info) => db.platform.findAll(),
    publishers: (parent, args, { db }, info) => db.publisher.findAll(),
    classes: (parent, args, { db }, info) => db.class.findAll(),
    series: (parent, args, { db }, info) => db.series.findAll(),
    types: (parent, args, { db }, info) => db.type.findAll(),
    games: (parent, args, { db }, info) => db.game.findAll(),
    ost: (parent, { id, title }, { db }, info) => db.ost.findByPk(id),
    searchOstByTitle: (parent, { title }, { db }) => db.ost.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    }),
    recentOst: (parent, { limit }, { db }) => db.ost.findAll({
      limit: limit,
      order: [['createdAt', 'DESC']]
    })
  },

  Mutation: {
    createArtist: (parent, data, { db }, info) => db.artist.create(data),
    createPlatform: (parent, data, { db }, info) => db.platform.create(data),
    createPublisher: (parent, data, { db }, info) => db.publisher.create(data),
    createSeries: (parent, data, { db }, info) => {
      return db.sequelize.transaction(async t1 => {
        const result = await db.series.create(data)
        await img(data.cover, '../public/img/series', result.dataValues.slug)
        return result
      })
    },
    createGame: (parent, data, { db }, info) => {
      return db.sequelize.transaction(t2 => {
        let gameInstance = null
        return db.game.create(data).then(game => {
          gameInstance = game
          return Promise.all([
            gameInstance.setSeries(data.series),
            gameInstance.setPublishers(data.publishers),
            gameInstance.setPlatforms(data.platforms)
          ])
        }).then(() => {
          img(data.cover, '../public/img/game', data.slug)
            .then(() => {
              return gameInstance
            })
        })
      })
    },
    createOst: (parent, data, { db }, info) => {
      return db.sequelize.transaction(t1 => {
        let ost = null
        db.ost.create(data).then(ostInstance => {
          ost = ostInstance
          return Promise.all([
            Promise.all(
              (data.artists || []).map(a => db.artist.findOrCreate(
                {
                  where: { name: a }
                }
              ))
            ).then(artists => {
              return ost.setArtists(artists.map(a => a[0].dataValues.id))
            }),
            Promise.all(data.links.map(category => {
              return ost.createLinkCategory(category).then(linkCategory => {
                return Promise.all(category.links.map(link => linkCategory.createLink(link)))
              })
            })),
            Promise.all(data.available.map(link => ost.createAvailable(link))),
            Promise.all(data.discs.map(d => ost.createDisc(d))),
            ost.setPlatforms(data.platforms || []),
            ost.setGames(data.games || []),
            ost.setTypes(data.types),
            ost.setClasses(data.classes),
            ost.setRelated(data.related || [])
          ]).then(() => {
            img(data.cover, '../public/img/ost', ost.dataValues.id).then(() => {
              return ost
            })
          })
        })
      })
    }
  }
}
