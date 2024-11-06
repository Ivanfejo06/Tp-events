import DataBaseHelper from "../helpers/Db_helper.js";
const DBHelper = new DataBaseHelper;

export default class EventRepository
{
    //Listar eventos Endpoint:
    getAllAsync = async (filtro) =>
    {
        let returnArray = null;
        let sql = `
        SELECT
            E.id, E.name, 
            E.description,
            E.start_date,
            E.duration_in_minutes,
            E.price,
            E.enabled_for_enrollment,
            E.max_assistance, 
            json_build_object('id',U.id, 'first_name',U.first_name, 'last_name',U.last_name, 'username',U.username, 'password','*****') As User,
            json_build_object('id',C.id, 'name',C.name, 'display_order', C.display_order) As Category,
            json_build_object('id',EL.id, 'id_location',EL.id_location, 'name',EL.name, 'full_address',EL.full_address, 'max_capacity',EL.max_capacity, 'latitude',EL.latitude, 'longitude',EL.longitude, 'id_creator_user',EL.id_creator_user) As Ubication
        FROM
            events as E
            Inner Join users as U on E.id_creator_user = U.id
            Inner join event_categories As C on E.id_event_category = C.id
            inner join event_locations As EL on E.id_event_location = EL.id
            Left join event_tags As ET on E.id = ET.id_event
            Left join tags As T on ET.id_tag = T.id
        Where 1=1`;
        let values = [];
        if (filtro.hasOwnProperty("name")) {
            sql = `${sql} AND E.name = $${values.length + 1}`;
            values.push(filtro.name);
        }
        if (filtro.hasOwnProperty("category")) {
            sql = `${sql} AND C.name = $${values.length + 1}`;
            values.push(filtro.category);
        }
        if (filtro.hasOwnProperty("start_date")) {
            sql = `${sql} AND E.start_date > $${values.length + 1}::timestamp without time zone`;
            values.push(filtro.start_date);
        }
        if (filtro.hasOwnProperty("tag")) {
            sql = `${sql} AND T.name = $${values.length + 1}`;
            values.push(filtro.tag);
        }
        sql = `${sql} Group by E.id, U.id, C.id, El.id`
        
        returnArray = await DBHelper.requestValues(sql,values);
        return returnArray;
    }

    //Detalles de un evento(id) Endpoint:
    getDetailsEventAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT 
            E.id, 
            E.name, 
            E.description, 
            E.start_date, 
            E.duration_in_minutes, 
            E.price, 
            E.enabled_for_enrollment, 
            E.max_assistance, 
            json_build_object('id', EL.id, 'id_location', EL.id_location, 'name', EL.name, 'full_address', EL.full_address, 'max_capacity', EL.max_capacity, 'latitude', EL.latitude, 'longitude', EL.longitude, 'id_creator_user', EL.id_creator_user) AS "Location",
            json_build_object('id', U.id, 'first_name', U.first_name, 'last_name', U.last_name, 'username', U.username, 'password', '*****') AS "Creator_user",
            json_build_object('id', T.id, 'name', T.name) AS "Tags",
            json_build_object('id', C.id, 'name', C.name, 'display_order', C.display_order) AS "Category"
        FROM 
            events AS E 
            INNER JOIN users AS U ON E.id_creator_user = U.id
            left JOIN event_categories AS C ON E.id_event_category = C.id
            INNER JOIN event_locations AS EL ON E.id_event_location = EL.id 
            INNER JOIN locations AS L ON EL.id_location = L.id 
            INNER JOIN provinces AS P ON L.id_province = P.id
            Left JOIN event_tags AS ET ON E.id = ET.id_event
            Left JOIN tags AS T ON ET.id_tag = T.id
        WHERE 
            E.id = $1
        Group by
            E.id, El.id, U.id, T.id, C.id`;
        const values = [id];
        returnArray = DBHelper.requestOne(sql, values);
        return returnArray;
    }

    getAllEventsByUser = async (id_creator_user) => {
        let returnArray = null;
        let sql = `
        SELECT
            E.id, E.name, 
            E.description,
            E.start_date,
            E.duration_in_minutes,
            E.price,
            E.enabled_for_enrollment,
            E.max_assistance, 
            json_build_object('id', U.id, 'first_name', U.first_name, 'last_name', U.last_name, 'username', U.username, 'password', '*****') As User,
            json_build_object('id', C.id, 'name', C.name, 'display_order', C.display_order) As Category,
            json_build_object('id', EL.id, 'id_location', EL.id_location, 'name', EL.name, 'full_address', EL.full_address, 'max_capacity', EL.max_capacity, 'latitude', EL.latitude, 'longitude', EL.longitude, 'id_creator_user', EL.id_creator_user) As Ubication
        FROM
            events as E
            INNER JOIN users as U ON E.id_creator_user = U.id
            INNER JOIN event_categories AS C ON E.id_event_category = C.id
            INNER JOIN event_locations AS EL ON E.id_event_location = EL.id
            LEFT JOIN event_tags AS ET ON E.id = ET.id_event
            LEFT JOIN tags AS T ON ET.id_tag = T.id
        WHERE 1=1`;
    
        let values = [];
    
        // Si el valor de id_creator_user es 'all', no agregamos el filtro
        if (id_creator_user !== 'all' && id_creator_user) {
            sql = `${sql} AND E.id_creator_user = $${values.length + 1}`;
            values.push(id_creator_user);
        }
    
        sql = `${sql} GROUP BY E.id, U.id, C.id, EL.id`;
    
        try {
            returnArray = await DBHelper.requestValues(sql, values);
            return returnArray;
        } catch (error) {
            console.error(`Error al obtener los eventos:`, error);
            throw new Error('Error al obtener eventos');
        }
    };    

    //Devolver max_capacity
    getMaxCapacityAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT 
            L.max_capacity
        FROM 
            events AS E 
            INNER JOIN event_locations As L On E.id_event_location = L.id
        WHERE 
            E.id = $1`;
        const values = [id];
        returnArray = DBHelper.requestOne(sql, values);
        return returnArray;
    }

    //Devolver max_assistance
    getMaxAssistanceAsync = async (id) =>
    {
        let returnArray = null;
        let sql = `
        SELECT 
            max_assistance
        FROM 
            events
        WHERE 
            id = $1`;
        const values = [id];
        returnArray = DBHelper.requestOne(sql, values);
        return returnArray;
    }

    //Crear evento
    createAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `
        Insert into events(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
        const values = [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, 0, entity.max_assistance, entity.id_creator_user]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Modificar evento
    updateAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `
        Update evento Set name=$2, description=$3, id_event_category=$4, id_event_location=$5, start_date=$6, duration_in_minutes=$7, price=$8, enabled_for_enrollment=$9, max_assistance=$10, id_creator_user=$11
        Where id = $1`;
        const values = [entity.id, entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id_creator_user]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //eliminar evento
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM events where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}