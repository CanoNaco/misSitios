import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  
  db : SQLiteObject = null;
    
  constructor(public sqlite: SQLite) {
    console.log('Hello Db Provider');
  }

  //metodo para crear la base de datos
  public openDb(){
    return this.sqlite.create({
        name: 'data.db',
        location: 'default' // el campo location es obligatorio
    })
    .then((db: SQLiteObject) => {
     this.db =db;
   })
  }
  
  //crear una tabla dentro de la base de datos con los campos que necesitamos
  public createTableSitios(){
    return this.db.executeSql("create table if not exists sitios( id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, address TEXT, description TEXT, foto TEXT )",[])
  }

  //metodo para guaredar nuestros sitios
  public addSitio(sitio){
    let sql = "INSERT INTO sitios (lat, lng, address, description, foto) values (?,?,?,?,?)";
    return this.db.executeSql(sql,[sitio.lat,sitio.lng,sitio.address,sitio.description,sitio.foto]);
  }

  //metodo para obtener sitios
  public getSitios(){
    let sql = "SELECT * FROM sitios";
    return this.db.executeSql(sql,[]);
  }

  public modificaSitio(sitio){
    let sql = "UPDATE sitios  SET lat = ?, lng = ?, address = ?, description = ?, foto = ? WHERE id = ? ";
    return this.db.executeSql(sql,[sitio.lat,sitio.lng,sitio.address,sitio.description,sitio.foto, sitio.id]);
  }

  public borrarSitio(id){
    let sql = "DELETE FROM sitios WHERE id= ? ";
    return this.db.executeSql(sql,[id]);
 }

}
