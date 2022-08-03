const eventModal = document.getElementById("dialog-message")
const editBox = document.getElementById("edit-box")
const giphyAPI = 'https://api.giphy.com/v1/gifs/search';
const giphyKEY = 'PVW7bT7xE7oiwvc3VLc9oHgGuFdSrfUb';
const giftbitKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=';
const giftbitAPI = 'https://private-anon-b3a6e921d5-giftbit.apiary-proxy.com/papi/v1/brands';
var allGiphs = [];
var allBrands = [];
const eventType = 'rabbit'; //document.getElementById('etype').value;



// Fetch the GIPHY API and retrieve the GIFS
fetch(giphyAPI + '?q=' + eventType + '&limit=10&api_key=' + giphyKEY)
    .then(function(response) {
        if (!response) {
            console.log('error');
        }
        return response.json();
    })
    .then(function(data) {
        allGiphs = data;
        displayGifs();

    })
    .catch((err) => {});

function displayGifs() {
    var tab3 = document.getElementById('tabs-3');

    for (var i = 0; i < allGiphs.data.length; i++) {
        var img = document.createElement('img');
        img.setAttribute('src', allGiphs.data[i].images.downsized.url);
        tab3.appendChild(img);
    }
}

// giftbit api
fetch(giftbitAPI,{
    headers: {
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.MytEdlNFcVp3clFCT2hrZ0Uxb1FNc2pZbWRoRjVKVmYwdlh3L2x6c0hqL1QvYTJpQ1N2cW1kc1JqOEFLWDJTMjJ0cmNzODNaSVVMOGJvcldOWTVNVkJBV1Yvb1B3ck4vZGQyMVNkcE9EN1pSMm8xeFdYbHRwd0ZPaVlsaHB2Smk=.weqw9hjbaEcLpqZlkrVMFngOntTuAIi3d09A/4dybFs=',
    }
})
  .then((response) => response.json())
  .then(function(data) {
    allBrands = data;
    displayBrands();
    console.log(data);
  });

//   display giftbit options under dropdown
function displayBrands() {
    var editBrandDrop = document.getElementById('edit-brand')
    var brandDrop = document.getElementById('brand');

    for (var i = 0; i < allBrands.brands.length; i++) {
        var option = document.createElement('option');
        var editOption = document.createElement('option');
        option.setAttribute('value', allBrands.brands[i].name);
        option.innerHTML = allBrands.brands[i].name;
        editOption.setAttribute('value', allBrands.brands[i].name);
        editOption.innerHTML = allBrands.brands[i].name;
        editBrandDrop.appendChild(option);
        brandDrop.appendChild(editOption);
    }
}

//tabs jQuery function
$(function() {
    $("#tabs").tabs();
});

//accordion jQuery function
$(function() {
    $("#accordion").accordion();
});

//event listener for Add Event - toggles hide for event modal box
$(".add-event").on('click', function() {

    $(function() {
        $("#dialog-message").dialog({
            modal: true,
        })
    })
    $(function() {
        $("#dialog-message").dialog({
            modal: true,
        });
    });
})

//edit button event listener
$(".edit-button").on('click', function() {
    console.log('hello')
    editBox.classList.toggle('hide')
})

$("#etype").on('mouseout', function() {
    const selectedOption = $("#etype option:selected").val()
    let otherOption = document.getElementById("other-option")
    if (selectedOption == 'other') {
    otherOption.classList.remove('hide')
    } else {
        otherOption.classList.add('hide')
    }
})

$("#edit-etype").on('mouseout', function() {
    const selectedOption = $("#edit-etype option:selected").val()
    let otherOption = document.getElementById("edit-other-option")
    if (selectedOption == 'edit-other') {
    otherOption.classList.remove('hide')
    } else {
        otherOption.classList.add('hide')
    }
})

//event listener for Schedule Event button - toggles hide for event modal box
$(".schedule-button").on('click', function() {
    const parentNode = $(this)[0].parentNode
    let event = {
        title: parentNode.children[2].value,
        date: parentNode.children[5].value,
        type: $("#etype :selected").val(),
        other: parentNode.children[9].value,
        name: parentNode.children[12].value,
        email: parentNode.children[15].value,
        brand: $("#brand :selected").val(),
        amount: parentNode.children[20].value,
        message: parentNode.children[22].value
    }
    console.log(event)

   
    $("#dialog-message").dialog( "close" )
  

    eventModal.classList.toggle('hide')
    $("body").css("background-color", "gray");
    $("#confirmation-message").css("visibility", "visible");
    // script for confirmation modal w/ jquery
    $(function() {
        $("#confirmation-message").dialog({
            modal: true,
            width: 650,
            resizable: false,
            buttons: [{
                    text: "Confirm",
                    "class": 'modalButtonClass',
                    // script for congrats modal when confirm is clicked
                    click: function() {
                        $(this).dialog("close");
                        $("#congrats-message").css("visibility", "visible");
                        $(function() {
                            $("#congrats-message").dialog({
                                modal: true,
                                width: 650,
                                resizable: false,
                                buttons: [{
                                        text: "Back to Calendar",
                                        "class": 'modalButtonClass',
                                        click: function() {
                                            $(this).dialog("close");
                                            $("body").css("background-color", "transparent");
                                        }
                                    },
                                    {
                                        text: "Schedule Another Event",
                                        "class": 'modalButtonClass',
                                        click: function() {
                                            $(this).dialog("close");
                                            $("body").css("background-color", "transparent");
                                            $(function() {
                                                $("#dialog-message").dialog({
                                                    modal: true,
                                                })
                                            })
                                            $(function() {
                                                $("#dialog-message").dialog({
                                                    modal: true,
                                                });
                                            });
                                        }
                                    }
                                ]
                            })
                        })
                    }
                },
                {
                    text: "Cancel",
                    "class": 'modalButtonClass',
                    click: function() {
                        $(this).dialog("close");
                        $("body").css("background-color", "transparent");
                    }
                }
            ]
        })
    })
})

// Need to check all future dates against today's current date and display a reminder box if
// event is today's date +14 days or less
dateReminder();

function dateReminder() {
    // get data from local storage and store it in an array
    var today = new Date();
    var todayUnix = Math.floor(Date.parse(today.getFullYear(), today.getMonth(), today.getDate()));
    var fourteenDaysUnix = today.setDate(today.getDate() + 14);
    var fourteenDays = new Date(fourteenDaysUnix);
    console.log(fourteenDays);
    // console.log(todayUnix);
    // console.log(fourteenDaysUnix);
    // console.log(new Date(fourteenDaysUnix));
    // console.log(todayUnix >= fourteenDaysUnix);
    // for (var i = 0; i < allEvents.length; i++){
    //     if (allEvents[i].date <= (todaysDate.getDate + 14)){
    // DISPLAY REMINDER MODAL
    $(function() {
        $("#reminder-modal").dialog({
            modal: true,
            buttons: {
                Ok: function() {
                    $(this).dialog("close");
                }
            }
        });
    });
    //     }
    // }
}