import express , { Express, Request, Response } from 'express';


const getAllUsers = (req: Request, res: Response) => {
    console.log('getAllUsers')
}
const getUserById = (req: Request, res: Response) => {}
const createUser = (req: Request, res: Response) => {}
const updateUser = (req: Request, res: Response) => {}
const deleteUser = (req: Request, res: Response) => {}



export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}