import express, { Router } from 'express';

import booksController from '../controllers/booksController';

class BookRoutes {

    router: Router = Router();

    constructor() {
        this.config();//
    }

    config() {
        this.router.get('/', booksController.list);
        this.router.get('/:id', booksController.getOne);
        this.router.post('/', booksController.create);
        this.router.put('/:id', booksController.update);
        this.router.delete('/:id', booksController.delete);
    }

}

export default new BookRoutes().router;

