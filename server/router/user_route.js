const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.route('/add-user').post(userController.addUser);

router.route('/').get(userController.getAllUsers);
router.route('/:userId').get(userController.getUserById);
router.route('/:id').put(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);

module.exports = router;