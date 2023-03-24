"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const openai_1 = __importDefault(require("../lib/openai"));
const handler = async (event) => {
    const response = await openai_1.default.createCompletion({
        model: 'text-davinci-003',
        prompt: 'Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.',
        max_tokens: 100,
        temperature: 0.8,
    });
    const responseText = response.data.choices[0].text;
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: responseText.trim()
    };
};
exports.handler = handler;
//# sourceMappingURL=getSuggestion.js.map