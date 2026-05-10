import { Router } from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { reviewCreateSchema } from "../validators/review.validators.js";
const router = Router();
router.get("/:bookId/reviews", ReviewController.getByBook);
router.post("/:bookId/reviews", validate(reviewCreateSchema), ReviewController.create);
router.get("/:bookId/reviews/average", ReviewController.getAverageRating);
export default router;
//# sourceMappingURL=review.routes.js.map