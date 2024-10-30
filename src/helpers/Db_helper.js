import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class DataBaseHelper {
    // Devuelve un objeto
    async requestOne(sql, values) {
        let data = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const result = await client.query(sql, values);
            if (result.rowCount > 0) {
                data = result.rows[0];
            }
        } catch (error) {
            console.error("Error en requestOne:", error);
            throw error; // Lanza el error para que se pueda manejar en el servicio
        } finally {
            await client.end();
        }
        return data;
    }

    // Devuelve las row counts
    async requestCount(sql, values) {
        let data = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const result = await client.query(sql, values);
            if (result.rowCount > 0) {
                data = result.rowCount;
            }
        } catch (error) {
            console.error("Error en requestCount:", error);
            throw error; // Lanza el error para que se pueda manejar en el servicio
        } finally {
            await client.end();
        }
        return data;
    }

    // Varios objetos
    async requestValues(sql, values) {
        let data = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const result = await client.query(sql, values);
            if (result.rowCount > 0) {
                data = result.rows;
            }
        } catch (error) {
            console.error("Error en requestValues:", error);
            throw error; // Lanza el error para que se pueda manejar en el servicio
        } finally {
            await client.end();
        }
        return data;
    }

    // Todos
    async requestAll(sql) {
        let data = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const result = await client.query(sql);
            data = result.rows;
        } catch (error) {
            console.error("Error en requestAll:", error);
            throw error; // Lanza el error para que se pueda manejar en el servicio
        } finally {
            await client.end();
        }
        return data;
    }
}