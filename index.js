const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

const header = () => {
    console.clear();
    console.log(chalk.green.bold('===================================='));
    console.log(chalk.cyan.bold('   ⚡ TERMINAL TASK MANAGER V1.0 ⚡   '));
    console.log(chalk.green.bold('====================================\n'));
};

const showMenu = () => {
    header();
    console.log(chalk.yellow('1.') + ' View Tasks');
    console.log(chalk.yellow('2.') + ' Add New Task');
    console.log(chalk.yellow('3.') + ' Remove Task');
    console.log(chalk.yellow('4.') + ' Exit');
    rl.question(chalk.magenta('\n[SYSTEM]> Select an option: '), handleInput);
};

const handleInput = (option) => {
    switch (option) {
        case '1':
            viewTasks();
            break;
        case '2':
            rl.question(chalk.blue('Enter task name: '), (task) => {
                tasks.push(task);
                console.log(chalk.green('✔ Task added successfully!'));
                setTimeout(showMenu, 1000);
            });
            break;
        case '3':
            viewTasks();
            rl.question(chalk.red('Enter task number to delete: '), (index) => {
                tasks.splice(index - 1, 1);
                console.log(chalk.red('✘ Task removed!'));
                setTimeout(showMenu, 1000);
            });
            break;
        case '4':
            console.log(chalk.gray('Shutting down system...'));
            rl.close();
            break;
        default:
            console.log(chalk.red('Invalid option!'));
            setTimeout(showMenu, 1000);
            break;
    }
};

const viewTasks = () => {
    header();
    if (tasks.length === 0) {
        console.log(chalk.red('No tasks found in the database.'));
    } else {
        tasks.forEach((t, i) => {
            console.log(`${chalk.yellow(i + 1)}. [${chalk.green('●')}] ${t}`);
        });
    }
    if (tasks.length > 0) {
        console.log(chalk.cyan('\nPress Enter to return to menu...'));
    }
};

showMenu();
