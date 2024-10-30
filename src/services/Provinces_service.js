import ProvinceRepository from '../repositories/Provinces_repositorys.js';

const repo = new ProvinceRepository();

export default class ProvinceServices {
    // Listar todas las provincias
    async getAllAsync() {
        try {
            const result = await repo.getAllAsync();
            return result || null;
        } catch (error) {
            console.error("Error al listar las provincias:", error);
            throw new Error("Error al listar las provincias");
        }
    }

    // Obtener provincia por ID
    async getByIdAsync(id) {
        try {
            const result = await repo.getByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la provincia con ID ${id}:`, error);
            throw new Error(`Error al obtener la provincia con ID ${id}`);
        }
    }

    // Obtener ubicación por ID
    async getLocationByIdAsync(id) {
        try {
            const result = await repo.getLocationByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la ubicación con ID ${id}:`, error);
            throw new Error(`Error al obtener la ubicación con ID ${id}`);
        }
    }

    // Crear nueva provincia
    async createAsync(entity) {
        try {
            const result = await repo.createAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al crear la provincia:", error);
            throw new Error("Error al crear la provincia");
        }
    }

    // Actualizar provincia
    async updateAsync(entity) {
        try {
            const result = await repo.updateAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al actualizar la provincia:", error);
            throw new Error("Error al actualizar la provincia");
        }
    }

    // Eliminar provincia por ID
    async deleteByIdAsync(id) {
        try {
            const result = await repo.deleteByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al eliminar la provincia con ID ${id}:`, error);
            throw new Error(`Error al eliminar la provincia con ID ${id}`);
        }
    }
}