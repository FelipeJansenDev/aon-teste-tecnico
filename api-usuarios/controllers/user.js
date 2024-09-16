const userService = require('../services/user');

exports.createUser = async (req, res) => {
    try {
        const novoUsuario = await userService.createUser(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const usuarios = await userService.getUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await userService.getUserById(id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioAtualizado = await userService.updateUser(id, req.body);
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.batchAddUsers = async (req, res) => {
    const filePath = 'usuarios.csv';
    try {
        const mensagem = await userService.batchAddUsers(filePath);
        res.status(201).json({ message: mensagem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
