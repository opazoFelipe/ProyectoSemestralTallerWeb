"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const database_1 = __importDefault(require("../database"));
class BooksController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield database_1.default.query('SELECT * FROM libros');
            res.json(books);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const books = yield database_1.default.query('SELECT * FROM libros WHERE codigo = ?', [id]);
            console.log(books.length); //
            if (books.length > 0) {
                return res.json(books[0]);
            }
            res.status(404).json({ text: "El libro no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { id, nombre, autor, cantidad } = req.body;
            const books = yield database_1.default.query('SELECT * FROM libros WHERE codigo = ?', [id]);
            if (books.length > 0) {
                res.json("El codigo ingresado ya existe");
            }
            else {
                const result = yield database_1.default.query('INSERT INTO libros values(?,?,?,?)', [id, nombre, autor, cantidad]);
                res.json({ message: 'Libro guardado' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { id } = req.params;
            const { codigo, nombre, autor, cantidad } = req.body;
            console.log(req.body);
            const oldBook = req.body;
            const books = yield database_1.default.query('SELECT * FROM libros WHERE codigo = ?', [id]);
            if (books.length > 0) {
                res.json("El codigo ingresado ya existe");
            }
            else {
                yield database_1.default.query('UPDATE libros set codigo=?, nombre=?, autor=?, cantidad=? WHERE codigo = ?', [id, nombre, autor, cantidad, codigo]);
                res.json({ message: "El libro ha sido modificado" });
                console.log("Codigo Aceptado");
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM libros WHERE codigo = ?', [id]);
            res.json({ message: "El libro fue eliminado" });
        });
    }
}
const booksController = new BooksController;
exports.default = booksController;
