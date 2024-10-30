import UsersRepository from '../repositories/Users_repository.js';

const repo = new UsersRepository();

export default class UsersServices {
    // Iniciar sesión
    async LoginAsync(entity) {
        try {
            const result = await repo.LoginAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw new Error("Error al iniciar sesión");
        }
    }

    // Registro de usuario
    async RegisterAsync(entity) {
        try {
            const result = await repo.RegisterAsync(entity);
            return result || null;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw new Error("Error al registrar usuario");
        }
    }
}