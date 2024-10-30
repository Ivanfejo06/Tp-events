import DataBaseHelper from "../helpers/Db_helper.js";
const DBHelper = new DataBaseHelper;

export default class Event_enrollmentRepository
{
    //Listar Enrollment Endpoint:
    getAllAsync = async (id_event, filtro) =>
    {
        let returnArray = null;
        let sql = `
        SELECT
            json_build_object('id',E.id, 'id_event',E.id_event,
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','******') As user,
            'description',E.description, 'registration_date_time',E.registration_date_time, 'attended',E.attended, 'observations',E.observations, 'rating',E.rating) As collection
        FROM
            event_enrollment As E inner join users As U on E.id_user = U.id
        where
            E.id_event = $1,`;
        let values = [id_event];
        if(filtro.hasOwnProperty("first_name"))
        {
            sql += ` And U.first_name = $${values.length + 1}`;
            values.push(filtro.first_name);
        }
        if(filtro.hasOwnProperty("last_name"))
        {
            sql += ` And U.last_name = $${values.length + 1}`;
            values.push(filtro.last_name);
        }
        if(filtro.hasOwnProperty("username"))
        {
            sql += ` And U.username = $${values.length + 1}`;
            values.push(values.username);
        }
        if(filtro.hasOwnProperty("attended"))
        {
            sql += ` E.attended = $${values.length + 1}`;
            values.push(values.attended);
        }
        if(filtro.hasOwnProperty("rating"))
        {
            sql += ` E.rating = $${values.length + 1}`;
            values.push(values.rating);
        }

        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Buscar enrollment en un evento
    getAllByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `
        SELECT
            ER.*
        FROM
            event_enrollment As ER inner join events As E on E.id = ER.id_event
        where
            E.id_event = $1`;
        const values = [id];

        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Buscar un enrollment especifico
    getEnrollmentAsync = async (id_event, id_user) =>
    {
        let returnArray = null;
        const sql = `
        SELECT
            *
        FROM
            event_enrollment
        where
            id_event = $1 and id_user = $2`;
        const values = [id_event, id_user];

        returnArray = DBHelper.requestOne(sql, values);
        return returnArray;
    }

    //Devolver asistencias
    getAssistanceAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT Distinct 
            *
        FROM 
            event_enrollment
        WHERE 
            id_event = $1`;
        const values = [id];
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Crear enrollment
    createAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `
        Insert into event_enrollment(id_event, id_user, description, registration_date_time, attended, observations, rating)
        Values ($1,$2,$3,$4,$5,$6,$7)`;
        const values = [entity.id_event, entity.id_user, entity.description, Date.now(), entity.attended, entity.observation, entity.rating]
        const assistances = getAssistanceAsync(entity.id_event);
        if(assistances + 1 == Evento.max_assistance)
        {
            const sql2 = `
            Update evento Set enabled_for_enrollment=$2
            Where id = $1`;
            const values2 = [entity.id_event, false]
            const enrollment = DBHelper.requestCount(sql2, values2);
        }
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //eliminar enrollment
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM event_enrollment where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}