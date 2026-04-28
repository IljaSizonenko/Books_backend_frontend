import { Router } from "express";
import bookRoutes from "./book.routes.js";
import reviewRoutes from "./review.routes.js";

const router = Router();
router.use("/books", bookRoutes);
router.use("/books", reviewRoutes);
export default router