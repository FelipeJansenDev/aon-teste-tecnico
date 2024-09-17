const User = require('../models/user');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');

exports.createUser = async (data) => {
    console.log(data);
    const { nome, email, idade } = data;
    const novoUsuario = new User({ nome, email, idade });
    return await novoUsuario.save();
};

exports.getUsers = async () => {
    return await User.find();
};

exports.getUserById = async (id) => {
    return await User.findById(id);
};

exports.updateUser = async (id, data) => {
    const { nome, email, idade } = data;
    const usuarioAtualizado = await User.findByIdAndUpdate(id, { nome, email, idade }, { new: true });
    if (!usuarioAtualizado) {
        throw new Error('Usuário não encontrado');
    }
    return usuarioAtualizado;
};

exports.deleteUser = async (id) => {
    const usuarioRemovido = await User.findByIdAndDelete(id);
    if (!usuarioRemovido) {
        throw new Error('Usuário não encontrado');
    }
    return usuarioRemovido;
};

exports.processCSV = (filePath) => {
    console.log("Salvando a partir do csv")
    return new Promise((resolve, reject) => {
        const usuarios = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                usuarios.push({
                    nome: row.nome,
                    email: row.email,
                    idade: parseInt(row.idade, 10),
                });
            })
            .on('end', async () => {
                try {
                    await User.insertMany(usuarios); // Adicionar todos os usuários
                    resolve('Usuários adicionados com sucesso');
                } catch (error) {
                    reject(error);
                }
            });
    });
};
