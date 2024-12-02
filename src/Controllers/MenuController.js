const Menu = require('../Models/MenuModel');

exports.createMenu = async (req, res) => {
    try {
        console.log("[starting...][MenuController][createMenu]");

        const { name, description, price, available } = req.body;

        // Verificar si el menú ya existe por nombre
        const existingMenu = await Menu.findOne({ name });
        if (existingMenu) {
            return res.status(409).json({ message: 'El menú ya existe' });
        }

        // Crear un nuevo menú
        const newMenu = new Menu({ name, description, price, available });
        await newMenu.save();

        console.log("[end][MenuController][createMenu]");
        res.status(201).json({ message: 'Menú creado exitosamente', data: newMenu });
    } catch (error) {
        console.error('[createMenu] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        console.log("[starting...][MenuController][updateMenu]");

        const { id } = req.params;
        const { name, description, price, available } = req.body;

        // Verificar si el menú existe
        const existingMenu = await Menu.findById(id);
        if (!existingMenu) {
            return res.status(404).json({ message: 'Menú no encontrado' });
        }

        // Actualizar los campos proporcionados
        existingMenu.name = name || existingMenu.name;
        existingMenu.description = description || existingMenu.description;
        existingMenu.price = price || existingMenu.price;
        existingMenu.available = available || existingMenu.available;

        // Guardar los cambios en la base de datos
        await existingMenu.save();

        console.log("[end][MenuController][updateMenu]");
        res.status(200).json({ message: 'Menú actualizado exitosamente', data: existingMenu });
    } catch (error) {
        console.error('[updateMenu] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteMenu = async (req, res) => {
    try {
        console.log("[starting...][MenuController][deleteMenu]");
        const { id } = req.params;

        // Verificar si el menú existe
        const existingMenu = await Menu.findById(id);
        if (!existingMenu) {
            return res.status(404).json({ message: 'Menú no encontrado' });
        }

        // Eliminar el menú
        await Menu.findByIdAndDelete(id);

        console.log("[end][MenuController][deleteMenu]");
        res.status(200).json({ message: 'Menú eliminado exitosamente' });
    } catch (error) {
        console.error('[deleteMenu] Error:', error.message);
        res.status(500).json({ message: 'Error al eliminar el menú' });
    }
};

exports.getAllMenus = async (req, res) => {
    try {
        console.log("[starting...][MenuController][getAllMenus]");

        // Buscar todos los menús
        const menus = await Menu.find();
        console.log("[end][MenuController][getAllMenus]");
        res.status(200).json({ message: 'Menús obtenidos exitosamente', data: menus });
    } catch (error) {
        console.error('[getAllMenus] Error:', error.message);
        res.status(500).json({ message: 'Error al obtener los menús' });
    }
};

exports.getMenuById = async (req, res) => {
    try {
        console.log("[starting...][MenuController][getMenuById]");

        const { id } = req.params;

        // Buscar el menú por ID
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: 'Menú no encontrado' });
        }

        console.log("[end][MenuController][getMenuById]");
        res.status(200).json({ message: 'Menú obtenido exitosamente', data: menu });
    } catch (error) {
        console.error('[getMenuById] Error:', error.message);
        res.status(500).json({ message: 'Error al obtener el menú' });
    }
};
