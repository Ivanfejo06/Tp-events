import { Router } from 'express';
import LocationServices from '../services/location-services.js';
import Event_locationRepository from '../repositories/Event_locations_repository.js';
import AutheticationHelper from '../helpers/Auth_helper.js';

const router = Router();
const svc = new LocationServices();
const AuthHelper = new AutheticationHelper();

// Listar todas las ubicaciones
router.get('', async (req, res) => {
    try {
        const locations = await svc.getAllAsync();
        return locations ? res.status(200).json(locations) : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Buscar una ubicación por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const location = await svc.getByIdAsync(id);
        return location ? res.status(200).json(location) : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Obtener información de la ubicación del evento por ID
router.get('/:id/event-location', async (req, res) => {
    try {
        const { id } = req.params;
        if (AuthHelper.authenticationToken(req.token)) {
            const eventLocation = await Event_locationRepository.getByIdAsync(id);
            return eventLocation ? res.status(200).json(eventLocation) : res.status(404).send('No se encontró la ubicación del evento');
        } else {
            return res.status(401).send('No autorizado');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;