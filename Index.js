import express from "express";
import cors from "cors";
import EventRouter from "./src/controllers/Event_controller.js";
import ProvinceRouter from "./src/controllers/Province_controller.js";
import UserRouter from "./src/controllers/Users_controller.js";
import Event_CategoriesRouter from './src/controllers/Event_categories_controller.js';
import Event_LocationsRouter from './src/controllers/Event_locations_controller.js';
import Event_TagsRouter from './src/controllers/Event_tags_controller.js';


const app=express();
const port=4000; //El puerto 4000 (http://localhost:4000)

//Agrego los Middlewares
app.use(cors()); //Middleware de CORS.
app.use(express.json()); //Middleware para parsear y comprender JSON.

//Endpoints (todos los Routers)
app.use("/api/event", EventRouter);
app.use("/api/event_categories", Event_CategoriesRouter);
app.use("/api/event_locations", Event_LocationsRouter);
app.use("/api/event_tags", Event_TagsRouter);
app.use("/api/province", ProvinceRouter);
app.use("/api/user", UserRouter);

//Inicio el Server y lo pongo a escuchar.
app.listen(port,()=> {
    console.log(`Example app listening on port ${port}`)
})