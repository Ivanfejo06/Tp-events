import DataBaseHelper from "../helpers/Db_helper.js";
const DBHelper = new DataBaseHelper;

export default class Event_enrollmentsRepository
{
    //Listar Enrollment Endpoint:
    getAllAsync = async (id_event, filtro) => {
        let returnArray = null;
        let sql = `
            SELECT 
                E.id AS id,
                E.id_event AS id_event,
                U.id AS user_id,
                U.first_name AS first_name,
                U.last_name AS last_name,
                U.username AS username,
                E.description AS description,
                E.registration_date_time AS registration_date_time,
                E.attended AS attended,
                E.observations AS observations,
                E.rating AS rating
            FROM 
                event_enrollments AS E
                INNER JOIN users AS U ON E.id_user = U.id
            WHERE 
                E.id_event = $1`;
    
        let values = [id_event];
    
        if (filtro.hasOwnProperty("first_name")) {
            sql += ` AND U.first_name = $${values.length + 1}`;
            values.push(filtro.first_name);
        }
        if (filtro.hasOwnProperty("last_name")) {
            sql += ` AND U.last_name = $${values.length + 1}`;
            values.push(filtro.last_name);
        }
        if (filtro.hasOwnProperty("username")) {
            sql += ` AND U.username = $${values.length + 1}`;
            values.push(filtro.username);
        }
        if (filtro.hasOwnProperty("attended")) {
            sql += ` AND E.attended = $${values.length + 1}`;
            values.push(filtro.attended);
        }
        if (filtro.hasOwnProperty("rating")) {
            sql += ` AND E.rating = $${values.length + 1}`;
            values.push(filtro.rating);
        }
    
        // Asegúrate de usar await aquí
        returnArray = await DBHelper.requestValues(sql, values);
        return returnArray;
    };    

    //Buscar enrollment en un evento
    getAllByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `
        SELECT
            ER.*
        FROM
            event_enrollments As ER inner join events As E on E.id = ER.id_event
        where
            E.id_event = $1`;
        const values = [id];

        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Buscar un enrollment especifico
    getEnrollmentAsync = async (id_event, id_user) => {
        const sql = `
            SELECT
                *
            FROM
                event_enrollments
            WHERE
                id_event = $1 AND id_user = $2`;
        const values = [id_event, id_user];
    
        try {
            const result = await DBHelper.requestOne(sql, values);
            return result; // Devuelve el primer resultado o null si no hay resultados
        } catch (error) {
            console.error('Error en getEnrollmentAsync:', error);
            throw error; // Lanza el error para que se maneje en el llamado a la función
        }
    };
    
    //Devolver asistencias
    getAssistanceAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT Distinct 
            *
        FROM 
            event_enrollments
        WHERE 
            id_event = $1`;
        const values = [id];
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Crear enrollment
    createAsync = async (entity) => {
        let returnArray = null;
    
        // Validar que todos los campos necesarios estén presentes
        if (!entity.id_event || !entity.id_user) {
            throw new Error("Error: Todos los campos son necesarios y deben ser válidos.");
        }
    
        // Formatear la fecha solo hasta el día (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
    
        const sql = `
        INSERT INTO event_enrollments(id_event, id_user, description, registration_date_time, attended, observations, rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        
        const values = [
            entity.id_event,
            entity.id_user,
            entity.description,
            today,
            entity.attended,
            entity.observation || null,  // Asegúrate de manejar valores nulos
            entity.rating || null        // Asegúrate de manejar valores nulos
        ];
        
        returnArray = await DBHelper.requestCount(sql, values);
        return returnArray;
    };    

    //eliminar enrollment
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM event_enrollments where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}