module.exports = `
    type Ost {
        id: ID!
        title: String!
        subTitle: String
        cover: String
        releaseDate: String
        label: String
        discs: [Disc]
        links: [LinkCategory]
        artists: [Artist]
        classes: [Class]
        types: [Type]
        platforms: [Platform]
        games: [Game]
    }

    type Disc {
        number: Int
        tracks: [Track]
    }

    type Track {
        length: String
        number: Int
        name: String
    }

    type LinkCategory {
        title: String
        links: [Link]
    }

    type Link {
        provider: String
        url: String
    }

    type Artist {
        id: ID!
        name: String
        osts: [Ost]
    }

    type Class {
        id: ID!
        name: String
        osts: [Ost]
    }

    type Game {
        slug: String!
        name: String
        publishers: [Publisher]
        osts: [Ost]
        series: [Series]
    }

    type Platform {
        id: ID!
        name: String
        osts: [Ost]
    }

    type Publisher {
        id:ID!
        name: String
    }

    type Series {
        slug: String!
        name: String
        games: [Game]
    }

    type Type {
        id: ID!
        name: String
        osts: [Ost]
    }

    type Query {
        osts: [Ost!]!
        types: [Type!]!
        classes: [Class!]!
        ost(id: ID!): Ost 
        artists: [Artist!]!     
        platforms: [Platform!]!
        publishers: [Publisher!]!   
        series: [Series!]!  
        games: [Game!]!
    }

    type Mutation {
        createArtist(name: String): Artist!
        createPlatform(name: String): Platform!
        createPublisher(name: String): Publisher!
        createSeries(slug: String, name:String): Series!
        createGame(slug:String, name:String, publishers:[ID], series:[ID]): Game!
        createOst(
            title: String, 
            subTitle: String, 
            cover: String,
            releaseDate: String,
            label: String,
            links: [ID],
            artists: [ID],
            classes: [ID],
            types: [ID],
            platforms: [ID],
            games: [ID]
        ): Ost!
    }
`
