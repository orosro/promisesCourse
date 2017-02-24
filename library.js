// LIBRARY SERVICE FOR CATALOG

(function(window){

    // constructor function
    function myLibrary(){
        //execute code here
        let catalog = createRandomCatalog(200);
        // console.log(catalog)

        // Revealing pattern is used here
        return{
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        // function definitions here
        function searchProductById(id){
            var promise = new Promise(function(resolve,reject){
                let i =0;
                setTimeout(function(){
                    while(i<catalog.length){
                        if(id==catalog[i].id){
                            resolve(catalog[i]);
                        }
                        i++;
                    }
                },1000)
            })
            return promise;
        };

        function searchProductsByType(type){
            let promise = new Promise(function(resolve,reject){
                let i = 0,
                    typeArray=[],
                    possibleTypes = ['Electronics','Books','Clothing','Food','Mobile'];
                    if(!possibleTypes.includes(type)){
                        reject('Invalid type '+ type);
                    } else {
                        setTimeout(function(){
                            while(i<catalog.length){
                                if(catalog[i].type==type){
                                    typeArray.push(catalog[i])
                                }
                                i++;
                            }
                            resolve(typeArray);
                        },1000)
                    }
            })
            return promise;
        }
        function searchProductsByPrice(price, difference){
            let promise = new Promise(function(resolve,reject){
                let i =0,
                    priceArray = [];
                    if(!isFinite(price)){
                        reject('Invalid Price: '+price);
                    } else {
                        setTimeout(function(){
                            while(i<catalog.length){
                                if(Math.abs(catalog[i].price - price) < difference){
                                    priceArray.push(catalog[i]);
                                }
                                i++;
                            }
                            resolve(priceArray);
                        },1000)
                    }

            });
            return promise;
        }


        function searchAllProducts(){
            let promise = new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve(catalog);
                },1000)
            })
            return promise;
        };

        function createRandomObject(){
            let typeArray = ['Electronics','Books','Clothing','Food','Mobile'],
                price = (Math.random()*500).toFixed(2),
                type = typeArray[Math.floor(Math.random()*5)];

            return {price:price, type:type};
        }

        /*
        * @descCreate random catalog
        * @param integer num
        * @return object
         */
        function createRandomCatalog(num){
            let catalog = [];
            for(let i=0;i<num;i++){
                let obj = createRandomObject();
                catalog.push({id:i, type: obj.type, price: obj.price});
            }
            return catalog;
        }



    }

    // Pass constructor to global var 'api'
    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

}(window))


