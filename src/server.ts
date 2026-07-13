import express from "express";
import authRoutes from "./routes/authRoutes.ts";
import habitRoutes from "./routes/habitRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { isTest } from "../env.ts";

const app = express();

// Middlewares
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());
// CORS middleware to allow cross-origin requests
app.use(cors());
// Body parsing middleware to parse JSON and URL-encoded data
app.use(express.json());
// URL-encoded parser middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Morgan middleware for logging HTTP requests, but skip logging in test environment
app.use(morgan('dev', {
    skip: () => isTest(), // Skip logging if in test environment
}));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/users', userRoutes);

// export app for use in other modules (like testing)
export { app };

export default app;