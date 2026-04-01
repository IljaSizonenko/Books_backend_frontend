import { Router } from "express";
import bookRoutes from "./book.routes.js";
import reviewRoutes from "./review.routes.js";

const router = Router();
router.use("/books", reviewRoutes);
router.use("/books", bookRoutes);
export default router