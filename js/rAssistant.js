function GetValueFromXMLDoc(xmlDOC, FieldName) {
    x = xmlDOC.documentElement.childNodes;
    var res = "NotFound";
    for (i = 0; i < x.length; i++) {
        if (x[i].nodeType == 1) {//Process only element nodes (type 1)
            if (x[i].nodeName == FieldName) {
                res = x[i].childNodes[0].nodeValue;
            }
        }
    }
    return res;
}



function GetXML_fromWS(url, vInput) {
    // GetXML result from WebService Object
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=TETT");
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
    var res;
    res = GetValueFromXMLDoc(xmlDoc, "UserName");

    document.getElementById("myDiv").innerHTML = GetValueFromXMLDoc(xmlDoc, "Password");
    //res = xmlhttp.responseText;
    return res;
}

function GetSingleValueFromWS(url, vInput) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(vInput);
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
    var res = xmlDoc.documentElement.childNodes[0].nodeValue;	
    return res;
}


function exitFromApp()
             {
                navigator.app.exitApp();
             }