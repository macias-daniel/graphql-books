const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author');
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql


// Defining a new graphql object type
const Book_Type = new GraphQLObjectType({
    // this Object type is called book
    name: 'Book',

    //  Object types called Book have these fields
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: Author_Type,
            resolve(parent, args){
                return Author.findById(parent.author_id)
            }
        }
    })
})

const Author_Type = new GraphQLObjectType({
    name: 'Author',

    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(Book_Type),
            resolve(parent, args){
                return Book.find({ author_id: parent.id})
            }
        }
    })
})

// Where queries are defined
const Root_Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        author: {
            type: Author_Type,
            args: { 
                id: { type: GraphQLID },
            },
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
    
        book: {
			type: Book_Type,
			args: { id: { type: GraphQLID } },
			resolve(parent, args){
                return Book.findById(args.id)
            }
        },

        authors: {
            type: new GraphQLList(Author_Type),
            resolve(parent, args){
                return Author.find({})
            }
        },

        books: {
            type: new GraphQLList(Book_Type),
            resolve(parent, args){
                return Book.find({})
            }
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {

        add_author: {
           type: Author_Type,
           args: {
               name: {type: new GraphQLNonNull(GraphQLString)},
               age: {type: new GraphQLNonNull(GraphQLInt)},
           },   
           resolve(parent, args){
                let author = new Author({
                   name: args.name,
                   age: args.age,
                })

                return author.save()
           }
        },

        add_book: {
            type: Book_Type,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                author_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    author_id: args.author_id
                })

                return book.save();
            }
        }
    
    }
})

module.exports = new GraphQLSchema({
    query: Root_Query,
    mutation: Mutation
})



