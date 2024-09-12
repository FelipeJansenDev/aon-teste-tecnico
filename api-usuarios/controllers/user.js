const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const novoUsuario = await userService.createUser(req.body);
        res.status(201).send(novoUsuario);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const usuarios = await userService.getUsers();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioAtualizado = await userService.updateUser(id, req.body);
        res.status(200).send(usuarioAtualizado);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(200).send('Usuário excluído com sucesso');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.batchAddUsers = async (req, res) => {
    const filePath = 'usuarios.csv'; // Caminho do arquivo CSV
    try {
        const mensagem = await userService.batchAddUsers(filePath);
        res.status(201).send(mensagem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
