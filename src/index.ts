import { ApolloServer, IResolvers } from "apollo-server";
import { importSchema } from "graphql-import";
import BooksAPI from "./datasources/BooksAPI";

const typeDefs = importSchema(`${__dirname}/schema/book.gql`);

const resolvers: IResolvers = {
  Query: {
    books: (parent, args, { dataSources }, info) => {
      const books = dataSources.booksAPI.getBooks()
      return books
    },
  },
  Mutation: {
    addBook: (parent, args, { dataSources }, info) => {
      const newBook = { title: args.title, author: args.author }
      dataSources.booksAPI.postBooks([newBook])
      return newBook
    }
  }
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
   tracing: true,
   dataSources: () => {
      return {
        booksAPI: new BooksAPI() 
      }
    } 
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});