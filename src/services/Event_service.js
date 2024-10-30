import EventRepository from '../repositories/Event_repository.js';

const repo = new EventRepository();

export default class EventServices {
    // Listar eventos
    async getAllAsync(filtro) {
        try {
            const result = await repo.getAllAsync(filtro);
            return result || null;
        } catch (error) {
            console.error("Error al listar eventos:", error);
            throw new Error("Error al listar eventos");
        }
    }

    // Detalle evento
    async getDetailsEventAsync(id) {
        try {
            const result = await repo.getDetailsEventAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener detalles del evento con ID ${id}:`, error);
            throw new Error(`Error al obtener detalles del evento con ID ${id}`);
        }
    }

    // Devolver max_capacity
    async getMaxCapacityAsync(id) {
        try {
            const result = await repo.getMaxCapacityAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la capacidad máxima del evento con ID ${id}:`, error);
            throw new Error(`Error al obtener la capacidad máxima del evento con ID ${id}`);
        }
    }

    // Devolver max_assistance
    async getMaxAssistanceAsync(id) {
        try {
            const result = await repo.getMaxAssistanceAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la asistencia máxima del evento con ID ${id}:`, error);
            throw new Error(`Error al obtener la asistencia máxima del evento con ID ${id}`);
        }
    }

    // Crear evento
    async createAsync(entity) {
        try {
            const result = await repo.createAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al crear el evento:", error);
            throw new Error("Error al crear el evento");
        }
    }

    // Modificar evento
    async updateAsync(entity) {
        try {
            const result = await repo.updateAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al modificar el evento:", error);
            throw new Error("Error al modificar el evento");
        }
    }

    // Eliminar evento
    async deleteByIdAsync(id) {
        try {
            const result = await repo.deleteByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al eliminar el evento con ID ${id}:`, error);
            throw new Error(`Error al eliminar el evento con ID ${id}`);
        }
    }
}