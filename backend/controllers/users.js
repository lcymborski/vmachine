const joi = require('joi');
const usersService = require('../services/users');
const { getApiRouteHandler } = require('../lib/routing');

const userSchema = joi.object({
  username: joi.string().max(256).required(),
  password: joi.string().min(8).max(128).required(),
  role: joi.number().integer().allow(1, 2).only(),
});

const userUpdateSchema = joi.object({
  username: joi.string().max(256).required(),
  password: joi.string().min(8).max(128),
});

const getUser = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  return usersService.getUser(id);
});

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Registers new user account
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       description: A JSON object containing the login, password and role.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     security: []    # no authentication
 *     responses:
 *       200:
 *         description: >
 *           Successfully created.
 *           After signing up user has to sign in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

const createUser = getApiRouteHandler((req, res, next) => {
  const { username, password, role } = req.valid;
  return usersService.createUser({ username, password, role });
}, userSchema);

/**
 * @swagger
 *
 * /users/{userId}:
 *   put:
 *     summary: Updates account info (username/password)
 *     description: Update limited to username/password only for account owned by user
 *     tags:
 *       - user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user account to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       description: A JSON object containing product info.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

const updateUser = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { username, password } = req.valid;
  return usersService.updateUser(req.session.userid, { id, username, password });
}, userUpdateSchema);

/**
 * @swagger
 *
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Deletes user account
 *     description: Available only to user who owns it
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of a user account to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Not owned by user
 *       404:
 *         description: User not found
 */

const deleteUser = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  return usersService.deleteUser(req.session.userid, id);
});

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
