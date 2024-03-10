import express from "express";
import {
  loginController,
  registerController,
} from "../controller/authController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *        
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
//  *      example:
//  *        id: GDHJGD788BJBJ
//  *        name: Bishal Bhatta
//  *        location: Kathmandu
//  *        email: bishal@gmail.com
//  *        password: password
 *
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 *  /api/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal serevr error
 */

router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: login successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: something went wrong of server error
 */

router.post("/login", loginController);

export default router;
