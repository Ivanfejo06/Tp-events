import Event_tagsRepository from '../repositories/Event_tags_repository.js';

const repo = new Event_tagsRepository();

export default class Event_tagsServices {
    // Listar todas las etiquetas
    async getAllAsync() {
        try {
            const result = await repo.getAllAsync();
            return result || null;
        } catch (error) {
            console.error("Error al listar las etiquetas:", error);
            throw new Error("Error al listar las etiquetas");
        }
    }

    // Buscar etiqueta por ID
    async getByIdAsync(id) {
        try {
            const result = await repo.getByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la etiqueta con ID ${id}:`, error);
            throw new Error(`Error al obtener la etiqueta con ID ${id}`);
        }
    }

    // Crear etiqueta
    async createAsync(entity) {
        try {
            const result = await repo.createAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al crear la etiqueta:", error);
            throw new Error("Error al crear la etiqueta");
        }
    }

    // Actualizar etiqueta
    async updateAsync(entity) {
        try {
            const result = await repo.updateAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al actualizar la etiqueta:", error);
            throw new Error("Error al actualizar la etiqueta");
        }
    }

    // Eliminar etiqueta por ID
    async deleteByIdAsync(id) {
        try {
            const result = await repo.deleteByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al eliminar la etiqueta con ID ${id}:`, error);
            throw new Error(`Error al eliminar la etiqueta con ID ${id}`);
        }
    }
}