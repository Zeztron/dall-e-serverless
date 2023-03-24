"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Hello World' }),
    };
};
exports.handler = handler;
//# sourceMappingURL=getImages.js.map