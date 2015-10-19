
var employeeArray = [];
var totalCashMoney=0;
var employeeIndex=0;
//when the document is ready, do this...
$(document).ready(function() {

//make a new div for the monthly salary total
	// $("#container").append("<div id='displayTotal'></div>");
	// $("#displayTotal").append("<p id='showMonthly'>The total monthly salary from all entered employees is: $" + totalCashMoney + "</p><hr>"); 
//look at my input when submit button is clicked
	$("#getFormInput").submit(function(event) {
		event.preventDefault();
		gatherEmployee();
		});

		//this will happen on click of the Delete Record button
		$('#container').on('click', '.deleteDiv', function() {
	
			var $el = $(this).parent();
			var deletedIndex = $el.data("employeeIndex");
			for(var i=0; i<employeeArray.length; i++) {
				if(employeeArray[i].employeeIndex == deletedIndex){
					employeeArray.splice(i, 1);
				}
			}
			$el.remove();
			totalSalaries();
		});
});

function gatherEmployee() {
	employeeIndex++;
	var employees = {};
		//console.log($("#getFormInput").serializeArray());
//on each submit click, add each employee to this array
		$.each($("#getFormInput").serializeArray(), function(i, field) {
			employees[field.name] = field.value;
		})

		$("#getFormInput").find("input[type=text]").val("");
		
		employeeArray.push(employees);
		console.log(employeeArray);
		totalSalaries();
//call the function to append to the DOM with input values
		appendDom(employees);
}

//set up divs and write to the DOM so user can see what is input
function appendDom(worker) {
	//console.log(worker);
		$("#container").append("<div class='workerDiv'></div>");
		var $el = $("#container").children().last();
		$el.data("employeeIndex", employeeIndex);
		worker.employeeIndex = $el.data("employeeIndex");
//writing to the DOM with each input 
		$el.append("<p>Name: " + worker.emplName + "</p>");
		$el.append("<p>Employee #: " + worker.emplIDNum + "</p>");
		$el.append("<p>Job Title: " + worker.emplJob + "</p>");
		$el.append("<p class='wokerSal'>Annual Salary: $" + thousandSep(worker.emplYrSalary) + "</p>");

		$el.append("<button class='deleteDiv'>Delete This Record</button><hr>");
}
		
//calculate monthly salary total from all records
function totalSalaries(){
	totalCashMoney = 0;
	for(var i=0; i < employeeArray.length; i++){
		//console.log(employeeArray[i].emplYrSalary);
		totalCashMoney += parseInt(employeeArray[i].emplYrSalary);
		//console.log(totalCashMoney);
	
	}

	$("#container").append("<div id='displayTotal'></div>");
	$("#displayTotal").empty();
	$("#displayTotal").append("<p id='showMonthly'>The total monthly salary from all entered employees is: $" + (totalCashMoney/12).toFixed(2) + "</p><hr>"); 
	
	//$("#displayTotal").append("<p id='showMonthly'>The total monthly salary from all entered employees is: $" + totalCashMoney + "</p><hr>"); 
	//return totalCashMoney;
}

//function changes long number to have thousands (,) format
function thousandSep(val) {
    return String(val).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("");
}























