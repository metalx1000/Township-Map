var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('html_code.js');
s.onload = function() {
      this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

$(document).ready(function(){
  console.log("Script Running");
 
  street_num = $("#Incident_StreetNumber").val();
  pre = $("#Incident_StreetPrefix").val();
  street = $("#Incident_StreetName").val();
  type = $("#Incident_StreetType").val();
  suffix = $("#Incident_StreetSuffix").val();
  zip = $("#fiZip").val();

  address = street_num + " " + pre + " " + street + " " + type + " " + suffix + " " + zip;
  $( "input[name='UpdateZip']" ).click(function(){
    var url = "https://maps.google.com/maps/api/geocode/json?address=" + address +"&sensor=false";
    $.getJSON(url)
    .done(function(data){
      var address = data.results[0].formatted_address;
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      console.log( address + ": " + lat + "," + lng);
      check_trs(lat,lng);
    });
  });
});

function check_trs(lat,lng){
  console.log("checking trs...");
  var trs_url = "https://raw.githubusercontent.com/metalx1000/Township-Map/master/trs.json";
  //var trs_url = "https://maps.google.com/maps/api/geocode/json?address=686%20101st%20ave%20n%2034109&sensor=false";
  $.getJSON(trs_url, function(data){
    console.log(data);
    for(var i = 0;i<data.length;i++){
      console.log(data[i].trs);
    }
  });
}
