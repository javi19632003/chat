

class ClasProd {
    constructor(){
        this.contenido   = [];
    }

    save (obj){
        try {
            let idNew = 0;
            this.contenido.forEach(ele => {
                if(ele.id > idNew){
                    idNew = ele.id;
                }
            });
            idNew = idNew + 1;
            obj.id = idNew;
            this.contenido.push(obj);
            let resultado = this.getById(idNew)
            return resultado;
        }
        catch(err){
            return null;
        }
    }   

    getById(id){
        let obj = null;
        try {
            const unProducto = this.contenido.find( ( elemento ) => elemento.id === id)
            if (unProducto){
                obj = unProducto
            }
            return obj;    
        }
        catch(err){
           return null;
        }
    }
    getAll(){
        try {
            return this.contenido;    
        }
        catch(err){
            return null;
        }

    }        
    deleteById(id){

        try {
            const miIndice = this.contenido.findIndex( ( producto ) => producto.id === id ? true : false )
            if (miIndice !== -1){
                this.contenido.splice( miIndice, 1 )      
                return 1;
            }
         
            return -1;
        }
        catch(err){
            return -1;
        }
    } 

    // Borro todo       
    deleteAll(){
        this.contenido = [];
        return null
    }    

    writeAll(contenido){
        try {
            this.contenido = contenido ; 
        }
        catch(err){
            console.log('error en escritura: ', err)
        }

}        
    //modificaciones    
    rewriteById(miProducto){
        try {
            const miIndice = this.contenido.findIndex( ( producto ) => producto.id === miProducto.id ? true : false )
            if (miIndice !== -1){
                this.contenido( miIndice) = miProducto
                return 1      
            }
            return -1;
        }
        catch(err){
            return -1
        }
         
}    

}

module.exports =  ClasProd;