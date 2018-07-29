import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';

import { SchemaLink } from 'apollo-link-schema';

const faker = require('faker');

const typeDefs = `
# The root of all queries:

type Query {
  # Just returns "Hello world!"
  queryArtists(byName: String = "Red Hot Chili Peppers"): [Artist]
}
type Artist {
  name: String!
  id: ID
  likes: Int
  image: String
  albums(limit: Int = 10): [Album]
}
type Album {
  name: String
  id: ID
  image: String
  tracks: [Track]
}
type Track {
  name: String!
  artists: [Artist]
  preview_url: String
  preview_url: String
  id: ID
}

# all modifying operations
type Mutation {
  likeArtist(artistId: ID!): Int
}

# Schema for a spotify - graphql - api gateway 
schema {
  query: Query
  mutation: Mutation
}
`;

var mocks = {
    String: () => faker.name.lastName(),
    notArtist: () => ({
        name: faker.name.findName(),
        image: () => faker.image.avatar(),
        albums: () => new MockList([2, 5]),
    }),
};
var resolvers = {
    Query: {
        // queryArtists: () => [1,2,3,4,5,6,7,8].map(i=>mocks.Artist())
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true,
});

export const localMockLink = new SchemaLink({ schema });
