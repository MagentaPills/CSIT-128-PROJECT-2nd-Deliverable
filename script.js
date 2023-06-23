function getServicesAJAX() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {   // value 4 - means the load is complete ##  200 Code informs about successful processing of the request.
                    processResult(xhttp);
                }
            }
            xhttp.open("GET", "SServices.json", true);   // async: true (asynchronous) or false (synchronous)
            xhttp.send();
    }

    // This function process teh content of JSON file.
       function processResult(xhttp) {
               var jsonText = xhttp.responseText;        // Get JSON text.
               serviceObj = JSON.parse(jsonText);   // convert the response text to JSON object.
           displayServicesDropDownMenu();
               // call the display drop list menu service function.
       }
       function displayServicesDropDownMenu() {
                   var i;
                   text = "<select name=\"Service\"  onclick=\"onChangeServices(this.selectedIndex)\" required  >";
                   // text = "Emirate:<select name=\"emirate\"  onchange=\"onChangeEmirates(this.selectedIndex)\"  >";
                   for (i = 0; i < serviceObj.servicesList.length; i++) {

                       text += "<option  onselect=\"onChangeServices()\"  value=\"" + serviceObj.servicesList[i].id + "\">" + serviceObj.servicesList[i].service + "</option>" + "\n";

                   }
                   document.getElementById("demo_services").innerHTML = text + "</select>";
                   console.log(text);


               }
               // ################################################################################################################
        // Write the functionwill populate the area sie of the Emirates in the paragraph has identifier named demo_area_size
        function onChangeServices(serviceIndex) {
            // ######### Complete this function
            text =serviceObj.servicesList[serviceIndex].doctor;



            document.getElementById("demo_doctor_name").innerHTML = text;
            console.log(text);
}
getServicesAJAX();
