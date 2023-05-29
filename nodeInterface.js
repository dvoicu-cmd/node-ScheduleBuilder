#!/user/bin/env node
//Import the js libraries from the web
import select from '@inquirer/select';
import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
//Import the custom js libraries made locally
import ArrayList from './AppData/ArrayList.js';
import Stack from './AppData/Stack.js';
import Shift from './AppData/shift.js';
import Student from './AppData/student.js'
import Schedule from './AppData/schedule.js';
import * as main from './AppData/main.js';

//Global Variables
const listStudents = new ArrayList();
const listShifts = new ArrayList();
let mapping;
let errMsg = 650;
let successMsg = 800;
let sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));

/**
 * Main menu function
 */
async function mainMenu(){
	ClearTerminal();
	const answer = await select({
		name: 'main menu',
		message: 'Please Select an option',
		type: 'select',
		choices: [
			{
				name: 'Students',
				value: 0
			},
			{
				name: 'Shifts',
				value: 1
			},
			{
				name: 'Generate Assignments',
				value: 2
			},
			{
				name: 'Exit program',
				value: 3
			}
		],
		pageSize: '4'
	});
	//Now process what the answer was.
	switch(answer) {
		case 0:
			return StudentMenu();
		case 1:
			return ShiftMenu();
		case 2:
			return GenerateScheduleMenu();
		case 3:
			return confirmExit();
	}

}
/**
 * ----- Student Functions -----
 */
async function StudentMenu(){
	ClearTerminal();
	const answer = await select({
		name: 'Student Menu',
		message: 'Student Menu',
		type: 'select',
		choices: [
			{
				name: 'Add Student',
				value: 0,
			},
			{
				name: 'Remove Student',
				value: 1,
			},
			{
				name: 'Edit Student',
				value: 2,
			},
			{
				name: 'Back',
				value: 3,
			}
		],
		pageSize: '4'
	});
	//Process answer
	switch(answer){
		case 0:
			return addStudent();
		case 1:
			return removeStudent();
		case 2:
			return editStudentInital();
		case 3:
			return mainMenu();
	}
}

async function addStudent(){
	ClearTerminal();
	const answer = await input ({message: 'Input Student Name:'});
	if(answer == ''){
		message('Err: no null names', errMsg);
		await sleep();
		return StudentMenu();
	}
	let newStudent = new Student(answer);
	listStudents.add(newStudent);
	message('Added: '+newStudent._name, successMsg);
	await sleep();
	return StudentMenu();
}

async function removeStudent(){
	ClearTerminal();
	//If there are no students return to student menu.
	if(listStudents.length() == 0){
		message('Err: No students to remove', errMsg);
		await sleep();
		return StudentMenu();
	}
	//print all current students
	console.log(listStdContents());
	const answer = await input({message: 'choose what to remove:'});
	let numAnswer = parseInt(answer);
	let std = listStudents.get(numAnswer);
	if(isNaN(numAnswer)){
		message('Err: Invalid input', errMsg);
		await sleep();
		return StudentMenu();
	}
	else{
		listStudents.remove(answer);
		message('Removed ' + std.name, successMsg);
		await sleep();
		return StudentMenu();	
	}
}

//Initial function to edit students. Select a student to edit.
async function editStudentInital(){
	ClearTerminal();
	if(listStudents.length() == 0){
		message('Err: No students to edit', errMsg);
		await sleep();
		return StudentMenu();
	}
	console.log(listStdContents());
	const answer = await input({message: 'choose what to edit:'});
	let numAnswer = parseInt(answer);
	let std = listStudents.get(numAnswer);
	if(isNaN(numAnswer)){
		message('Err: Invalid input', errMsg);
		await sleep();
		return StudentMenu();
	}
	else{
		return editStudent(std);
	}
}

