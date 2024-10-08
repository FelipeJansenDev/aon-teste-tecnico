const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/upload', upload.single('file'), userController.uploadUsersFromCSV);

module.exports = router;
