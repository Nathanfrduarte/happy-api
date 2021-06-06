"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const ErrorHandler = (error, req, res, next) => {
    // Tratamento dos erros de validação
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.errors;
        });
        return res.status(400).json({ message: 'Validation fails', errors });
    }
    console.log('\n> ', error, '\n');
    return res.status(500).json({ message: 'Internal server error' });
};
exports.default = ErrorHandler;
