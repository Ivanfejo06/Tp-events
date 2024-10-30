export default class ValidationHelper
{
    //valida int
    validarInt = (data) => {
        if(data.parseInt())
        {
            return true;
        }
        else return false;
    }

    //validar string sin numeros
    validarString(s) {
        const regex = /^[a-zA-Z\s]+$/;;
        return regex.test(s);
    }

    //validar Mail
    validarMail = (data) =>
    {
        const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mail.test(data))
        {
            return true;
        }
        else return false;
    }
}