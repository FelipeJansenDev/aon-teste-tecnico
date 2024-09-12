const User = require('../models/user');
const fs = require('fs');
const csv = require('csv-parser');

exports.createUser = async (req, res) => {
    const { nome, email, idade } = req.body;
    try {
        const novoUsuario = new User({ nome, email, idade });
        await novoUsuario.save();
        res.status(201).send(novoUsuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, idade } = req.body;
    try {
        const usuarioAtualizado = await User.findByIdAndUpdate(id, { nome, email, idade }, { new: true });
        if (!usuarioAtualizado) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuarioAtualizado);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioRemovido = await User.findByIdAndDelete(id);
        if (!usuarioRemovido) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send('Usuário excluído com sucesso');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.batchAddUsers = (req, res) => {
    const usuarios = [];
    fs.createReadStream('usuarios.csv')
        .pipe(csv())
        .on('data', (row) => {
            usuarios.push(row);
        })
        .on('end', async () => {
            try {
                await User.insertMany(usuarios);
                res.status(201).send('Usuários adicionados com sucesso');
            } catch (error) {
                res.status(500).send(error);
            }
        });
};
