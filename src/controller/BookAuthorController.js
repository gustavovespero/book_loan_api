const Book = require('../model/Book');
const Book_Author = require('../model/Book_Author');

module.exports = {
    async index(req,res){
        
        const book_author = await Book_Author.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(book_author);
    },

    async indexOne(req,res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async store(req, res){
        var { book_id, id } = req.params;
        const { author_id } = req.body;

        const book = await Book.findByPk(book_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!book){
            return res.status(404).json({ error: `author with id ${book_id} not found` });
        }
        
        id = `B${book_id}A${id}`;

        const book_author = await Book_Author.create({ 
            id,
            author_id,
            book_id
            }).catch((e) => {
            return res.status(400).json({ error: "Creating failed with message: " + e });
        });;

        return res.json(book_author);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    async deleteOne(req, res){
        const { book_id } = req.params;
        const { id } = req.params;

        const book_author_id = `B${book_id}A${id}`;

        const book = await Book.findByPk(book_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const book_author = await Book_Author.findByPk(book_author_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!book){
            return res.status(404).json({ error: 'author not found' });
        }else if(!book_author){
            return res.status(404).json({ error: 'Book_Author not found' });
        };

        await Book_Author.destroy({
            where: { 
                id: book_author_id
            }
        }).then((num) => {
            if (num == 1) {
                return res.status(200).json({
                    message: "Data was deleted successfully."
                });
            } else {
                return res.status(400).json({
                    error: `Data was not deleted.`
                });
            }
        }).catch((e) => {
            return res.status(500).json({ error: "Failed with message: " + e });
        });       
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const { author_id } = req.params;
        const { id } = req.params;

        const book_author_id = `O${author_id}I${id}`;

        const author = await Author.findByPk(author).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const book_author = await Book_Author.findByPk(item_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!author){
            return res.status(404).json({ error: 'author not found' });
        }else if(!book_author){
            return res.status(404).json({ error: 'book_author not found' });
        };

        await Book_Author.update(req.body, {
            where: { 
                id: book_author_id
            }
        }).then((num) => {
            if (num == 1) {
                return res.status(200).json({
                    message: "Data was updated successfully."
                });
            } else {
                return res.status(400).json({
                    error: `Data was not updated.`
                });
            }
        }).catch((e) => {
            return res.status(500).json({ error: "Failed with message: " + e });
        });       
    },
};