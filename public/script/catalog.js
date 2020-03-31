
/*global variables */
/*var items=[
    {
        //first item
        code:'1tvs',
        title:'TV Samsung',
        price:1000,
        description:"This is the long description of the item",
        category:'Electronics',
        image:'img/tv.jpeg'
    },

    {
        //second item
        code:'1ph10',
        title:'Iphone X',
        price:1000,
        description:"This is the long description of the item",
        category:'Mobile Devices',
        image:'img/iphone.jpg'
    },

    {
        //third item
        code:'25fdk',
        title:'Speakers',
        price:100,
        description:"This is the long description of the item",
        category:'Sound',
        image:'img/speaker.jpeg'
    },

    {
        //fourth item
        code:'1cmplp',
        title:'Computer',
        price:500,
        description:"This is the long description of the item",
        category:'Compute',
        image:'img/computer.jpeg'
    }
];*/
var items=[];
var serverURL="http://localhost:8080/api/";

/*functions*/

function fetchCatalog(){
    /*get the items from the server*/
    $.ajax({
        url:serverURL+"items",
        type:"GET",
        success: function(response){
            console.log("Server Responded OK",response);
            for(var j=0;j<response.length;j++){
                //solve display user items

                if(response[j].user=="Alex" && response[j].title!=""){
                    items.push(response[j]);
                }
                
            }
            displayCatalog();
        },
        error:function(errorDetails){
            console.log("Error",errorDetails);
        }
    });
}

function displayCatalog(){
    for(var i=0;i<items.length;i++){
        displayItem(items[i]);
    }
}

function displayItem(product){
    
    /*travel the array */
    /*for(var i=0;i<items.length;i++){*/
    /*get the element from the array*/
        
    /*create the string*/
        var layout=`<div class="item" id="${product.code}">
        <img src="${product.image}">
        <h4>${product.title} </h4>
        <h6 class="item-price"> ${product.price}</h6>
        <p>${product.description}</p>
        <div class="button-div">
            <button class="btn btn-primary mb-2"> Add to Cart </button>
        </div>
        <div class="button-div deleteButton" data-code=${product.code}>
            <button class="btn btn-danger mb-2" data-code=${product.code}> X </button>
        </div>
    </div>`;
    
    /*display the element in the DOM (HTML)*/
        $("#catalog").append(layout);
}
    


function init(){
    console.log('Catalog page');
    fetchCatalog();
    //displayCatalog();
    $("#search-btn").click(Search);
    $("#search-txt").keypress(function(e){
        if(e.keyCode==13){
            Search();
        }
    });
}



//$('#search-btn').on('click',function(){
    function Search(){
    /*body search function*/
        var searchString=$('#search-txt').val();
    /*travel the array*/
        for(var i=0;i<items.length;i++){
            if(items[i].title.toUpperCase().includes(searchString.toUpperCase())|| items[i].code.toUpperCase().includes(searchString.toUpperCase())||items[i].description.toUpperCase().includes(searchString.toUpperCase())){
                /*execute the change*/
                console.log(items[i]);
                $('#' + items[i].code).show();
            }
            else{
                $('#'+items[i].code).hide();
            }

            if(searchString==" "){
                $('#'+items[i].code).show();
            }
        }

    /*conditional*/

    /*execute the change*/
};

$(document).on("click", ".deleteButton", function(event) {
    var productCode = $(event.target).attr("data-code")

    var itemToDelete = -1;

    for (var i=0; i<items.length; i++) {
        if (items[i].code == productCode) {
            console.log(productCode);
            itemToDelete = i
        }
    }

    console.log("Item to delete: " + itemToDelete);

    if (itemToDelete !== -1) {
        items.splice(itemToDelete,1);
    }
    $("#catalog").empty();
    displayCatalog();
})

/*initialization*/
window.onload=init;

//cp report make sure elements all work and maybe even create a delete function(delete from array)