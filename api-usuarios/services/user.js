const User = require('../models/user');
const fs = require('fs');
const csv = require('csv-parser');

exports.createUser = async (data) => {
    console.log(data);
    const { nome, email, idade } = data;
    const novoUsuario = new User({ nome, email, idade });
    return await novoUsuario.save();
};

exports.getUsers = async () => {
    return await User.find();
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

exports.batchAddUsers = (filePath) => {
    return new Promise((resolve, reject) => {
        const usuarios = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                usuarios.push(row);
            })
            .on('end', async () => {
                try {
                    await User.insertMany(usuarios);
                    resolve('Usuários adicionados com sucesso');
                } catch (error) {
                    reject(error);
                }
            });
    });
};
