"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//objeto DB que almacena y carga los datos que se van a usar
class db {
    constructor(url) {
        this.data = [];
        this.url = "";
        this.url = url;
        this.data = JSON.parse(String(fs_1.default.readFileSync(this.url))); //PUNTO DEBIL
    }
    save() {
        fs_1.default.writeFileSync(this.url, JSON.stringify(this.data)); // PUNTO DEBIL
    }
    load() {
        this.data = JSON.parse(String(fs_1.default.readFileSync(this.url)));
    }
}
exports.default = db;
