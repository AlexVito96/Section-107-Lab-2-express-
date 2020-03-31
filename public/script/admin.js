var serverURL = "http://localhost:8080/api/";

var items = [];

function init() {
    console.log("Admin Page");
}

window.onload = init;

//object constructor
class Item {
    constructor(code, title, price, description, category, image) {
        this.code = code;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.user = "Alex";
    }
}

function clearForm() {
    $("#code").val("");
    $("#code").focus();
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}

function register() {
    //save from the input in a var
    var code = $("#code").val();
    var title = $("#title").val();
    var price = $("#price").val();
    var description = $("#description").val();
    var category = $("#category").val();
    var image = $("#image").val();

    if (code != "" && title != "" && price != "" && description != "" && category != "" && image != "") {


        //create an object
        var newItem = new Item(code, title, price, description, category, image);

        //assigning the var to the attribute
        items.push(newItem);
        var jsonString = JSON.stringify(newItem);

        console.log(newItem);
        console.log(jsonString);
        console.log("New item:" + items.length);

        alert("You registered a new product");
    }

    // Asyn JS and XML
    // send obj to server (strings, int, boolean)
    $.ajax({
        url: serverURL + "items",
        type: "POST",
        contentType: "application/json",
        data: jsonString,
        success: function (response) {
            console.log("It works", response);
            //show the notification
            $('#alert-box').removeClass("hidden");
            // hide the alert
            setTimeout(function () {
                $('#alert-box').addClass('hidden');
            }, 3000);
            clearForm();
        },
        error: function (errorDetails) {
            console.log("Error, Something went wrong", errorDetails);
        }
    });
}

$("#register-btn").on('click', function () {
    register();
});

// homework

function solveHW() {
    var data = [{
            age: 28,
            name: "Eli",
            color: "Orange"
        },
        {
            age: 35,
            name: "Zach",
            color: "Blue"
        },
        {
            age: 26,
            name: "Larry",
            color: "Blue"
        },
        {
            age: 37,
            name: "Ed",
            color: "Blue"
        },
        {
            age: 30,
            name: "Jeremy",
            color: "Orange"
        },
        {
            age: 28,
            name: "Pavel",
            color: "Purple"
        },
        {
            age: 23,
            name: "Alex",
            color: "green"
        }
    ];

    var oldest = 0;
    var oldPerson = "";
    var youngest = 1000;
    var youngPerson = "";
    var sum = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].age > oldest) {
            oldest = data[i].age;
            oldPerson = data[i].name;
        };

        if (data[i].age < youngest) {
            youngest = data[i].age;
            youngPerson = data[i].name;
        }

        sum = sum + data[i].age
    };

    console.log(oldPerson);
    console.log(youngPerson);
    console.log(sum);
}

solveHW();




// Who (name - age) is the oldest and youngest
// Sum of all the ages
// for loop & conditionals
// if

// read about 
// HTTP methods (GET,POST,PUT,PATCH,DELETE)