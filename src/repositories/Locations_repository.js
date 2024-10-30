import DataBaseHelper from "../helpers/db-helper";
const DBHelper = new DataBaseHelper;

export default class LocationsRepository
{
    //Listar locations
    getAllAsync = async () =>
    {
        let returnArray = null;
        const sql = "SELECT * FROM locations";
        returnArray = DBHelper.requestAll(sql);
        return returnArray;
    }

    //Busca location por ID
    getByIdAsync = async (id) =>
    {
        let returnArray = null;
        const sql = `SELECT * FROM locations where id = $1`;
        const values = [id];
        returnArray = DBHelper.requestValues(sql, values);
        return returnArray;
    }
}