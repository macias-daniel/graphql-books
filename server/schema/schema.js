const graphql = require('graphql')
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql

// dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', author_id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', author_id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', author_id: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', author_id: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', author_id: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', author_id: '3'}
]

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"}
]

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
                console.log(parent);
                return authors.find(author => parent.author_id === author.id);
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
                return(books.filter(book => parent.id === book.author_id))
            }
        }
    })
})

// How we jump into the graph
const Root_Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        author: {
            type: Author_Type,
            args: { 
                id: { type: GraphQLID },
            },
            resolve(parent, args){
                return authors.find(author => author.id == args.id)
            }
        },
    
        // When there is a query for this book object
        book: {
			// Look for a booktype object
			type: Book_Type,
			// definining what arguments should be passed when a request for a book type
			args: { id: { type: GraphQLID } },
			resolve(parent, args){
                return books.find( book => book.id === args.id)
            }
        },
        authors: {
            type: new GraphQLList(Author_Type),
            resolve(parent, args){
                return authors;
            }
        },

        books: {
            type: new GraphQLList(Book_Type),
            resolve(parent, args){
                return books;
            }
        },
    },
})

module.exports = new GraphQLSchema({
	query: Root_Query
})



