const joi = require('joi');
const usersService = require('../services/users');
const session = require('../lib/session');
const { getApiRouteHandler } = require('../lib/routing');

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     summary: Logs in and returns the authentication cookie and user data
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       description: A JSON object containing the login and password.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     security: []    # no authentication
 *     responses:
 *       200:
 *         description: >
 *           Successfully authenticated.
 *           The session ID is returned in a cookie named `vmsession`. You need to include this cookie in subsequent requests.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: vmsession=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

const loginSchema = joi.object({
  username: joi.string().max(256).required(),
  password: joi.string().min(8).max(128).required(),
});

const login = getApiRouteHandler(async (req, res, next) => {
  const { username, password } = req.valid;
  const user = await usersService.checkCredentials(username, password);
  await session.regenerate(req, user.id);
  return user;
}, loginSchema);

/**
 * @swagger
 *
 * /auth/logout:
 *   post:
 *     summary: Logs out (removes current session)
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: >
 *           Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */

const logout = getApiRouteHandler(async (req, res, next) => {
  await session.destroy(req, res);
  return { message: 'Session ended' };
});

/**
 * @swagger
 *
 * /auth/logout/all:
 *   post:
 *     summary: Logs out from all devices (removes all current user's sessions)
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: >
 *           Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */

const logoutAll = getApiRouteHandler(async (req, res, next) => {
  await session.invalidate(req);
  await session.destroy(req, res);
  return { message: 'Session ended' };
});

/**
 * @swagger
 *
 * /auth/me:
 *   post:
 *     summary: Gets current user info
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: >
 *           Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

const getMe = getApiRouteHandler((req, res, next) => {
  return usersService.getUser(req.session.userid);
});

module.exports = {
  login,
  logout,
  getMe,
  logoutAll,
};
