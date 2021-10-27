const Book = require('../models/Book');

module.exports = {
    async index(req,res){
        const books = await Book.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(books);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const books = await Book.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!books){
            res.status(404).json({
                error: "Product does not exists"
            })
        };

        return res.status(200).json(books);
    },

    async store(req, res){
        const { name, price, description } = req.body;

        const books = await Book.create({ name, price, description }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.json(books);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    async deleteOne(req, res){
        const { id } = req.params;
        const book = await Book.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!book){
            return res.status(404).json({ error: `Book with id = ${id} does not exists.` })
        }else{
            await Book.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if (num == 1) {
                    return res.status(200).json({
                        message: "Data was deleted successfully."
                    });
                } else {
                    return res.status(400).json({
                        error: "Data was not deleted."
                    });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Deleting data failed with message: " + e });
            });
        }       
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const id = req.params.id;

        const book = await Book.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!book){
            return res.status(404).json({ error: `Product with id=${id} does not exists.` })
        }else{
            await Book.update(req.body, {
                where: { id: id }
            })
            .then((num) => {
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
                return res.status(500).json({ error: "Updating data failed with message: " + e });
            });
        }
    },
}