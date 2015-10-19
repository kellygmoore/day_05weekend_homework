
var emplSalArray = [];
var totSal = 0;
var totSalDelete = 0;
//when the document is ready, do this...
$(document).ready(function() {
	console.log("Working on document load");
//make a new div for the monthly salary total
	$("#container").append("<div id='displayTotal'></div>");
	$("#displayTotal").append("<p id='showMonthly'>The total monthly salary from all entered employees is: $<span></span></p><hr>"); 
//look at my input when submit button is clicked
	$("#getFormInput").submit(function(event) {
		event.preventDefault();
		var employees = {};
		//console.log($("#getFormInput").serializeArray());
//on each submit click, add each employee to this array
		$.each($("#getFormInput").serializeArray(), function(i, field) {
			employees[field.name] = field.value;
		});

		$("#getFormInput").find("input[type=text]").val("");
		
		emplSalArray.push(employees);
//call the function to append to the DOM with input values
		appendDom(employees);
	});

});
//set up divs and write to the DOM so user can see what is input
function appendDom(worker) {
	console.log(worker);
	//for (var i=0; i<emplSalArray.length; i++){
		console.log(emplSalArray.length);
		$("#container").append("<div class='workerDiv'></div>");
		var $el = $("#container").children().last();

//writing to the DOM with each input 
		$el.append("<p>Name: " + worker.emplName + "</p>");
		$el.append("<p>Employee #: " + worker.emplIDNum + "</p>");
		$el.append("<p>Job Title: " + worker.emplJob + "</p>");
		$el.append("<p>Annual Salary: $" + thousandSep(worker.emplYrSalary) + "</p>");
	
		$el.append("<button class='deleteDiv" + i + "'>Delete This Record</button><hr>");
		//console.log()
//calculate monthly salary total from all records
		totSal += (parseInt(worker.emplYrSalary)/12);
	
	//console.log(worker.emplYrSalary/12);
		$(".workerDiv").data("insert", {addTotal: thousandSep(totSal.toFixed(2))});
		//, subtractTotal: (worker.emplYrSalary/12)});
		$("span").text($(".workerDiv").data("insert").addTotal);


//this will happen on click of the Delete Record button
		$('.workerDiv').on('click','.deleteDiv + i', function() {
			console.log(totSal);
			totSal -= (parseInt(worker.emplYrSalary)/12);
			//console.log(totSal);

		    $(".workerDiv").data("insert", {subtractTotal: thousandSep(totSal.toFixed(2))});
		    $("span").text($(".workerDiv").data("insert").subtractTotal);
		    $(this).parent().remove();

		});
	}
}

//function changes long number to have thousands (,) format
function thousandSep(val) {
    return String(val).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("");
}























