$(document).ready(function() {
    //check if local storage value of "cart retrived " is True
    retrieve_saved_cart()
    var cart = !!localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;
    if (cart !== null)
        document.getElementById('cart-count').innerText = parseFloat(cart.length).toLocaleString('en-US')

    if (window.location.href.indexOf("cart") > -1) {
        //dynamically generate the cart on the page
        load_cart()
    }

    if (window.location.href.indexOf("view-orders") > -1) {
        order_list_functionality()

    }
    $('#order-tbl').find('th, td').addClass('px-2 py-1 align-middle')
    $('#order-tbl').find('th:nth-child(1), td:nth-child(1)').addClass('text-center')
    $('#order-tbl').find('th:nth-last-child(1), td:nth-last-child(1)').addClass('text-right')
});

function order_list_functionality() {
    onRowClick("orders_table", function(row) {
        var id = row.getElementsByTagName("td")[0].innerHTML;
        var csrftoken = getCookie('csrftoken');
        //send get request to see if user has superuser permissions
        var user_is_super = check_user_super();
        if (user_is_super && row.classList.contains("mark-as-complete")) {
            var r = confirm("Would you like to mark order " + id + " as delivered?");
            if (r == true) {
                $.ajax({
                    url: "/mark_order_as_delivered", // the endpoint
                    type: "POST", // http method
                    data: { id: id, csrfmiddlewaretoken: csrftoken }, // data sent with the post request

                    // handle a successful response
                    success: function(json) {
                        //make the row green
                        row.classList.remove("table-danger");
                        row.classList.add("table-success")
                    },

                    // handle a non-successful response
                    error: function(xhr, errmsg, err) {
                        //have this as another toast
                        console.log("the server said no lol")
                    }
                }); //make ajax post request
            }
        }

    });
}

function check_user_super() {
    var return_value;
    $.ajax({
        url: "check_superuser",
        type: 'GET',
        success: function(res) {
            console.log("we got back from the server the value ---> " + res)
            if (res == "True") {
                console.log("assigned true")
                return_value = true;
            } else {
                return_value = false;
            }
        },
        async: false
    });
    return return_value
}

function add_to_cart(info) {
    //info will be the stuff displayed in the reciept
    // item description as well as teh price
    display_notif("add to cart", info);
    var cart_retrieved = !!localStorage.getItem("cart") ? localStorage.getItem("cart") : null
    if (cart_retrieved === null) {
        //make a new cart
        var cart = [info];
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').innerText = ''

    } else {
        var cart = JSON.parse(cart_retrieved);
        cart.push(info)
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').innerText = parseFloat(cart.length).toLocaleString('en-US')
    }


}

function onRowClick(tableId, callback) {
    var table = document.getElementById(tableId),
        rows = table.getElementsByTagName("tr"),
        i;

    for (i = 0; i < rows.length; i++) {
        table.rows[i].onclick = function(row) { return function() { callback(row); }; }(table.rows[i]);
    }
}

function display_notif(type, info = "No info provided") {
    //the different types of toasts are success, warning ... info and error
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "70",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    switch (type) {
        case "add to cart":
            toastr.success(info.item_description + ': DH ' + info.price, 'Added to Cart');
            break;
        case "remove from cart":
            toastr.info("Successfully removed " + info + " from cart");
            break;
        case "new order":
            toastr.success("Order successfully placed");
            break;
    }

}

function load_cart() {
    var table = document.getElementById('cart_body');
    table.innerHTML = ""; //clear the table
    var cart = JSON.parse(localStorage.getItem("cart"));
    var total = 0;
    if (cart !== null && cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {

            var row = table.insertRow(-1);
            var item_number = row.insertCell(0);
            var item_description = row.insertCell(1);
            var item_price = row.insertCell(2);
            item_number.innerHTML = String(i + 1);
            item_description.innerHTML = cart[i].item_description;
            item_price.innerHTML = "DH " + parseFloat(cart[i].price).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 });

            total += cart[i].price
        }
        total = Math.round(total * 100) / 100
        localStorage.setItem('total_price', total);
        document.getElementById('total').innerHTML = "DH " + parseFloat(localStorage.getItem("total_price")).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 })


        onRowClick("cart_body", function(row) {
            var value = row.getElementsByTagName("td")[0].innerHTML;
            var description = row.getElementsByTagName("td")[1].innerHTML;
            var r = confirm("Proceed to delete '" + description + "' from cart?");
            if (r == true) {
                document.getElementById("cart_body").deleteRow(value - 1);
                //edit the cart
                cart.splice(value - 1, 1) //this is how you remove elements from a list in javascript
                localStorage.setItem('cart', JSON.stringify(cart)); //change the elements in the cart in local storage
                display_notif("remove from cart", description)
                load_cart() //refresh the page
            }
        });
    } else {
        display_empty_cart()
    }
    $('#card-tbl').find('th, td').addClass('px-2 py-1 align-middle')
    $('#card-tbl').find('th:nth-child(1), td:nth-child(1)').addClass('text-center')
    $('#card-tbl').find('th:nth-last-child(1), td:nth-last-child(1)').addClass('text-right')

}

