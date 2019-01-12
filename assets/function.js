
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
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";


$("#submit").on("click", function(){
  event.preventDefault();
  trainName = $("#trainName").val();
  destination = $("#destination").val();
  firstTrain = moment($("#first-train").val(), "HHmm")
  frequency = $("#frequency").val();

  firstTrain = firstTrain.format("HH:mm")

  //10am train 1, and they come every 10 minutes
  // you get there at 10:12                                          

  // moment.HTML5_FMT.TIME

  newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(firstTrain)
  )
    $("#train-table").append(newRow)

})
//use for relative time
//moment().endOf('day').fromNow();          // in 3 hours
