import { Router } from 'express';
import ProvinceServices from '../services/Provinces_service.js';
import ValidationHelper from '../helpers/Validations_helper.js';

const router = Router();
const svc = new ProvinceServices();
const VHelper = new ValidationHelper();

// Lista de provincias
router.get('', async (req, res) => {
    try {
        const provinces = await svc.getAllAsync();
        return provinces ? res.status(200).json(provinces) : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Busca provincia por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const province = await svc.getByIdAsync(id);
        return province ? res.status(200).json(province) : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Lista locaciones en una provincia
router.get('/:id/location', async (req, res) => {
    try {
        const { id } = req.params;
        const locations = await svc.getLocationByIdAsync(id);
        return locations ? res.status(200).json(locations) : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Crea una nueva provincia
router.post('', async (req, res) => {
    try {
        const entity = req.body;
        if (!VHelper.validarString(entity.name)) {
            return res.status(400).send('El campo "name" está vacío o tiene menos de tres letras');
        }
        if (!VHelper.validarInt(entity.latitude) || !VHelper.validarInt(entity.longitude)) {
            return res.status(400).send('Los campos "latitude" y "longitude" deben ser números');
        }
        const newProvince = await svc.createAsync(entity);
        return newProvince ? res.status(201).send('La provincia fue creada con éxito') : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Actualiza una provincia
router.put('', async (req, res) => {
    try {
        const entity = req.body;
        if (!VHelper.validarString(entity.name) || !VHelper.validarInt(entity.latitude) || !VHelper.validarInt(entity.longitude)) {
            return res.status(400).send('Solicitud incorrecta: datos inválidos');
        }
        const updatedProvince = await svc.updateAsync(entity);
        return updatedProvince ? res.status(200).send('La provincia fue modificada con éxito') : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Elimina una provincia por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProvince = await svc.deleteByIdAsync(id);
        return deletedProvince ? res.status(200).send('La provincia fue eliminada con éxito') : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;