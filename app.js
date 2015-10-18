
var emplSalArray = [];
var totSal = 0;
//when the document is ready, do this...
$(document).ready(function() {
	console.log("Working on document load");
//look at my input when submit button is clicked
	$("#getFormInput").submit(function(event) {
		event.preventDefault();

		var employees = {};

		console.log($("#getFormInput").serializeArray());
		$.each($("#getFormInput").serializeArray(), function(i, field) {
			employees[field.name] = field.value;
		});

		$("#getFormInput").find("input[type=text]").val("");
		
		emplSalArray.push(employees);
		
		appendDom(employees);
	});

});
//set up divs and write to the DOM so user can see what is input
function appendDom(worker) {
	console.log(worker);
	$("#container").append("<div class='workerDiv'></div>");
	var $el = $("#container").children().last();

//writing to the DOM with each input 
	$el.append("<p>Name: " + worker.emplName + "</p>");
	$el.append("<p>Employee #: " + worker.emplIDNum + "</p>");
	$el.append("<p>Job Title: " + worker.emplJob + "</p>");
	$el.append("<p>Annual Salary: $" + thousandSep(worker.emplYrSalary) + "</p>");
	$el.append("<button class='deleteDiv'>Delete This Record</button><hr>");

//calculating monthly salary total from all records
	totSal += (parseInt(worker.emplYrSalary)/12);

	//console.log(totSal.toFixed(2));

//make a new div for the monthly salary total, so that it is not 
//removed when I click the Delete Record button
	$("#container").append("<div id='displayTotal'></div>");
	var $el_total = $("#container").children().last();
	$el_total.append("<p id='showMonthly'>The total monthly salary from all entered employees is: $<span>" + thousandSep(totSal.toFixed(2)) + "</span></p><hr>");
	

//this will happen on click of the Delete Record button
//does not recalculate, only removes
	$('.deleteDiv').on('click', function() {
		var delThisSalary = worker.emplYrSalary;
		totSal -= parseInt(delThisSalary/12);
		console.log(totSal.toFixed(2));
	    $(this).parent().remove();
//***Attempts to get the PRO level to work, but not successful***
	    //$el_total.text("The new total monthly salary from all entered and deleted employees is: $" + thousandSep(totSal.toFixed(2)));
	
		//$("#displayTotal").data("keyword",totSal);
		// $("#displayTotal").text($el_total.data("keyword"));
		//$el_total.data("keyword");  
		//("The new total monthly salary from all entered and deleted employees is: $").data("keyword");
	});

}

//function changes long number to have thousands (,) format
function thousandSep(val) {
    return String(val).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("");
}




