function format_toppings(topping_choices) {
    var toppings = ""
    var arrayLength = topping_choices.length;
    for (var i = 0; i < arrayLength; i++) {
        if (i == 0) {
            //first iteration
            toppings += topping_choices[i]
        } else {
            toppings += " + "
            toppings += topping_choices[i]
        }
    }
    return toppings
}

function pizza_toppings(number_of_toppings, type_of_pizza, price) {
    var last_valid_selection = null;

    $('#toppings_label')[0].innerHTML = "Choose " + String(number_of_toppings) + " topping(s) here"
    $('#select_toppings').change(function(event) {
        console.log($(this).val().length)
        console.log(number_of_toppings)
        if ($(this).val().length > number_of_toppings) {

            $(this).val(last_valid_selection);
        } else {
            last_valid_selection = $(this).val();
        }
    }); //this is what restircts the user from choosing more than they are paying fpr

    $('#toppings_modal').modal('show'); //show the modal
    $("#submit_toppings").click(function() {
        var topping_choices = $('#select_toppings').val();
        //console.log("TOPping choices are "+topping_choices[0])

        $('#toppings_modal').modal('toggle'); //hide the modal
        var info = {
            "item_description": type_of_pizza + " pizza with " + format_toppings(topping_choices),
            "price": price
        }
        add_to_cart(info)

    });
};

function close_modal() {
    $('#toppings_modal').modal('hide');
    $('#toppings_modal').modal('dispose');
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
} //this function is to get the CSRF token

function display_empty_cart() {
    var table = document.getElementById('cart_body');
    table.innerHTML = ""; //clear the table
    document.getElementById('total').innerHTML = ""
    document.getElementById('cart_heading').innerHTML = "Cart is empty!"
    document.getElementById("checkout_button").disabled = true;

}

function clear_cart() {
    localStorage.removeItem("cart"); //Clear the cart
    localStorage.removeItem("total_price"); //clear the price
    //remove the elements from the page
    display_empty_cart();
}

function checkout() {
    //this is the function that will be run when the user wants to checkout
    var cart = localStorage.getItem("cart")
    var price_of_cart = localStorage.getItem("total_price")
    var csrftoken = getCookie('csrftoken');

    console.log("Checkout was clicked so we now send it to the server!") // sanity check
    $.ajax({
        url: "/checkout", // the endpoint
        type: "POST", // http method
        data: { cart: cart, price_of_cart: price_of_cart, csrfmiddlewaretoken: csrftoken }, // data sent with the post request

        // handle a successful response
        success: function(json) {
            display_notif("new order")
            clear_cart()
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
            //have this as another toast
            console.log("the server said no lol")

        }
    });

}

function logout() {
    var current_cart = localStorage.getItem("cart")
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/save_cart", // the endpoint
        type: "POST", // http method
        data: { cart: current_cart, csrfmiddlewaretoken: csrftoken }, // data sent with the post request

        // handle a successful response
        success: function(json) {
            //clear the local storage
            localStorage.removeItem("cart"); //Clear the cart
            localStorage.setItem('cart_retrieved', false);
            window.location.href = "/logout";
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
            //have this as another toast
            console.log("the server said no lol")

        }
    });

}

function retrieve_saved_cart() {
    if (localStorage.getItem("cart_retrieved") !== "true") {
        $.ajax({
            url: "retrieve_saved_cart",
            type: 'GET',
            success: function(res) {
                localStorage.setItem('cart_retrieved', true);
                localStorage.setItem("cart", res)
            }
        });
        //
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                document.getElementById('latitude').value = position.coords.latitude;
                document.getElementById('longitude').value = position.coords.longitude;
                document.getElementById('locationStatus').innerHTML = '📍 Location captured!';
            },
            function(error) {
                document.getElementById('locationStatus').innerHTML = '❌ Error getting location: ' + error.message;
            }
        );
    } else {
        document.getElementById('locationStatus').innerHTML = '❌ Geolocation is not supported by this browser.';
    }
}
// Solution de traduction simplifiée
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter le script de Google Translate
    const googleScript = document.createElement('script');
    googleScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(googleScript);
    
    // Ajouter le code d'initialisation
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,ar,de', // Limiter les langues
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };
    
    // S'assurer que le conteneur existe
    const container = document.getElementById('google_translate_element');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'google_translate_element';
        newContainer.style.display = 'inline-block';
        newContainer.style.margin = '10px';
        
        // Ajouter au DOM à un endroit visible
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.appendChild(newContainer);
        } else {
            document.body.insertBefore(newContainer, document.body.firstChild);
        }
    }
});