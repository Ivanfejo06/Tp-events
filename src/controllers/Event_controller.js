import { Router } from 'express';
import EventServices from '../services/Event_service.js';
import Event_enrollmentServices from '../services/Event_enrollments_service.js';
import ValidationHelper from '../helpers/Validations_helper.js';
import AuthMiddleware from '../middleware/Auth_middleware.js';
import Event_locationServices from '../services/Event_locations_service.js';

const router = Router();
const svc = new EventServices();
const lsvc = new Event_locationServices();
const VHelper = new ValidationHelper();
const Auth = new AuthMiddleware();

// Listar eventos
router.get('', Auth.AuthMiddleware, async (req, res) => {
    try {
        const filtro = req.query;
        console.log('events: ', filtro);
        const events = await svc.getAllAsync(filtro);
        return events ? res.status(200).json(events) : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Detalle de evento
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eventDetails = await svc.getDetailsEventAsync(id);
        return eventDetails ? res.status(200).json(eventDetails) : res.status(404).send('No encontrado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Listar participantes
router.get('/:id/enrollment', async (req, res) => {
    try {
        const { id } = req.params;
        const filtro = req.query;
        const enrollments = await Event_enrollmentServices.getAllAsync(id, filtro);
        return enrollments ? res.status(200).json(enrollments) : res.status(404).send('No se encontró ningún resultado');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Crear evento
router.post('', Auth.AuthMiddleware, async (req, res) => {
    try {
        console.log('Solicitud recibida para crear un evento:', req.body);

        const entity = req.body;
        // Agregar el id_creator_user a la entidad
        entity.id_creator_user = req.user.id; // Asegúrate de que req.user.id esté disponible

        const maxCapacity = await lsvc.getMaxCapacity(entity.id_event_location);
        console.log('Capacidad máxima obtenida para la ubicación:', maxCapacity);

        // Validaciones
        if (!VHelper.validarString(entity.descripcion)) {
            console.log('Error de validación: nombre o descripción inválidos', entity.name, entity.descripcion);
            return res.status(400).send('El nombre o descripción están vacíos o tienen menos de tres letras');
        } else if (entity.max_assistance > maxCapacity) {
            console.log('Error de validación: asistencia máxima excede la capacidad del lugar', entity.max_assistance);
            return res.status(400).send('La asistencia máxima excede la capacidad del lugar');
        } else if (!VHelper.validarInt(entity.price) || !VHelper.validarInt(entity.duration_in_minutes)) {
            console.log('Error de validación: precio o duración no válidos', entity.price, entity.duration_in_minutes);
            return res.status(400).send('El precio o duración no son válidos');
        }

        // Creación del evento
        const newEvent = await svc.createAsync(entity);
        console.log('Nuevo evento creado:', newEvent);

        return res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error interno al crear el evento:', error);
        return res.status(500).send('Error interno');
    }
});

// Modificar evento
router.put('', async (req, res) => {
    try {
        if (Auth.authenticationToken(req.token)) {
            const entity = req.body;
            const maxCapacity = await svc.getMaxCapacityAsync(entity.id_location);

            if (!VHelper.validarString(entity.name) || !VHelper.validarString(entity.descripcion)) {
                return res.status(400).send('El nombre o descripción están vacíos o tienen menos de tres letras');
            } else if (entity.max_assistance > maxCapacity) {
                return res.status(400).send('La asistencia máxima excede la capacidad del lugar');
            } else if (!VHelper.validarInt(entity.price) || !VHelper.validarInt(entity.duration_in_minutes)) {
                return res.status(400).send('El precio o duración no son válidos');
            }

            const updatedEvent = await svc.updateAsync(entity);
            return updatedEvent ? res.status(200).json(updatedEvent) : res.status(404).send('No encontrado');
        }
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Eliminar evento
router.delete('/:id', async (req, res) => {
    try {
        if (Auth.authenticationToken(req.token)) {
            const { id } = req.params;
            const assistance = await Event_enrollmentServices.getAssistanceAsync(id);

            if (assistance == null) {
                return res.status(400).send('Bad request');
            }

            const deletedEvent = await svc.deleteByIdAsync(id);
            return deletedEvent ? res.status(200).json(deletedEvent) : res.status(404).send('No encontrado');
        }
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Inscribirse a un evento
router.post('/:id/enrollment', async (req, res) => {
    try {
        if (Auth.authenticationToken(req.token)) {
            const entity = req.body;
            const { id: id_event } = req.params;
            const eventDetails = await svc.getDetailsEventAsync(id_event);
            const enrollmentExists = await Event_enrollmentServices.getEnrollmentAsync(id_event, entity.id_user);
            const today = Date.now();
            const currentAssistance = await Event_enrollmentServices.getAssistanceAsync(id_event);

            if (currentAssistance + 1 > eventDetails.max_assistance) {
                return res.status(400).send('Se excede la capacidad máxima del evento');
            } else if (eventDetails.start_date > today) {
                return res.status(400).send('El evento ya empezó o ya terminó');
            } else if (!eventDetails.enable_for_enrollment) {
                return res.status(400).send('El evento no está habilitado para inscripción');
            } else if (enrollmentExists) {
                return res.status(400).send('El usuario ya está inscrito');
            }

            const newEnrollment = await Event_enrollmentServices.createAsync(entity);
            return newEnrollment ? res.status(201).json(newEnrollment) : res.status(404).send('No encontrado');
        }
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Eliminar inscripción
router.delete('/:id/enrollment', async (req, res) => {
    try {
        if (Auth.authenticationToken(req.token)) {
            const { id } = req.params;
            const eventDetails = await svc.getDetailsEventAsync(id);
            const enrollmentExists = await Event_enrollmentServices.getEnrollmentAsync(id, req.body.id_user);

            if (!enrollmentExists) {
                return res.status(400).send('El usuario no está inscrito a este evento');
            } else if (eventDetails.start_date > Date.now()) {
                return res.status(400).send('El evento ya empezó o ya terminó');
            }

            const deletedEnrollment = await Event_enrollmentServices.deleteByIdAsync(id);
            return deletedEnrollment ? res.status(200).json(deletedEnrollment) : res.status(404).send('No encontrado');
        }
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Actualizar rating de inscripción
router.patch('/:id/enrollment/:rating', async (req, res) => {
    try {
        if (Auth.authenticationToken(req.token)) {
            const { id, rating } = req.params;
            const enrollmentExists = await Event_enrollmentServices.getEnrollmentAsync(id, req.body.id_user);

            if (!enrollmentExists) {
                return res.status(400).send('El usuario no está inscrito a este evento');
            }

            const updatedEnrollment = await Event_enrollmentServices.updateRatingAsync(id, rating);
            return updatedEnrollment ? res.status(200).json(updatedEnrollment) : res.status(404).send('No encontrado');
        }
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;