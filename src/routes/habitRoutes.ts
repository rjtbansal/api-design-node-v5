import { Router } from 'express';
import { z } from 'zod';
import { validateBody, validateParams } from '../middleware/validation.ts';

const router = Router();
const createHabitSchema = z.object({
    name: z.string(),
});

const completeParamsSchema = z.object({
    id: z.string(),
});

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get all habits' });
});

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.status(201).json({ message: 'Habit created' })
})

// Habit completion routes
router.post('/:id/complete', validateParams(completeParamsSchema), validateBody(createHabitSchema), (req, res) => {
  res.json({ message: `Mark habit ${req.params.id} complete` })
})

router.get('/:id/stats', (req, res) => {
  res.json({ message: `Get stats for habit ${req.params.id}` })
})

export default router;