"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booksController_1 = __importDefault(require("../controllers/booksController"));
class BookRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config(); //
    }
    config() {
        this.router.get('/', booksController_1.default.list);
        this.router.get('/:id', booksController_1.default.getOne);
        this.router.post('/', booksController_1.default.create);
        this.router.put('/:id', booksController_1.default.update);
        this.router.delete('/:id', booksController_1.default.delete);
    }
}
exports.default = new BookRoutes().router;
