import { Router } from 'express';
import UsersServices from '../services/Users_service.js';
import ValidationHelper from '../helpers/Validations_helper.js';

const VHelper = new ValidationHelper();
const router = Router();
const svc = new UsersServices();

// Login
router.post('/login', async (req, res) => {
    try {
        const entity = req.body;
        
        if (!VHelper.validarMail(entity.username)) {
            return res.status(400).send('Mail inválido');
        }

        const loginResult = await svc.LoginAsync(entity);
        
        return loginResult 
            ? res.status(200).json(loginResult) 
            : res.status(401).send('Username o contraseña inválida');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

// Registro
router.post('/register', async (req, res) => {
    try {
        const entity = req.body;

        if (!VHelper.validarMail(entity.username)) {
            return res.status(400).send('Mail inválido');
        }

        const registerResult = await svc.RegisterAsync(entity);
        
        return registerResult
            ? res.status(201).json(registerResult)
            : res.status(500).send('Error interno');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno');
    }
});

export default router;