import express from "express";
const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// export app for use in other modules (like testing)
export { app };

export default app;