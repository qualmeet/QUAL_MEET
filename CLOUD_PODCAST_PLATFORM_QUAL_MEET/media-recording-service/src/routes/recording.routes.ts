import {Router} from "express";
import { chunkCompleteController, completeRecordingController, forceStopRecordingController, getMyRecordingsController, getRecordingStatusController, initRecordingController,uploadUrlController } from "../controllers/recording.controller";

const router=Router();

router.post("/recordings/init",initRecordingController);

router.post("/recordings/upload-url",uploadUrlController);
router.post("/recordings/chunk-complete",chunkCompleteController);

router.post("/recordings/complete",completeRecordingController);

router.get("/recordings/my",getMyRecordingsController);

router.get("/recordings/:sessionId",getRecordingStatusController);

router.post("/recordings/force-stop",forceStopRecordingController);


export default router;