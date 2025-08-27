import { Router } from "express";
import {
    loginUser,
    logOutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    userChannelProfile,
    getWatchHistory
}
    from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";




const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(verifyJWT, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar) // avatar update route
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage) // cover image update route

router.route("/c/:username").get(verifyJWT, userChannelProfile) // get user channel profile by username
router.route("/history").get(verifyJWT, getWatchHistory) // get user's watch history

export default router;