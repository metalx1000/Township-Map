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

  function check_trs(lat,lng){
    console.log("checking trs...");
    var trs_url = "https://raw.githubusercontent.com/metalx1000/Township-Map/master/trs.json";
    $.getJSON(trs_url, function(data){
      $.each(data, function(key, value){
          var lat1 = value.lat1;
          var lng1 = value.long1;
          var lat2 = value.lat2;
          var lng2 = value.long2;
          var trs = value.trs.split("-");
          var tract = trs[0]+trs[1]+"."+trs[2];

        if(lat < lat1 && lat > lat2 && lng > lng1 && lng < lng2){
            //console.log(lat +":"+ lng+":"+ lat1+":"+ lng1+":"+ lat2+":"+ lng2+":"+ trs);
          $("#CensusTract").val(tract);
          console.log(tract);  
        }
      });

    });
  }

});

