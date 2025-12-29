// Router for llm calls
const express = require('express');
import type { Request, Response } from 'express';

const { generateTextStreamHttp } = require('../services/llmService')

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'llm router is operational' });
});

router.post('/textgen', async (req: Request, res: Response) => {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid `prompt` in JSON body' });
    }

    try {
        await generateTextStreamHttp(prompt, res);
    } catch (err) {
        if (err instanceof Error) {
            console.error('LLM service error:', err.message);
            return res.status(502).json({ error: 'LLM error' });
        }
        console.error('LLM service error:', err);
        return res.status(502).json({ error: 'LLM error' });
    }
});

module.exports = router;