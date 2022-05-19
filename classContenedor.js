const fs = require ('fs');

module.exports = class Contenedor {

    constructor(archivo) {
        this.path=archivo;
        
        //me fijo si el archivo exite
        const stats = fs.existsSync(archivo);
        //si no existe lo creo
        if (!stats) {
            try {
                //leer archivo y cargarlo en array
                fs.promises.writeFile(archivo, "[]");
              } catch (e) {
                throw error;
              }
          }
    }

  
    /**
     * 
     * @param {recibe json en formato srting} object 
     */
    async save(object) {
        try {
            let id=1;

            //guardo el object y lo parseo a json
            let jsonSave=JSON.parse(object);

            //me traigo el contenido del archivo
            let dataParse = await this.getAll();
            
            //me fijo cual es el ultimo id y si no nada hay le asigno 1
            if (dataParse.length> 0 ){
                id=parseInt(dataParse[dataParse.length-1].id)+1;
                jsonSave.id=id;
            }
            else{
                jsonSave.id=id;
            }
            //guardo el nuevo objeto con el id ya asignado
            dataParse.push(jsonSave);

            //guardo el archivo otra vez
            await fs.promises.writeFile(this.path, JSON.stringify(dataParse));
            return jsonSave;

        } catch (error) {
            console.log(`Error : ${error.message}`);
        }
        
    }

    /**
     * 
     * @param {recibe id y devuelve el json de con ese id} idPedido 
     */
    async getById(idPedido) {
        let respuesta=null;
        try {
        
            //leo el archivo y lo parseo a json
            const dataParse = await this.getAll();
            
            //recorro el json buscando el id
            for (let i=0; i < dataParse.length; i++) {
                //si lo encuento lo retorno
                if(idPedido==dataParse[i].id){
                    respuesta= dataParse[i];
                }
            }

        } catch (error) {
            console.log(error.message);
        }

        //si ya recorrio todo el json y no lo encontro, devuelvo el mensaje diciendo que no se encontro
        if(respuesta==null){
            respuesta={error: 'producto no encontrado'};
        }
        
        return JSON.stringify(respuesta);
        
    };

    //leo el archivo, lo parseo a json y lo devuelvo
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.path,"utf-8");
            const dataParse = JSON.parse(data);

            return dataParse;
        }
        catch(Error){
            console.log(Error.message);
        }

    }

    async deleteById(id) {

    try {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        let productos = JSON.parse(contenido);
        let arraySinProd = productos.filter(prod => prod.id !== id);
    
        await fs.promises.writeFile(this.path, JSON.stringify(arraySinProd));
        
        return (200);

        } catch (error) {
        console.log(error.message());
        }
    
    }

    //no es la mejor solucion pero es la que logre hacer funcionar
    //escribe en el archivo directamente los corchetes vacios
    async deleteAll() {
        try {
            let limpiar = JSON.parse(JSON.stringify([]));
            await fs.promises.writeFile(this.path, JSON.stringify(limpiar));
            
        }
        catch(error){
            console.log(error.message);
        }
    }
    
    async putById(id) {
        let respuesta={error: 'producto no encontrado'};
        try {
            flag=false
            //leo el archivo y despues lo guardo en una constante
            const dataParse = await this.getAll();

             //recorro el json buscando el id
            for (let i=0; i < dataParse.length; i++) {
                //si lo encuento lo actualizo y lo devuelvo actualizado
                if(parseInt(req.params.id)==dataParse[i].id){
                    req.body.id=parseInt(req.params.id);
                    dataParse[i]=req.body;
                    flag=true;

                    //guardo el archivo actualizado
                    fs.writeFile(baseProductos, JSON.stringify(dataParse), (error) => {
                        if (error)
                        console.log(error);
                        else { 
                            respuesta=dataParse[i];
                        }
                    });
                }
            } 

        }
        catch(Error){
            res.send(Error.message);
        }
        return respuesta;
    }
    
}
