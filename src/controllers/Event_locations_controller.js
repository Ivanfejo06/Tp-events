import { Router } from 'express';
import Event_locationServices from '../services/Event_locations_service.js';

const router = Router();
const svc = new Event_locationServices();

// Obtener todas las ubicaciones de eventos
router.get('', async (req, res) => {
    const returnArray = await svc.getAllAsync();
    if (returnArray) {
        return res.status(200).json(returnArray);
    } else {
        return res.status(500).send('Error interno');
    }
});

// Obtener una ubicación específica de evento por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray) {
        return res.status(200).json(returnArray);
    } else {
        return res.status(404).send('No se encontró ningún resultado');
    }
});

export default router;