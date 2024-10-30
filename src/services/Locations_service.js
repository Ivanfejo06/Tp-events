import LocationsRepository from '../repositories/locations-repositories.js';

const repo = new LocationsRepository();

export default class LocationsServices {
    // Listar todas las ubicaciones
    async getAllAsync() {
        try {
            const result = await repo.getAllAsync();
            return result || null;
        } catch (error) {
            console.error("Error al listar las ubicaciones:", error);
            throw new Error("Error al listar las ubicaciones");
        }
    }

    // Buscar ubicación por ID
    async getByIdAsync(id) {
        try {
            const result = await repo.getByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la ubicación con ID ${id}:`, error);
            throw new Error(`Error al obtener la ubicación con ID ${id}`);
        }
    }

    // Obtener ubicaciones de un evento por ID
    async getEventLocationsByIdAsync(id) {
        try {
            const result = await repo.getEventLocationsByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener las ubicaciones del evento con ID ${id}:`, error);
            throw new Error(`Error al obtener las ubicaciones del evento con ID ${id}`);
        }
    }
}