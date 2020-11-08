const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// Defining a new graphql object type
const BookType = new GraphQLObjectType({
    // this Object type is called book
    name: 'Book',

    //  Object types called Book have these fields
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

// How we jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
		// When there is a query for this book object
        book: {
			// Look for a booktype object
			type: BookType,
			// definining what arguments should be passed when a request for a book type
			args: { id: { type: GraphQLString } },
			resolve(parent, args){
				// code to get date from db / other sources
			}
        },
    },
})

// // Defining a new graphql object type
// const AuthorType = new GraphQLObjectType({
//     // This object type is called author
//     name: 'Author',

//     // Object types called author have these fields
//     fields: () => ({
//         id: { type: GraphQLString },
//         name: { type: GraphQLString },
//         age: { type: GraphQLString }
//     })
// })


module.exports = new GraphQLSchema({
	query: RootQuery
})