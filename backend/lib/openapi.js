const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const fse = require('fs-extra');

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: vmsession  # cookie name
 *   responses:
 *     BadRequest:
 *       description: Validation error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldErrors:
 *                 type: array
 *                 description: Error messages for form fields
 *                 items:
 *                   $ref: '#/components/schemas/FieldError'
 *               nonfieldErrors:
 *                 type: array
 *                 description: General error messages list
 *                 items:
 *                   type: string
 *   schemas:
 *     FieldError:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *           description: Field name
 *         message:
 *           type: string
 *           description: Error message
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User login
 *         password:
 *           type: string
 *           description: User password
 *     UserUpdateRequest:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: User login
 *         password:
 *           type: string
 *           description: User password
 *     SignupRequest:
 *       type: object
 *       required:
 *         - username
 *         - role
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           maxLength: 128
 *           description: User login
 *         role:
 *           type: integer
 *           description: User role (1 - seller, 2 - buyer)
 *           enum: [1, 2]
 *         password:
 *           type: string
 *           maxLength: 128
 *           description: User password
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: User id
 *         username:
 *           type: string
 *           maxLength: 128
 *           description: User login
 *         role:
 *           type: integer
 *           description: User role (1 - seller, 2 - buyer)
 *           enum: [1, 2]
 *         deposit:
 *           type: integer
 *           description: Current user deposit
 *     ProductBody:
 *       type: object
 *       required:
 *         - productName
 *         - amountAvailable
 *         - cost
 *       properties:
 *         productName:
 *           type: string
 *           maxLength: 128
 *           description: Product name
 *         amountAvailable:
 *           type: integer
 *           description: Amount available
 *         cost:
 *           type: integer
 *           description: Product price
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Product id
 *         productName:
 *           type: string
 *           maxLength: 128
 *           description: Product name
 *         amountAvailable:
 *           type: integer
 *           description: Amount available
 *         cost:
 *           type: integer
 *           description: Product price
 *     BuyBody:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: integer
 *           format: int64
 *           description: Product id
 *         quantity:
 *           type: integer
 *           description: Quantity of products ordered
 *     DepositBody:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         value:
 *           type: integer
 *           enum: [5, 10, 20, 50, 100]
 *           description: Coin denomination
 *     BuyResponse:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           format: int64
 *           description: Product id
 *         total:
 *           type: integer
 *           description: Total price
 *         quantity:
 *           type: integer
 *           description: Quantity of products ordered
 *         change:
 *           type: array
 *           items:
 *             type: integer
 *           description: Coin change
 */

const generate = async (options) => {
  const swaggerSpec = swaggerJSDoc(options);
  const jsonPath = path.join(__dirname, '/../openapi.json');
  return fse.writeJson(jsonPath, swaggerSpec);
};

module.exports = {
  generate,
};
