import Event_locationRepository from '../repositories/Event_locations_repository.js';

const repo = new Event_locationRepository();

export default class Event_locationServices {
    // Obtener todas las locaciones de eventos
    async getAllAsync() {
        try {
            const result = await repo.getAllAsync();
            return result || null;
        } catch (error) {
            console.error("Error al obtener todas las locaciones:", error);
            throw new Error("Error al obtener todas las locaciones");
        }
    }

    // Buscar locación de evento por ID
    async getByIdAsync(id) {
        try {
            const result = await repo.getByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al buscar locación con ID ${id}:`, error);
            throw new Error(`Error al buscar locación con ID ${id}`);
        }
    }

    async getMaxCapacity(id) {
        try {
            const result = await repo.getMaxCapacity(id);
            return result[0].max_capacity || null;
        } catch (error) {
            console.error(`Error al buscar locación con ID ${id}:`, error);
            throw new Error(`Error al buscar locación con ID ${id}`);
        }
    }
}