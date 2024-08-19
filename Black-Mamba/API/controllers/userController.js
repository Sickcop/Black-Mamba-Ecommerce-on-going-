import { UserModel } from "../models/userModel.js";
import { validatePartialUser, validateUser } from "../schemes/scheme.user.js";

export class  UserController{
    static  async getAll(req, res){
        try {
            const users = await UserModel.getAll();
            res.json(users);
        } catch (error){
            res.status(500).json({ error: 'Error fetching users' })
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.getById(id);
            if (user) return res.json(user);
            res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
        }

        static async create(req, res){
            const body = validatePartialUser(req.body);

            if(body.error){
                return res.status(400).json({ error: JSON.parse(body.error.message) })
            }

            try{
                const newUserId = await UserModel.create(body.data);
                res.status(201).json({ id: newUserId });
            } catch (error){
                res.status(500).json({ error: 'Error creating user' });
            }
        }

        static async update(req, res){
            const { id } = req.params;
            const body = validateUser(req.body);

            if(body.error){
                return res.status(400).json({ error: JSON.parse(body.error.message) })
            }

            try{
                await UserModel.update(id, body.data);
                res.status(200).json({ message: 'User update' });
            } catch (error){
                res.status(500).json({ error: 'Error updating user' })
            }
        }

        static async delete(req, res){
            const { id } = req.params;
            try {
                await UserModel.delete(id);
                res.status(200).json({ message: 'User delleted' });
            } catch (error){
                res.status(500).json({ error: 'Error deleting user' })
            }
        }


}