async function editStudent(std){
	ClearTerminal();

	//FIRST, selected the date

	console.log("Currently Editing " + std.name + "'s unavailability.");	
	const answer1 = await select ({
		name: 'dateSelect',
		message: 'Select date to edit for ' + std.name,
		type: 'select',
		choices: [
			{
				name: 'Monday',
				value: 0
			},
			{
				name: 'Tuesday',
				value: 1
			},
			{
				name: 'Wednesday',
				value: 2
			},
			{
				name: 'Thursday',
				value: 3
			},
			{
				name: 'Friday',
				value: 4
			},
			{
				name: 'Back',
				value: 5
			}
		]
	})	
	//Determine what that selected date is.
	let selectedDate;
	switch(answer1){
		case 0:
			selectedDate = "Mon";
			break;
		case 1:
			selectedDate = "Tue";
			break;
		case 2:
			selectedDate = "Wed";
			break;
		case 3:
			selectedDate = "Thr";
			break;
		case 4:
			selectedDate = "Fri";
			break;
		case 5:
			return StudentMenu();
	}
	
	//THEN Determine the unavailability of
	ClearTerminal();

	let numChunksInit = std.avalabilityAt(selectedDate).num30MinChunks();
	if(numChunksInit <= 0){
		message("Err: No avalability left", errMsg);
		await sleep();
		return editStudent(std);
	}


	console.log(std.name + "'s current availability on " + selectedDate + " in 24 hour time.");
	console.log("Any reductions made can't be reverted. Two chunks must be removed at the same time.");
	console.log(std.avalabilityAt(selectedDate).selectedTime);
	console.log("Input a start and end time of reduced avalability.");
	const answer2 = await input ({message: 'Enter starting time:'});
	const answer3 = await input ({message: 'Enter end time:'});

	let timeFrom = parseFloat(answer2);
	let timeTo = parseFloat(answer3);

	if(isNaN(timeFrom) || isNaN(timeTo) || timeFrom <= 0 || timeTo <= 0){
		message("Err: Invalid input", errMsg);
		await sleep();
		return editStudent(std);
	}

	std.reduceAvailability(selectedDate, timeFrom, timeTo);
	
	let numChunksAfter = std.avalabilityAt(selectedDate).num30MinChunks();

	if(numChunksInit == numChunksAfter){
		message("Err: Invalid input", errMsg);
		await sleep();
		return editStudent(std);
	}

	if(numChunksInit > numChunksAfter){
		message("Availability reduced.", successMsg);
		await sleep();
		return editStudent(std);
	}


}


/**
 * ----- Shift Functions -----
 */
async function ShiftMenu(){
	ClearTerminal();
	const answer = await select({
		name: 'Shift Menu',
		message: 'Shift Menu',
		type: 'select',
		choices: [
			{
				name: 'Add Shift',
				value: 0,
			},
			{
				name: 'Remove Shift',
				value: 1,
			},
			{
				name: 'Back',
				value: 2,
			}
		],
		pageSize: '4'
	});
	//Process answer
	switch(answer){
		case 0:
			addShift();
			break;
		case 1:
			removeShift();
			break;
		case 2:
			mainMenu();
			break;
	}
}

async function addShift(){
	//First prompt for the name / type of shift.
	ClearTerminal();
	const answer1 = await input({message: 'Input shift type/name:'});
	if(answer1 == ''){
		message('Err: no null names', errMsg);
		await sleep();
		return ShiftMenu();
	}
	let type = answer1;

	//Second prompt for the day of the week for the shift.
	ClearTerminal();
	const answer2 = await select ({
		name: 'dateSelect',
		message: 'Select the day of the week the shift occurs',
		type: 'select',
		choices: [
			{
				name: 'Monday',
				value: 0
			},
			{
				name: 'Tuesday',
				value: 1
			},
			{
				name: 'Wednesday',
				value: 2
			},
			{
				name: 'Thursday',
				value: 3
			},
			{
				name: 'Friday',
				value: 4
			}
		]
	})	
	//Determine what that selected date is.
	let selectedDate;
	switch(answer2){
		case 0:
			selectedDate = "Mon";
			break;
		case 1:
			selectedDate = "Tue";
			break;
		case 2:
			selectedDate = "Wed";
			break;
		case 3:
			selectedDate = "Thr";
			break;
		case 4:
			selectedDate = "Fri";
			break;
	}

	//Third propt for the time the shift takes place.
	ClearTerminal();
	let display = new Schedule();
	console.log(display.selectedTime);
	console.log("Of the above time frame, input the time the shift takes place.");
	const answer3 = await input ({message: 'Enter starting time:'});
	const answer4 = await input ({message: 'Enter end time'});

	let timeFrom = parseFloat(answer3);
	let timeTo = parseFloat(answer4);

	if(isNaN(timeFrom) || isNaN(timeTo) || timeFrom <= 0 || timeTo <= 0){
		message("Err: Invalid input", errMsg);
		await sleep();
		return ShiftMenu();
	}

	let sftFull = new Shift(type);
	let sft = new Shift(type);
	sft.setDate(selectedDate);
	sftFull.setDate(selectedDate);
	sft.setTime(timeFrom,timeTo);
	if(sft.equals(sftFull)){ //If there is no change to the time, don't add the shift.
		message("Err: Invalid input", errMsg);
		await sleep();
		return ShiftMenu();
	}
	else{
		listShifts.add(sft);
		message("Added "+ sft.shiftType + " shift", successMsg);
		await sleep();
		return ShiftMenu();
	}


}


