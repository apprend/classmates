// Make sure the page is fully loaded before trying to change it
$(document).ready(function(){

  // Lots of details about where to find student data
  /* get your key at https://secure.meetup.com/meetup_api/key/ */
  var getStudents = {
    url: "https://api.meetup.com/2/rsvps",
    data: {
      "key": /* meetup api key */,
      "event_id": "219990929",
      "order": "name"
    },
    crossDomain: true,
    dataType: 'jsonp',
    type: "GET",
    success: listStudents,
    error: function(data) {
       // code with error returned
       alert("Sorry, something is broken.");
       // console.log("error", data);
    }
  } // getStudents

  // Do something when we click the button:
  $("#getStudents").click(function(){
      // remove everything that's already in the student list
      $("#studentList").empty()

      // Fetch the student data, using our getStudents object for config
      $.ajax(getStudents);
  });

  function listStudents(data){

      for (var i = 0; i < data.results.length; i++){
        // data.results[i] is confusing. Let's make it more descriptive:
        var student = data.results[i];
        if(student.response == "yes"){
          // Render the names on page
          $("#studentList").append( student.member.name + "<br/>" );
        }
      }

  } // listStudents()


}); // $(document).ready()
