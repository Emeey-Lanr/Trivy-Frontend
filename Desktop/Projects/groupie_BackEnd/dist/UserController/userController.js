"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const db_1 = require("../db");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //    Find if user exist
        const findUser = yield db_1.pool.query("SELECT username FROM user_info WHERE username = $1", [username]);
        if (findUser.rows.length > 0) {
            res.send({ message: "Username already exist", status: false });
        }
        else {
            //hash the user password
            const hashedPasword = yield brcypt.hash(password, 10);
            //  user db insertion
            const registerUser = yield db_1.pool.query("INSERT INTO user_info(username, password) VALUES($1, $2)", [username, hashedPasword]);
            //  token creation
            const userToken = yield jwt.sign({ userId: username }, process.env.TKN, { expiresIn: "7d" });
            res.send({ status: true, client_Token: userToken });
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = (message, status) => {
        res.send({ message: message, status: status });
    };
    try {
        const { username, password } = req.body;
        const findUser = yield db_1.pool.query("SELECT * FROM user_info WHERE username = $1", [username]);
        if (findUser.rows.length > 0) {
            const checkIfPassword = yield brcypt.compare(password, findUser.rows[0].password);
            if (checkIfPassword) {
                const userToken = yield jwt.sign({ userId: findUser.rows[0].username }, process.env.TKN, { expiresIn: "7d" });
                message(userToken, true);
            }
            else {
                message("Invalid Password", false);
            }
        }
        else {
            message("Invalid login crendentails", false);
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.signin = signin;
// module.exports = {
//     signup,
//     signin
// }
