import type { Request, Response, NextFunction } from 'express';
import { ZodError,  type ZodType } from 'zod';

// Middleware to validate request body for habit creation
/** Its a good practice to validate request bodies in a dedicated middleware.
 * That way the request never reaches the route handler if the body is invalid, and we can send a proper error response.
 */
export const validateBody = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData; // Replace the request body with the validated data
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json({ 
                    error: "Validation Failed",
                    details: error.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                 }); // Send validation errors as response
            }
            next(error);
        }
    };
};