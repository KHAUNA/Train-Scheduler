
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqUz2GARk6jZnWHjoD83gwC_vx3-Q0V_o",
    authDomain: "train-scheduler-e8f10.firebaseapp.com",
    databaseURL: "https://train-scheduler-e8f10.firebaseio.com",
    projectId: "train-scheduler-e8f10",
    storageBucket: "train-scheduler-e8f10.appspot.com",
    messagingSenderId: "287644560486"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//submit button on click
$("#submit").on("click", function(){
  event.preventDefault();
//capture entered values and store into variables
  var trainName = $("#trainName").val();
  var destination = $("#destination").val();
  var firstTrain = moment($("#first-train").val(), "HHmm")
  var frequency = $("#frequency").val();
  var currTime = moment().format("HH:mm");
//math to determine when next train is

   firstTrain = firstTrain.format("HH:mm")
//subtract 1 year to ensure first train time comes before the current time
//math to find the remaining time to next train from current time
//for math to work, current time must be after first train time
  var firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years")
  var diffTime = moment().diff(moment(firstTrainConv), "minutes");
  var timeRemaining = (frequency - (diffTime % frequency))
//store variables in object
  var addedTrain = {
    train: trainName,
    trainTo: destination,
    trainFrom: firstTrain,
    freq: frequency
  };
//push to firebase database
  database.ref().push(addedTrain);
//clear out input fields
  $("#trainName").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

})
//when a child is added to firebase, run following code
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

//capture stored values and set to variables
      var trainName = childSnapshot.val().train;
      var destination = childSnapshot.val().trainTo;
      var firstTrain = childSnapshot.val().trainFrom;
      var frequency = childSnapshot.val().freq;
      var currTime = moment().format("HH:mm");
//same math as above to calculate remaining time for next train
      var firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years")
      var diffTime = moment().diff(moment(firstTrainConv), "minutes");
      var timeRemaining = (frequency - (diffTime % frequency))
//put the stored database elements into the html display
      newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstTrain),
        $("<td>").text(timeRemaining)
      );
        $("#train-table").append(newRow);

    });
