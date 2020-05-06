

//getting new activities and saving to db
$("#form-submit").on("click", function() {
  event.preventDefault();
  var activity = $("#form-activity");
  var calories = $("#form-calories");
  console.log(activity.val() + " " + calories.val());

console.log("submitting form");
  $.post(
    "add",
    {
      activity: activity.val(),
      calories: calories.val(),
    },
    function(data) {
      console.log(data);
    }
  );
  calories.val("");
  activity.val("");
  fetchAll();
});

//fetch all activities and display
function fetchAll() {

  $.get("activities", function(result) {

    var parent = $("#activity-list");
    parent.empty();

    var date="";
    parentDiv = $("<div></div>");
    var totalCal = 0;
      for (var i = 0; i < result.length; i++) {
        console.log(result[i].timestamp);

        if(result[i].timestamp!=date){
          totalCal = 0;
          date=result[i].timestamp;
          console.log("in the if");
           parentDiv = $("<div></div>").attr(
            "class",
            "list-item rounded shadow-sm"
          );
          var line0 = $("<div></div>")
          .attr("class", "each-date")
          .text("Date: "+result[i].timestamp);
          var total=$("<span></span>")
          .attr("class", "each-total "+date)

          parentDiv.append(line0, total, $("<br/><br/>"));
        }

       
        totalCal += parseInt(result[i].calories);
        $("."+date).text("Total Calories: "+totalCal);

        var row = $("<div></div>")
        .attr("class", "row each-row")

        var line1 = $("<div></div>")
          .attr("class", "activity-name col")
          .text(result[i].name);
        var line2 = $("<div></div>")
          .attr("class", "cal-count col")
          .text(result[i].calories + " cal");
          var line3 = $("<div></div>")
          .attr("class", "time col")
          .text(result[i].time);
        
        row.append(line1, line2, line3);
        parentDiv.append(row);
        parent.prepend(parentDiv);
      }
 
    var percent = (totalCal * 100) / 1000;
    var percent = percent + "%";
    $("#progress-value")
      .css("width", percent)
      .text(percent);


  });
}
fetchAll();
