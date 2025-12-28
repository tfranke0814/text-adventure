require('dotenv').config();

const config = {
    PORT: Number(process.env.PORT) || 3000,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    OPENAI_TEXT_MODEL: process.env.OPENAI_TEXT_MODEL || 'gpt-5-nano',
    FISHAUDIO_API_KEY: process.env.FISHAUDIO_API_KEY || ''
};

module.exports = config;