async function removeShift(){
	ClearTerminal();

	if(listShifts.length() == 0){
		message('Err: No shifts to remove', errMsg);
		await sleep();
		return ShiftMenu();
	}
	console.log(listSftContents());
	const answer = await input({message: 'choose what to remove:'});
	let numAnswer = parseInt(answer);
	let sft = listShifts.get(numAnswer);
	if(isNaN(numAnswer)){
		message('Err: Invalid input', errMsg);
		await sleep();
		return ShiftMenu();
	}
	else{
		listShifts.remove(answer);
		message('Removed Shift',successMsg);
		await sleep();
		return ShiftMenu();	
	}
	
}


/**
 * ----- Mapping + Schedule Generation Functions -----
 */
/**
 * Menu for schedule generation
 */
async function GenerateScheduleMenu(){
	ClearTerminal();
	const answer = await select ({
		name: 'Schedule Menu',
		message: 'Schedule Menu',
		type: 'select',
		choices: [
			{
				name: 'Generate Schedule',
				value: 0
			},
			{
				name: 'Back',
				value: 1
			}
		],
		pageSize: 2
	});	
	//Process answer
	switch(answer){
		case 0:
			processSchedule();
			break;
		case 1:
			mainMenu();
			break;
	}

}

/**
 * Process the current list of students and shifts.
 */
async function processSchedule(){


//TESTING STUFF TESTING STUFF TESTING STUFF:
	
	//STUDENT SAMPLE
    const Baran = new Student('Baran Shajari');
    Baran.reduceAvailability("Thr",19.5,20.5);
    Baran.reduceAvailability("Fri",14.0,19.0);
    
    const Justin = new Student('Justin Balkisson');
    Justin.reduceAvailability("Mon",11.5,13.0);
    Justin.reduceAvailability("Mon",17.5,21.0);
    Justin.reduceAvailability("Tue",8.5,21.0);
    Justin.reduceAvailability("Wed",11.5,13.0);
    Justin.reduceAvailability("Wed",14.5,21.0);
    Justin.reduceAvailability("Thr",9.0,11.0);
    Justin.reduceAvailability("Thr",13.0,15.0);
    Justin.reduceAvailability("Thr",18.0,21.0);
    Justin.reduceAvailability("Fri",13.5,15.5);
    Justin.reduceAvailability("Fri",18.0,21.0);

    const Sara = new Student('Sara Malik Araibi');
    Sara.reduceAvailability("Mon",11.5,14.5);
    Sara.reduceAvailability("Tue",10.0,11.5);
    Sara.reduceAvailability("Tue",16.0,17.5);
    Sara.reduceAvailability("Wed",11.5,13.0);
    Sara.reduceAvailability("Wed",18.0,19.0);
    Sara.reduceAvailability("Thr",13.0,15.0);
    Sara.reduceAvailability("Thr",16.0,17.5);
    Sara.reduceAvailability("Fri",10.0,11.5);
    Sara.reduceAvailability("Fri",13.5,21.0);

    const Dan = new Student('Dan Stefan Voicu');
    Dan.reduceAvailability("Mon",8.5,10.5);
    Dan.reduceAvailability("Mon",11.5,12.5);
    Dan.reduceAvailability("Mon",16.0,19.0);
    Dan.reduceAvailability("Tue",10.0,11.5);
    Dan.reduceAvailability("Wed",8.5,9.5);
    Dan.reduceAvailability("Wed",11.5,12.5);
    Dan.reduceAvailability("Wed",16.0,17.5);
    Dan.reduceAvailability("Wed",19.0,20.0);
    Dan.reduceAvailability("Thr",10.0,11.5);
    Dan.reduceAvailability("Thr",16.0,17.5);
    Dan.reduceAvailability("Fri",8.5,8.5);
    Dan.reduceAvailability("Fri",11.5,12.5);

	const Ali = new Student('Muhammad Ali');
    Ali.reduceAvailability("Mon",9.0,10.5);
    Ali.reduceAvailability("Mon",11.5,13.0);
    Ali.reduceAvailability("Mon",14.5,17.5)

	listStudents.add(Baran);
	listStudents.add(Justin);
	listStudents.add(Sara);
	listStudents.add(Dan);
	listStudents.add(Ali);

	//SHIFTS SAMPLE
	for(let i = 0; i<5; i++){ //for 5 days.
        for(let j = 0; j<2; j++){ // make 2 shifts.
            let date;
            if(i == 0){
                date = "Mon";
            }
            if(i == 1){
                date = "Tue";
            }
            if(i == 2){
                date = "Wed";
            }
            if(i == 3){
                date = "Thr";
            }
            if(i == 4){
                date = "Fri";
            }
            const sft = new Shift("WSC");
            sft.setTime(j+8.5, j+9.0);
            sft.setDate(date);
            listShifts.add(sft); 
        }
    }

    let sftMON = new Shift("WSC");
    sftMON.setTime(13.5,15.5);
    sftMON.setDate("Fri");
	listShifts.add(sftMON);

	//Run the main algorithms. 
	mapping = main.randomScore(listShifts, listStudents);
	main.setAssignmentsRandom(mapping);

	console.log(displayRelations());

	const answer = await confirm({
		message: 'Would you like to export these results into a text document?'
	})
	if(answer){
		ClearTerminal();
		process.exit(1);
	}
	else{
		
	}	

	main.resetAssignments(listShifts, listStudents);
	mainMenu();

}


