import { UserModel } from "../models/userModel";

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



}