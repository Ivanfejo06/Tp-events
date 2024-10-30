import { Router } from 'express';
import ValidationHelper from '../helpers/Validations_helper.js';
import AuthMiddleware from '../middleware/Auth_middleware.js';
import Event_categoriesServices from '../services/Event_categories_service.js';

// Instancias de clases
const router = Router();
const VHelper = new ValidationHelper();
const Auth = new AuthMiddleware();
const svc = new Event_categoriesServices();

// Ruta para obtener todas las categorías
router.get('', Auth.AuthMiddleware, async (req, res) => {
    try {
        const categories = await svc.getAllAsync();
        if (categories) return res.status(200).json(categories);
        return res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Ruta para obtener una categoría por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await svc.getByIdAsync(id);
        if (category) return res.status(200).json(category);
        return res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Ruta para crear una nueva categoría
router.post('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        if (VHelper.fullLetters(name)) {
            const created = await svc.createAsync(req.body);
            if (created) return res.status(201).send("Categoría creada");
            return res.status(400).send("Datos inválidos.");
        }
        return res.status(400).send("Nombre inválido.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno.");
    }
});

export default router;