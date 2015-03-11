// Make sure the page is fully loaded before trying to change it
$(document).ready(function(){

  // Lots of details about where to find student data
  /* get your key at https://secure.meetup.com/meetup_api/key/ */

  var getStudents = {
    url: "https://api.meetup.com/2/rsvps",
    data: {
      "key": /* meetup api key */,
      "event_id": "218674788",
      "order": "name"
    },
    crossDomain: true,
    dataType: 'jsonp',
    type: "GET",
    success: listStudents,
    error: function(data) {
       // code with error returned
       console.log("Error!", data)
       $("#studentList").append( data.toString() );
    }
  } // getStudents

  // Listen for the button click:
  $("#getStudents").click(function(){
      // remove everything that's already in the student list
      $("#studentList").empty();

      // Fetch the student data, using our getStudents object for config
      $.ajax(getStudents);
  });



  function listStudents(data){
    // Make sure we have data.results
    if(typeof(data.results) != "undefined"){

        for (var i = 0; i < data.results.length; i++){
          // data.results[i] is confusing. Let's make it more descriptive:
          var student = data.results[i];
          if(student.response == "yes"){
            // Render the names on page
            $("#studentList").append( student.member.name + "<br/>" );
          }
        }

    } else {
      // on data.results, probably bad API key
      $("#studentList").append( data.problem + ". " + data.details );
    }
  } // listStudents()

}); // $(document).ready()
