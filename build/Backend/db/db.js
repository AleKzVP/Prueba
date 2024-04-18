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
        this.data = JSON.parse(String(fs_1.default.readFileSync(this.url)));
    }
    save() {
        fs_1.default.writeFileSync(this.url, JSON.stringify(this.data));
    }
    load() {
        this.data = JSON.parse(String(fs_1.default.readFileSync(this.url)));
    }
}
exports.default = db;
