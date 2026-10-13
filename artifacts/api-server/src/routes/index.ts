import { Router, type IRouter } from "express";
import healthRouter from "./health";
import regulationGuideRouter from "./regulation-guide";

const router: IRouter = Router();

router.use(healthRouter);
router.use(regulationGuideRouter);

export default router;
