import Event_enrollmentRepository from '../repositories/Event_enrollment_repository.js';

const repo = new Event_enrollmentRepository();

export default class Event_enrollmentService {
    // Listar todas las inscripciones en un evento
    async getAllAsync(id_event, filtro) {
        try {
            const result = await repo.getAllAsync(id_event, filtro);
            return result || null;
        } catch (error) {
            console.error("Error al listar las inscripciones:", error);
            throw new Error("Error al listar las inscripciones");
        }
    }

    // Buscar inscripciones en un evento por ID
    async getAllByIdAsync(id) {
        try {
            const result = await repo.getAllByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al buscar inscripciones por ID ${id}:`, error);
            throw new Error(`Error al buscar inscripciones por ID ${id}`);
        }
    }

    // Buscar una inscripción específica por evento y usuario
    async getEnrollmentAsync(id_event, id_user) {
        try {
            const result = await repo.getEnrollmentAsync(id_event, id_user);
            console.log(result)
            return result || null;
        } catch (error) {
            console.error(`Error al buscar la inscripción del evento ${id_event} para el usuario ${id_user}:`, error);
            throw new Error(`Error al buscar la inscripción del evento ${id_event} para el usuario ${id_user}`);
        }
    }

    // Devolver la asistencia máxima de un evento
    async getAssistanceAsync(id) {
        try {
            const result = await repo.getAssistanceAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la asistencia máxima para el evento ${id}:`, error);
            throw new Error(`Error al obtener la asistencia máxima para el evento ${id}`);
        }
    }

    // Crear una nueva inscripción
    async createAsync(entity) {
        try {
            const result = await repo.createAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al crear la inscripción:", error);
            throw new Error("Error al crear la inscripción");
        }
    }

    // Eliminar una inscripción por ID
    async deleteByIdAsync(id) {
        try {
            const result = await repo.deleteByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al eliminar la inscripción con ID ${id}:`, error);
            throw new Error(`Error al eliminar la inscripción con ID ${id}`);
        }
    }
}