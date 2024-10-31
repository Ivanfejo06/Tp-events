export default class ValidationHelper
{
    //valida int
    validarInt = (data) => {
        // Verifica si data es un número y si es un entero
        if (typeof data === 'number' && Number.isInteger(data)) {
            return true;
        }
        
        // Si no es un número o no es un entero, intenta convertirlo a entero
        const parsed = parseInt(data, 10);
        return !isNaN(parsed) && Number.isInteger(parsed);
    }    

    //validar string sin numeros
    validarString(s) {
        const regex = /^[a-zA-Z\s]+$/;;
        return regex.test(s);
    }

    //validar Mail
    validarMail = (data) => {
        const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return mail.test(data); // Devuelve true si es válido, false si no lo es
    };    
}