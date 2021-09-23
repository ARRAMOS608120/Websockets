 
 class Contenedor {

   
    constructor (){
        const  list= []
        this.listaProductos = list
    }

    save (producto){
         try{
                if(this.listaProductos.length == 0){
                     producto.id = 1
                     this.listaProductos.push(producto)
                }else{ producto.id = this.listaProductos[this.listaProductos.length-1].id+1
                       this.listaProductos.push(producto)
                }

                return producto.id
        }catch (error){
            throw new Error (`Error al guardar producto: ${error}`)
            } 
    }

    getByID (identificador){
        try{ 
            const indice = this.listaProductos.findIndex(producto=> producto.id ==identificador)
            if (indice != -1){
            return this.listaProductos[indice]
        }else{return {error: "producto no encontrado"}}
        }catch (error){
        throw new Error ({error: "producto no encontrado"})
    }
    }
    
  getAll(){
        try{
            return this.listaProductos
    } catch (error){
        throw new Error (`Error al mostar lista completa: ${error}`)
    }
    }

  deleteById (identificador){
            try{
                const indice = this.listaProductos.findIndex(producto=> producto.id ==identificador)
                this.listaProductos.splice(indice,1)
            }catch (error){
                throw new Error (`Error al borrar producto ${error}`)
        }
    
    }

    deleteAll(){
            try{
                listaProductos.splice(0,listaProductos.length)
            }catch (error){
                throw new Error (`Error al borrar lista: ${error}`)
        }  
    }
}

module.exports = Contenedor