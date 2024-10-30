import Event_CategoriesRepository from '../repositories/Event_categories_repository.js';

const repo = new Event_CategoriesRepository();

export default class Event_CategoriesService {
    // Obtener todas las categorías
    async getAllAsync() {
        try {
            const result = await repo.getAllAsync();
            return result || null;
        } catch (error) {
            console.error("Error al obtener todas las categorías de eventos:", error);
            throw new Error("Error al obtener todas las categorías de eventos");
        }
    }

    // Obtener una categoría por ID
    async getByIdAsync(id) {
        try {
            const result = await repo.getByIdAsync(id);
            return result || null;
        } catch (error) {
            console.error(`Error al obtener la categoría de evento con ID ${id}:`, error);
            throw new Error(`Error al obtener la categoría de evento con ID ${id}`);
        }
    }
}