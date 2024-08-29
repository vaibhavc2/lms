import auth from '#/common/middlewares/auth.middleware';
import multerService from '#/common/middlewares/multer.middleware';
import uploadMiddleware from '#/common/middlewares/upload.middleware';
import { Router } from 'express';
import avatarController from '../controllers/avatar.controller';

const router = Router();

// Global middlewares for all routes in this file
router.use(auth.user()); // Authenticate user

/**
 * @openapi
 * /avatars/upload:
 *   post:
 *     summary: Uploads (or Updates) an avatar image
 *     description: This endpoint allows for the uploading of a user avatar image. It uses multipart/form-data for the upload.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image file to upload.
 *           required:
 *             - avatar
 *     responses:
 *       '200':
 *         description: Successfully uploaded the avatar image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar uploaded successfully.
 *                 url:
 *                   type: string
 *                   example: http://example.com/path/to/avatar.jpg
 *                   description: URL to the uploaded avatar image.
 *       '400':
 *         description: Bad request, such as missing or invalid avatar file.
 *       '500':
 *         description: Internal server error, such as a failure in the upload process.
 *     tags:
 *       - Avatars
 *     operationId: uploadAvatar
 */
router.post(
  '/upload',
  multerService.multer('single', {
    fieldName: 'avatar',
  }),
  uploadMiddleware.image('avatar'),
  avatarController.upload,
);

/**
 * @openapi
 * /avatars/get-info:
 *   get:
 *     summary: Retrieves the avatar image
 *     description: This endpoint allows for the retrieval of a user's avatar image.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the avatar image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar retrieved successfully.
 *                 url:
 *                   type: string
 *                   example: http://example.com/path/to/avatar.jpg
 *                   description: URL to the avatar image.
 *       '400':
 *         description: Bad request, such as missing or invalid avatar file.
 *       '500':
 *         description: Internal server error, such as a failure in the retrieval process.
 *     tags:
 *       - Avatars
 *     operationId: getAvatar
 */
router.get('/get-info', avatarController.getInfo);

/**
 * @openapi
 * /avatars/delete:
 *   delete:
 *     summary: Deletes the avatar image
 *     description: This endpoint allows for the deletion of a user's avatar image.
 *     responses:
 *       '200':
 *         description: Successfully deleted the avatar image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar deleted successfully.
 *       '400':
 *         description: Bad request, such as missing or invalid avatar file.
 *       '500':
 *         description: Internal server error, such as a failure in the deletion process.
 *     tags:
 *       - Avatars
 *     operationId: deleteAvatar
 */
router.delete('/delete', avatarController.delete);

export default router;
