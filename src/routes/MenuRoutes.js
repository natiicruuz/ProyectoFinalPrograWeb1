const express = require('express');
const { createMenu, updateMenu, deleteMenu, getAllMenus, getMenuById } = require('../Controllers/MenuController');

const router = express.Router();

console.log("[starting...][MenuRoutes]");

router.post('/create', createMenu);
router.get('/getAll', getAllMenus);
router.get('/get/:id', getMenuById);
router.put('/update/:id', updateMenu);
router.delete('/delete/:id', deleteMenu);

module.exports = router;

console.log("[end][MenuRoutes]");
