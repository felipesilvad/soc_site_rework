module.exports = `
    type Ost {
        id: ID!
        title: String!
        subTitle: String!
        releaseDate: String!
        label: String!
        discs: [Disc!]!
        links: [LinkCategory!]!
        artists: [Artist]!
        classes: [Class!]!
        types: [Type!]!
        platforms: [Platform]!
        games: [Game]!
        related: [Ost]!
    }

    type Disc {
        number: Int
        body: String
        ost: Ost
    }

    input DiscInput {
        number: Int
        body: String
    }

    input CategoryInput {
        title: String
        small: Boolean
        links: [LinkInput]
    }

    input LinkInput {
        provider: String
        custom: Boolean
        url: String
    }

    type LinkCategory {
        title: String
        small: Boolean
        links: [Link]
    }

    type Link {
        provider: String
        custom: Boolean
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
        releaseDate: String
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
        games: [Game]
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
        ost(id: ID): Ost
        searchOstByTitle(title: String): [Ost] 
        recentOst(limit: Int!): [Ost]
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
        createSeries(slug: String, name:String, cover:String): Series!
        createGame(releaseDate:String, slug:String, name:String, publishers:[ID], series:[String], cover:String): Game!
        createOst(
            title: String, 
            subTitle: String, 
            cover: String,
            releaseDate: String,
            label: String,
            links: [CategoryInput],
            artists: [String],
            classes: [ID],
            types: [ID],
            platforms: [ID],
            games: [ID],
            discs: [DiscInput],
            related: [ID]
        ): Ost!
    }
`
