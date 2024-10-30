import DataBaseHelper from "../helpers/Db_helper.js";
const DBHelper = new DataBaseHelper;

export default class TagsRepository
{
    //Listar tags
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM tags";
        returnArray = DBHelper.requestAll(sql);
        return returnArray;
    }

    //Busca tag por ID
    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM tags where id = $1`;
        const values = [id];
        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }

    //Crea una tag
    createAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Insert into tags(name) Values ($1)`;
        const values = [entity.name]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Actualiza una tag
    updateAsync = async (entity) =>
    {
        let returnArray = null;
        const sql = `Update tags Set name= $1 Where id= $2`;
        const values = [entity.name, entity.id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }

    //Borra una tag
    deleteByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `Delete FROM tags where id = $1`;
        const values = [id]
        returnArray = DBHelper.requestCount(sql, values);
        return returnArray;
    }
}