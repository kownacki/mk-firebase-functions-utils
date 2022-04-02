"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsAsync = void 0;
const cors_1 = __importDefault(require("cors"));
const corsAsync = (options) => {
    const corsMiddleware = (0, cors_1.default)(options);
    return (req, res) => new Promise((resolve, reject) => corsMiddleware(req, res, (err) => {
        err ? reject(err) : resolve();
    }));
};
exports.corsAsync = corsAsync;
