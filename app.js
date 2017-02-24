// EXECUTE FUNCTIONS

api.searchAllProducts().then(function(value){
    // console.log(value);
    updateTable('prodAll',value);
});
addEvents();


/*
* @desc Update the table with the given products
* @param integer id
* @param array products
*
 */
function updateTable(id, products){
    let table = document.getElementById(id);
    let tableBody = table.getElementsByTagName('tbody')[0];
        tableBody.innerHTML ='';
        for(let i=0; i<products.length; i++){
            let product = '<tr>';
                product += '<td>'+products[i].id+'</td>';
                product += '<td>'+products[i].type+'</td>';
                product += '<td>'+products[i].price+'</td>';
                product += '<td><button onclick="processSearchById('+products[i].id+')">Examine</button></td>';
                product += '</tr>'
            tableBody.innerHTML += product;
        }
    toggleLoader(false);
}

function updateExaminedProduct(product){
    let productInfo = document.getElementById('prodInfo');
    let productOutput;
    if(product !== null){
        productOutput = '<li>Product ID: '+ product.id+'</li>';
        productOutput += '<li>Price: '+ product.price+'</li>';
        productOutput += '<li>Type: '+ product.type+'</li>';
    } else {
        productOutput = '<h4>Please select a product to view!</h4>'
    }
    productInfo.innerHTML = productOutput;

}



function processSearchById(searchID){
    if(searchID.toString().length > 0){
        toggleLoader(true);
        api.searchProductById(searchID).then(function(val){
            return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
        }).then(function(val){
            let similarArray = getIntersection(val[0],val[1],val[2].id);
            updateExaminedProduct(val[2]);
            updateTable('prodSimilar',similarArray);
        }).catch(function(val){
            alert(val);
            toggleLoader(false);
        });
    } else {
        alert('Please enter an ID');
    }
}


function processSearchByType(searchType){
    if(searchType.length > 0){
        toggleLoader(true);
        api.searchProductsByType(searchType).then(function(val){
            updateTable('prodSimilar',val);
            updateExaminedProduct(null)
        }).catch(function(val){
            alert(val);
            toggleLoader(false);
        });
    } else {
        alert('Please enter a TYPE');
    }
}

function processSearchByPrice(searchPrice){

    if(searchPrice.length > 0){
        toggleLoader(true);
        api.searchProductsByPrice(searchPrice, 50).then(function(val){
            updateTable('prodSimilar',val);
            updateExaminedProduct(null)
        }).catch(function(val){
            alert(val);
            toggleLoader(false);
        });
    } else {
        alert('Please enter a PRICE');
    }
}




function getIntersection(arrA,arrB,searchedId){
    let samePrice = arrA;
    let sameType = arrB;
    let similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);
        });
    });

    return similarArray;

}

function toggleLoader(toggle){
    // console.log(toggle)
    var loader = document.getElementById("loadingOver");
    if(toggle ==true){
      loader.classList.add('active');
    } else {
        loader.classList.remove('active');
    }
}

function addEvents(){
    document.getElementById("submitById").addEventListener('click', function(){
        processSearchById(document.getElementById("searchById").value);
    })

    document.getElementById("submitByType").addEventListener('click', function(){
        processSearchByType(document.getElementById("searchByType").value);
    })

    document.getElementById("submitByPrice").addEventListener('click', function(){
        processSearchByPrice(document.getElementById("searchByPrice").value);
    })
}



