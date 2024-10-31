import DataBaseHelper from '../helpers/Db_helper.js';
const DBHelper = new DataBaseHelper;

export default class Event_locationRepository
{
    //Listar event_locations
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM event_locations";
        returnArray = DBHelper.requestAll(sql);
        return returnArray;
    }

   //Busca event_locations por ID
   getByIdAsync = async (id) =>
   {
       let returnArray = null;
       const sql = `SELECT * FROM event_locations where id = $1`;
       const values = [id];
       returnArray = DBHelper.requestValues(sql, values);
       return returnArray;
   }

   getMaxCapacity = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT max_capacity FROM event_locations where id = $1`;
        const values = [id];
        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }
}