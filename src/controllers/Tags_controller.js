import { Router } from 'express';
import TagsServices from '../services/Tags_service.js';

const router = Router();
const svc = new TagsServices();

// Listar todas las tags
router.get('', async (req, res) => {
    try {
        const tags = await svc.getAllAsync();
        return tags ? res.status(200).json(tags) : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Buscar una tag por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await svc.getByIdAsync(id);
        return tag ? res.status(200).json(tag) : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Crear una nueva tag
router.post('', async (req, res) => {
    try {
        const entity = req.body;
        const createdTag = await svc.createAsync(entity);
        return createdTag ? res.status(201).send('La tag fue creada con éxito') : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Actualizar una tag
router.put('', async (req, res) => {
    try {
        const entity = req.body;
        const updatedTag = await svc.updateAsync(entity);
        return updatedTag ? res.status(200).send('La tag fue modificada con éxito') : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Eliminar una tag por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTag = await svc.deleteByIdAsync(id);
        return deletedTag ? res.status(200).send('La tag fue eliminada con éxito') : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;