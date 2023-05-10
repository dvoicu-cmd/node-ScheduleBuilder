#!/user/bin/env node
//Import the js libraries from the web
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import select from '@inquirer/select';
//Import the custom js libraries made locally.
import ArrayList from '../App/ArrayList.js';
import Stack from '../App/Stack.js';
import Shift from '../App/shift.js';
import Student from '../App/student.js'
import Schedule from '../App/schedule.js';

//The lists of shifts and students
const listStudents = new ArrayList();
const listShifts = new ArrayList();
let mapping;
	
async function mainMenu(){
	const answer = await select({
		name: 'main menu',
		message: 'Please Select an option',
		type: 'select',
		choices: [
			{
				name: 'Add Students',
				value: '1',
			},
			{
				name: 'Delete Students',
				value: '2',
			},
			{
				name: 'Add Shifts',
				value: '3',
			},
			{
				name: 'Delete Shifts',
				value: '4',
			},
			{
				name: 'Add Shifts',
				value: '6',
			},
			{
				name: 'Init mapping',
				value: '7',
			},
			{
				name: 'Assign Shifts to Students',
				value: '8',
			},
			{
				name: 'Reset Assignments',
				value: '9',
			},
			{
				name: '-----Exit program-----',
				value: '10',
			}
		],
		pageSize: '10'
	});
	console.log('Answer:', answer);
}

async function addStudents(){

}



await mainMenu();
