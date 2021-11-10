const Loan = require('../model/Loan');
const Loan_Book = require('../model/Loan_Book');

module.exports = {
    async index(req,res){
        
        const loan_book = await Loan_Book.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(loan_book);
    },

    async indexOne(req,res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async store(req, res){
        var { loan_id, id } = req.params;
        const { quantity, product_id } = req.body;

        const loan = await Loan.findByPk(loan_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!loan){
            return res.status(404).json({ error: 'Loan not found' });
        }
        
        id = `O${loan_id}I${id}`;

        const loan_book = await Loan_Book.create({ 
            id,
            loan_id,
            product_id, 
            quantity 
        }).catch((e) => {
            return res.status(400).json({ error: "Creating failed with message: " + e });
        });;

        return res.json(loan_book);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    async deleteOne(req, res){
        const { loan_id } = req.params;
        const { id } = req.params;

        const loan_book_id = `O${loan_id}I${id}`;

        const loan = await Loan.findByPk(loan_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const loan_book = await Loan_Book.findByPk(loan_book_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!loan){
            return res.status(404).json({ error: 'Loan not found' });
        }else if(!loan_book){
            return res.status(404).json({ error: 'Loan_Book not found' });
        };

        await Loan_Book.destroy({
            where: { 
                id: loan_book_id
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
        const { loan_id } = req.params;
        const { id } = req.params;

        const loan_book_id = `O${loan_id}I${id}`;

        const loan = await Loan.findByPk(loan_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const loan_book = await Loan_Book.findByPk(item_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!loan){
            return res.status(404).json({ error: 'Loan not found' });
        }else if(!loan_book){
            return res.status(404).json({ error: 'loan_book not found' });
        };

        await Loan_Book.update(req.body, {
            where: { 
                id: loan_book_id
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