import DataBaseHelper from '../helpers/Db_helper.js';
const DBHelper = new DataBaseHelper;

export default class Event_tagsRepository
{
    //Listar event_tags
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM event_tags";
        returnArray = DBHelper.requestAll(sql);
        return returnArray;
    }

    //Busca event_tag por ID
    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM event_tags where id = $1`;
        const values = [id];
        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Crea una event_tag
    createAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Insert into tags(id_event, id_tag) Values ($1)`;
        const values = [entity.id_event, entity.id_tag]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
    
    //Actualiza una event_tag
    updateAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Update event_tags Set id_event= $1, id_tag= $2 Where id= $3`;
        const values = [entity.id_event, entity.id_tag, entity.id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Borra una tag
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM event_tags where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}