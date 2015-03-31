var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('html_code.js');
s.onload = function() {
      this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

$(document).ready(function(){
  console.log("Script Running");

  var trs;
  $.get( "https://raw.githubusercontent.com/metalx1000/Township-Map/master/trs.js", function( data ) {
    console.log(data[0]);
  });

  street_num = $("#Incident_StreetNumber").val();
  pre = $("#Incident_StreetPrefix").val();
  street = $("#Incident_StreetName").val();
  type = $("#Incident_StreetType").val();
  suffix = $("#Incident_StreetSuffix").val();
  zip = $("#fiZip").val();
  $( "input[name='UpdateZip']" ).click(function(){
    alert("TRS Updated!");
  });
});

