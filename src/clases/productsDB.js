//const fs    = require("fs");
//const knex  = require('knex')(this.conexion)


class ProductsDB {
  constructor(conexion, name) {
    this.conexion = conexion;
    this.name     = name;
    this.knex  = require('knex')(this.conexion);
  }

  async getAllProducts() {
    try {
      const all = await this.knex.select("*").from(this.name).then((rows)=> {
          return rows
        }
      );
      return all;
    } catch (err) {
      console.log(err);
    }
  }

  // Create new Product
  async createProduct(objProd) {
    try {
      await this.knex.insert(objProd).into(this.name)
      const rows = await this.getAllProducts();
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = ProductsDB;

