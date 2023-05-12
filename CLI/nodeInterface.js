#!/user/bin/env node
//Import the js libraries from the web
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import select from '@inquirer/select';
import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
//Import the custom js libraries made locally
import ArrayList from '../App/ArrayList.js';
import Stack from '../App/Stack.js';
import Shift from '../App/shift.js';
import Student from '../App/student.js'
import Schedule from '../App/schedule.js';

//The lists of shifts and students
const listStudents = new ArrayList();
const listShifts = new ArrayList();
let mapping;
	
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
			StudentMenu();
			break;
		case 1:
			ShiftMenu();
			break;
		case 2:
			GenerateScheduleMenu();
			break;
		case 3:
			confirmExit();
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
				name: 'Add Students',
				value: 0,
			},
			{
				name: 'Remove Students',
				value: 1,
			},
			{
				name: 'Edit Students',
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
			addStudent();
			break;
		case 3:
			mainMenu();
			break;
	}
}

async function addStudent(){
	ClearTerminal();
	const answer = await input ({message: 'Input Student Name:'})
	let newStudent = new Student(answer);
	console.log(newStudent);
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
				name: 'Edit Shift',
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
		case 3:
			mainMenu();
			break;
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
			break;
		case 1:
			mainMenu();
			break;
	}
}
/**
 * Process the current list of students and shifts.
 */
function processSchedule(){

}


/**
 * ----- Auxiliary Functions -----
 */
function ClearTerminal(){
	let lines = process.stdout.getWindowSize()[1];
	for(var i = 0; i< lines; i++){
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

//----- Initial call ------
await mainMenu();
