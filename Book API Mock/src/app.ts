import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express()
app.use(express.json());
/* Dokumentatsioon asub lingis http://localhost:3000/api-docs/ */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", routes);
app.use(errorHandler);
export default app