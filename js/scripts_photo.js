// Make sure the page is fully loaded before trying to change it

$(document).ready(function(){
  // This is where we'll get the student info from
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
  		}
  	}

  $("#getStudents").click(function(){
      $("#studentList").empty().append("Loading...");
      $.ajax(getStudents);
  });

  function listStudents(data){
    // no students yet!
    var students = [];

    for (var i = 0; i < data.results.length; i++){
      // don't repeat this data.results[i] nonsense if we don't have to
      var student = data.results[i];

      if(student.response == "yes"){
        students.push( extractInfo( student ) );
      }
    }

    // we now have our list of confirmed students
    console.log(students);

    // Make a copy of the template on the page
    var template = $("#template .student").clone();
    $("#studentList").empty();
    // loop over each student
    for(var i=0; i < students.length; i++){
      // merge the template with studet data
      var merged = fillTemplate( template, students[i] );
      // Add that merged template to the page
      $("#studentList").append(merged);

    }

    function extractInfo(student){
      var s = {};
      s.name = student.member.name;
      if(typeof(student.member_photo) != 'undefined') {
        s.photo = student.member_photo.thumb_link;
      }
      return s
    }

    // Template: Clone of a jquery object
    // Data object with .name (a string) and optional .photo (a url)
    function fillTemplate(template, data){
      t = template.clone();
      t.find("h3").html( data.name );
      if(data.photo){
          t.find(".thumb").attr("src", data.photo );
      }
      return t
    }

  }


});
