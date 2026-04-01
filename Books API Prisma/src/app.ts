import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import bookRoutes from "./routes/book.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import reviewRoutes from "./routes/review.routes.js"

const app = express();
app.use(cors());
app.use(express.json());
/* Dokumentatsioon asub lingis http://localhost:3000/api-docs/ */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/books/:bookId/reviews", reviewRoutes);
app.use("/api/v1/books", bookRoutes);
app.use(errorMiddleware);
export default app;