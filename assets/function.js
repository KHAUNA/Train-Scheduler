
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
// var trainName = "";
// var destination = "";
// var firstTrain = "";
// var frequency = "";
// var timeRemaining = "";
// var diffTime = "";
// var firstTrainConv = "";



$("#submit").on("click", function(){
  event.preventDefault();
  var trainName = $("#trainName").val();
  var destination = $("#destination").val();
  var firstTrain = moment($("#first-train").val(), "HHmm")
  var frequency = $("#frequency").val();
  var currTime = moment().format("HH:mm");

   firstTrain = firstTrain.format("HH:mm")
  var firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years")
  var diffTime = moment().diff(moment(firstTrainConv), "minutes");
  var timeRemaining = (frequency - (diffTime % frequency))


  //10am train 1, and they come every 10 minutes
  // you get there at 10:12                                          

  // moment.HTML5_FMT.TIME

  // newRow = $("<tr>").append(
  //   $("<td>").text(trainName),
  //   $("<td>").text(destination),
  //   $("<td>").text(frequency),
  //   $("<td>").text(firstTrain),
  //   $("<td>").text(timeRemaining)
  // );
  //   $("#train-table").append(newRow);

  var addedTrain = {
    train: trainName,
    trainTo: destination,
    trainFrom: firstTrain,
    freq: frequency
  };

  database.ref().push(addedTrain);

  $("#trainName").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

})
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());


      var trainName = childSnapshot.val().train;
      var destination = childSnapshot.val().trainTo;
      var firstTrain = childSnapshot.val().trainFrom;
      var frequency = childSnapshot.val().freq;
      var currTime = moment().format("HH:mm");

      var firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years")
      var diffTime = moment().diff(moment(firstTrainConv), "minutes");
      var timeRemaining = (frequency - (diffTime % frequency))

      newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstTrain),
        $("<td>").text(timeRemaining)
      );
        $("#train-table").append(newRow);

    });