/**
 * ----- Auxiliary Functions -----
 */
function ClearTerminal(){
	let lines = process.stdout.getWindowSize()[1];
	for(let i = 0; i< lines; i++){
		console.log('\r\n');
	}
}

async function confirmExit(){
	ClearTerminal();
	const answer = await confirm({
		message: 'Are you sure you want to exit? All instance data will be lost.'
	})
	if(answer){
		ClearTerminal();
		process.exit(1);
	}
	else{
		mainMenu();
	}
}


/**
 * Displays a message for
 * @param {} msg The message to be displayed
 * @param {} time Time to display message
 */
async function message(msg,time){
	sleep = (ms = time) => new Promise((r) => setTimeout(r,ms));
	ClearTerminal();
	console.log(msg);
}

function listStdContents(){
	let output = '';
	let len = listStudents.length();
	for(let i = 0; i<len; i++){
		let std = listStudents.get(i);
		output = output + i + ': ' + std.name + '\n';
	}
	return output;
}

function listSftContents(){
	let output = '';
	let len = listShifts.length();
	for(let i = 0; i<len; i++){
		let sft = listShifts.get(i);
		let shiftLen = sft.getNum30MinChunks();
		
		let sftStartTime = sft.shiftTime.selectedTime[0];
		let sftEndTime = sft.shiftTime.selectedTime[shiftLen-1];

		output = output + i + ': ' + sft.shiftType + ' on ' + sft.shiftDate + ' at ' + sftStartTime + '-' + sftEndTime +'\n';
	}
	return output;
}

function displayRelations(){
	let output = '';
	let len = listShifts.length();
	for(let i = 0; i<len; i++){
		let sft = listShifts.get(i);

		//Get start end times of shifts
		let sftLen = sft.getNum30MinChunks();
		let sftStartTime = sft.shiftTime.selectedTime[0];
		let sftEndTime = sft.shiftTime.selectedTime[sftLen-1];

		//Get the relations of shifts
		let sftRelations = main.getRelations(sft,mapping); //Organized from lowest score qualified to highest score.
		
		let count = 1;

		let top3 = '';
		if(sftRelations.length()-3 < 0){//In case there are less than 3 possible combinations
			for(let i = sftRelations.length()-1; i >= 0; i--){
				top3 = top3 + count + ') ' +  sftRelations.get(i).at(2).name + ', ';
				count++;
			}
		}
		else{ //Otherwise...
			for(let i = sftRelations.length()-1; i>=sftRelations.length()-3; i--){
				top3 = top3 + count + ') ' + sftRelations.get(i).at(2).name + ', ';
				count++;
			}
		}

		//Extract bottom3:
		let bottom3 = '';
		let j = 0;
		count = 1;

		while(j<=2){
			bottom3 = bottom3 + count + ') ' + sftRelations.get(j).at(2).name + ', ';
			j++;
			count++;
		}



		//Construct which students are assigned:
		let assignedStudents = '';
		let numStudents = sft.assignedStudents().length();
		for(let j = 0; j<numStudents; j++){
			assignedStudents = assignedStudents + sft.assignedStudents().get(j).name + ', ';
		}

		//Construct the output.
		output = output + sft.shiftType + ' on ' + sft.shiftDate + ' at ' + sftStartTime + '-' + sftEndTime +'\n' + 
		'Assign Student(s): '+ assignedStudents + '\n' + 
		'Best for Shift: ' + top3 + '\n' +
		'Worse for Shift: ' + bottom3 +
		'\n *--------------------* \n';
	}
	return output;
}

//----- Initial call ------
await mainMenu();
