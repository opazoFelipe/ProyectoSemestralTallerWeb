import { Request, Response } from 'express';
//

import pool from '../database';

class BooksController {

    public async list(req: Request, res: Response): Promise<void> {
        const books = await pool.query('SELECT * FROM libros');
        res.json(books);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const books = await pool.query('SELECT * FROM libros WHERE codigo = ?', [id]);
        console.log(books.length);//
        if (books.length > 0) {
            return res.json(books[0]);
        }
        res.status(404).json({ text: "El libro no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        // console.log(req.body);
        const {id, nombre, autor, cantidad} = req.body;
        const books = await pool.query('SELECT * FROM libros WHERE codigo = ?', [id]);
        if (books.length > 0) {
            res.json("El codigo ingresado ya existe");
        }else
        {
            const result = await pool.query('INSERT INTO libros values(?,?,?,?)', [id, nombre, autor, cantidad]);
            res.json({ message: 'Libro guardado' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        // console.log(req.body);
        const { id } = req.params;
        const {codigo, nombre, autor, cantidad} = req.body;
        console.log(req.body);
        const oldBook = req.body;
        const books = await pool.query('SELECT * FROM libros WHERE codigo = ?', [id]);
        if (books.length > 0) {
            res.json("El codigo ingresado ya existe");
        }else
        {
            await pool.query('UPDATE libros set codigo=?, nombre=?, autor=?, cantidad=? WHERE codigo = ?', [id, nombre, autor, cantidad, codigo]);
            res.json({ message: "El libro ha sido modificado" });
            console.log("Codigo Aceptado");
        }
       
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM libros WHERE codigo = ?', [id]);
        res.json({ message: "El libro fue eliminado" });
    }
}

const booksController = new BooksController;
export default booksController;