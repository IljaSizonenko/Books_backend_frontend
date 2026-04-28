import { Router } from "express";
import { BookController } from "../controllers/book.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { bookCreateSchema, bookUpdateSchema } from "../validators/book.validators.js";
const router = Router();
router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.post("/", validate(bookCreateSchema), BookController.create);
router.put("/:id", validate(bookUpdateSchema), BookController.update);
router.delete("/:id", BookController.delete);
export default router;
//# sourceMappingURL=book.routes.js.map