var dvrHrInput;
var dvrMinInput;
var actHrInput;
var actMinInput;

var prevDayInput;
var sameDayInput;
var nextDayInput;

var hrOffset
var minOffset;
var result;
var aheadOrBehind;
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function determineResult(hrOffset, minOffset, aheadOrBehind){
	//minOffset 0, 1, greater than 1
  //hrOffset 0, 1, greater than 1

	if (hrOffset == 1){
    if (minOffset == 1){
    	result = "DVR is approximately one (1) hour and one (1) minute " + aheadOrBehind + " actual time";
    }else if (minOffset > 1){
    	result = "DVR is approximately one (1) hour and " + minOffset + " minutes " + aheadOrBehind + " actual time";
    }else{//minOffset = 0 and hrOffset = 1
    	result = "DVR is approximately one (1) hour " + aheadOrBehind + " actual time";
    }
    
  }else if (hrOffset > 1){
  	if (minOffset == 1){
    	result = "DVR is approximately " + hrOffset + " hours and one (1) minute " + aheadOrBehind + " actual time";
    }else if (minOffset > 1){
    	result = "DVR is approximately " + hrOffset + " hours and " + minOffset + " minutes " + aheadOrBehind + " actual time";
    }else{//minOffset = 0 
    	result = "DVR is approximately " + hrOffset + " hours " + aheadOrBehind + " actual time";
    }
  
  }else{//hrOffset = 0
  	if (minOffset == 1){
    	result = "DVR is approximately one (1) minute " + aheadOrBehind + " actual time";
    }else if (minOffset > 1){
    	result = "DVR is approximately " + minOffset + " minutes " + aheadOrBehind + " actual time";
    }else{//minOffset = 0 ie both hr and min are 0
    	result = "DVR is in-sync within one (1) minute of actual time";
    };
  }; 
  
  return result;
};



function calculateOffset(){
	if (prevDayInput){
  	actHrInput = parseInt(actHrInput) + 24;
    console.log("actHrInput: " + actHrInput);
  }else if (nextDayInput){
    dvrHrInput = parseInt(dvrHrInput) + 24;
  };
  
  
	if (dvrHrInput > actHrInput){
  	console.log("Dvr hrs are greater");
    hrOffset = dvrHrInput - actHrInput;
    aheadOrBehind = "ahead of";
    
    if (hrOffset == 1){
    	if (dvrMinInput > actMinInput){
      	minOffset = dvrMinInput - actMinInput;
      }else if (dvrMinInput < actMinInput){
      	hrOffset = 0;
      	minOffset = (60 - actMinInput) + parseInt(dvrMinInput);
      }else{
      	console.log("minutes are the same");
        minOffset = 0;
      }
    }else{//hrOffset is greater than 1 hour
    	console.log("dvr hrs are greater than one hour");
    	if (dvrMinInput > actMinInput){
      	console.log("DVR minutes are greater than act");
        minOffset = dvrMinInput - actMinInput;
      }else if (dvrMinInput < actMinInput){
      	console.log("DVR minutes are less than actual");
        hrOffset = hrOffset - 1;
        minOffset = (60 - actMinInput) + parseInt(dvrMinInput);
      }else{
      	console.log("dvr minutes are the same");
        minOffset = 0;
      };
    }
    
  }else if (dvrHrInput < actHrInput){//xxxxxxxxxxxxxxxxxxxxxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcx
  	console.log("Act hrs are greater");
    aheadOrBehind = "behind";
    hrOffset = actHrInput - dvrHrInput;
    
    if (hrOffset == 1){
    	if (dvrMinInput > actMinInput){
      	hrOffset = 0;
      	minOffset = (60 - dvrMinInput) + parseInt(actMinInput);
      }else if (dvrMinInput < actMinInput){
      	minOffset = actMinInput - dvrMinInput;
      }else{
      	console.log("minutes are the same");
        minOffset = 0;
      };
    
    }else{//hrOffset greater than 1 hour
    	if (dvrMinInput > actMinInput){
      	hrOffset = hrOffset - 1;
      	minOffset = (60 - dvrMinInput) + parseInt(actMinInput);
      }else if (dvrMinInput < actMinInput){
      	minOffset = actMinInput - dvrMinInput;
      }else{
      	console.log("minutes are the same");
        minOffset = 0;
      };
    };
    
  }else{//hours are equal
  	console.log("Hrs are equal");
    if (dvrMinInput > actMinInput){
    	console.log("dvr min is greater");
      aheadOrBehind = "ahead of";
      minOffset = dvrMinInput - actMinInput;
      
    }else if (dvrMinInput < actMinInput){
    	console.log("Act min is greater");
      aheadOrBehind = "behind";
      minOffset = actMinInput - dvrMinInput;
      
    }else{
    	console.log("Times are equal!");
      minOffset = 0;
      aheadOrBehind = "";
    };
  };
  
  return determineResult(hrOffset, minOffset, aheadOrBehind);
};


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function determineDay(){
	if (prevDayInput == true){
  	console.log("prevday: " + prevDayInput);
    //return calculateOffset(prevDay);
    return calculateOffset();
  }else if (nextDayInput == true){
  	console.log("nextday:" + nextDayInput);
    //return calculateOffset(nextDay);
    return calculateOffset();
  }else{
  	console.log("sameDay: " + sameDayInput);
    return calculateOffset();
  };
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$(document).ready(function(){
    $('body').bind('touchstart', function() {});
	
  //click eventsfor radio buttons
  $("#prev-day-input").click(function(){
  	$(this).prop("checked", true);
    $("#same-day-input").prop("checked", false);
    $("#next-day-input").prop("checked", false);
  });
  $("#same-day-input").click(function(){
  	$(this).prop("checked", true);
    $("#prev-day-input").prop("checked", false);
    $("#next-day-input").prop("checked", false);
  });
  $("#next-day-input").click(function(){
  	$(this).prop("checked", true);
    $("#prev-day-input").prop("checked", false);
    $("#same-day-input").prop("checked", false);
  });
  
    $("#calculate-button").hover(
  	function() {
    	$(this).css({"background-color": "#ffbb33", "color": "white"});
  		}, function() {
    	$(this).css({"background-color": "white", "color": "#ffbb33"});
  		}
	);	
	
    $("#calculate-button").click(function(){
        dvrHrInput = $("#dvr-hr-input").val();
    dvrMinInput = $("#dvr-min-input").val();
    actHrInput = $("#act-hr-input").val();
    actMinInput = $("#act-min-input").val();
    
    prevDayInput = $("#prev-day-input").prop("checked") ;
    sameDayInput = $("#same-day-input").prop("checked") ;
    nextDayInput = $("#next-day-input").prop("checked") ;
		
    console.log("Inputs are:");
    console.log("DVr input hr: " + dvrHrInput);
		console.log("DVR input min: " + dvrMinInput);
    console.log("act input hr: " + actHrInput);
    console.log("act input min: " + actMinInput);

		console.log("prev: " + prevDayInput)
		console.log("same: " + sameDayInput);
    console.log("next: "+ nextDayInput);
    
    if (dvrHrInput !== "" && dvrMinInput !== "" && actHrInput !== "" && actMinInput !== ""){
    	$("#result-container").empty();
    	$("#result-container").append(determineDay());
    }else{
    	console.log("Input values!");
      $("#result-container").empty();
    	$("#result-container").append("Please enter a valid input in 24-hour format");
    }
  });
});

