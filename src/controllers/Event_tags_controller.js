import { Router } from 'express';
import Event_tagsServices from '../services/Event_tags_service.js';

const router = Router();
const svc = new Event_tagsServices();

// Obtener todas las etiquetas
router.get('', async (req, res) => {
    try {
        const tags = await svc.getAllAsync();
        return tags ? res.status(200).json(tags) : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Obtener una etiqueta por ID
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

// Crear una nueva etiqueta
router.post('', async (req, res) => {
    try {
        const entity = req.body;
        const newTag = await svc.createAsync(entity);
        return newTag ? res.status(201).send('La etiqueta fue creada con éxito') : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Modificar una etiqueta existente
router.put('', async (req, res) => {
    try {
        const entity = req.body;
        const updatedTag = await svc.updateAsync(entity);
        return updatedTag ? res.status(200).send('La etiqueta fue modificada con éxito') : res.status(404).send('No se encontró la etiqueta');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Eliminar una etiqueta por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTag = await svc.deleteByIdAsync(id);
        return deletedTag ? res.status(200).send('La etiqueta fue eliminada con éxito') : res.status(404).send('No se encontró la etiqueta');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;