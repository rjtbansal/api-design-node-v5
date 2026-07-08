import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Get user with id ${id}` });
});

router.post('/', (req, res) => {
    res.status(201).json({ message: 'Create a new user' });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Update user with id ${id}` });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Delete user with id ${id}` });
});

export default router;