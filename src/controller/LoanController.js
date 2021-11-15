const User = require('../model/User');
const Session = require('../model/Session');
const Loan = require('../model/Loan');
const Book = require('../model/Book');

module.exports = {
    async index(req,res){
        const loans = await Loan.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(loans);
    },

    async indexByUser(req,res){

        const  {login}  = req.body;

        const user = await User.findAll({
            where: { 
                login: login,
            }
        }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user || user.length < 1 ){
            res.status(404).json({
                error: 'usuário não existe'
            })
        };

        const id = user[0].id;

        const loans = await Loan.findAll({
            where: { 
                user_id: id,
            },
            include : [
                Book
            ]
            
        }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(loans);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const loan = await Loan.findByPk(id, { 
            include: [
                User,
                Book
            ]}).catch((e) => {
                return res.status(400).json({ error: "Failed with message: " + e });
            });;

        if(!loan){
            res.status(404).json({ error: "Loan does not exists" })
        };
    
        return res.status(200).json(loan);
    },

    async store(req, res){
        const { user_id } = req.body;

        const loan = await Loan.create({ user_id }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(loan);
    },

    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async deleteOne(req, res){
        const { id } = req.params;

        const loan = await Loan.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });
        
        if(!loan){
            return res.status(404).json({ error: `Loan with id=${id} does not exists.` })
        }else{
            await Loan.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if(num === 1){
                    return res.status(200).json({ msg: "Loan was deleted" });
                }
            }).catch((e) => {
                return res.status(500).json({ msg: "Deleting data failed with message: " + e });
            });
        }        
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const id = req.params.id;

        const loan = await Loan.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!loan){
            return res.status(404).json({ error: `Loan with id=${id} does not exists.` })
        }else{
            await Loan.update(req.body, {
                where: { id: id }
            })
            .then((num) => {
                if (num == 1) {
                    return res.status(200).json({ message: "Data was updated successfully." });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Updating data failed with message: " + e });
            });
        }
    },
}