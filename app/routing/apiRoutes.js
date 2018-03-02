var  friendsArray = require("../data/friends");




module.exports = function(app) {
     app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

 app.post("/api/friends", function(req, res) {
      
        var score = req.body;
        var arrayOfScores = convertToArray(score);
        var newFriend = {
            name:score.name,
            photo:score.photo,
            scores:arrayOfScores,
            comparisonScore:0
        }
        // console.log(newFriend);
        var score1 = newFriend.scores;
       
        for (var i=0; i<friendsArray.length;i++){
            //retrieving an array of 
            var score2 = friendsArray[i].scores; 
            //push new aray and array iteration to a function to calculate the absolute difference in score for each question
            var currentScore = absSubtract(score1,score2);
            // console.log(currentScore);

            //this variable adds up all numbers in an array to produce the final number
            var totalDifference = currentScore.reduce((a, b) => a + b, 0);
            // console.log(totalDifference);
          
            friendsArray[i].comparisonScore = totalDifference;
            // console.log(totalDifference);
        }

        //sort the array in ascending order 
        friendsArray.sort(function(a, b) {
            return a.comparisonScore - b.comparisonScore;
        });

        resetComparisonScore();
              

        function resetComparisonScore(){
            for (var j=0; j<friendsArray.length;j++){
            friendsArray[j].comparisonScore = 0;
            }
        }
          
     
        function absSubtract(arr1, arr2) {
            return arr2.map(function (el, i) {
              return Math.abs(el - arr1[i]);
            });
        }

        function convertToArray(data){
            var arr =[];
            var scoreArray = [];
            for( var i in data ) {
                arr.push(data[i]);
            };
            for (var j = 2; j<arr.length; j ++){
                scoreArray.push(parseInt(arr[j]));
            };
            return scoreArray;
        }
       
        res.send([friendsArray[0].name,friendsArray[0].photo]);
        friendsArray.push(newFriend);
        console.log(friendsArray);
              
    });
};

