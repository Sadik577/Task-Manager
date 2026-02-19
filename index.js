const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

// ১. পজ বা বিরতির জন্য হেল্পার ফাংশন
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ২. টাইপিং অ্যানিমেশন ফাংশন
const typeWriter = async (text, colorFunc = chalk.white, speed = 40) => {
    for (let char of text) {
        process.stdout.write(colorFunc(char));
        await sleep(speed);
    }
    process.stdout.write('\n');
};

// ৩. স্পিনিং লোডার ফাংশন
const showLoader = async (message) => {
    const loaderChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    for (let i = 0; i < 12; i++) {
        const char = loaderChars[i % loaderChars.length];
        process.stdout.write(`\r${chalk.yellow(char)} ${chalk.white(message)}...`);
        await sleep(80);
    }
    process.stdout.write(`\r${chalk.green('✔')} ${message} Done!          \n`);
    await sleep(400);
};

// ৪. অ্যানিমেটেড হেডার ও মেনু
const showMenu = async () => {
    console.clear();
    console.log(chalk.green('===================================='));
    
    // টাইটেল অ্যানিমেশন
    await typeWriter('   ⚡ TERMINAL TASK MANAGER V2.0 ⚡   ', chalk.cyan.bold, 60);
    
    console.log(chalk.green('====================================\n'));

    // মেনু অপশনগুলো টাইপিং ইফেক্টে আসবে
    await typeWriter('1. View Tasks', chalk.yellow, 20);
    await typeWriter('2. Add New Task', chalk.yellow, 20);
    await typeWriter('3. Remove Task', chalk.yellow, 20);
    await typeWriter('4. Exit', chalk.yellow, 20);

    process.stdout.write(chalk.magenta('\n[SYSTEM]> '));
    rl.question('Select an option: ', handleInput);
};

const handleInput = async (option) => {
    switch (option) {
        case '1':
            console.clear();
            console.log(chalk.cyan.bold('--- CURRENT DATABASE ---'));
            if (tasks.length === 0) {
                console.log(chalk.red('\nNo tasks found!'));
            } else {
                tasks.forEach((t, i) => {
                    console.log(`${chalk.yellow(i + 1)}. [${chalk.green('●')}] ${t}`);
                });
            }
            rl.question(chalk.gray('\nPress Enter to return...'), () => showMenu());
            break;

        case '2':
            rl.question(chalk.blue('\nEnter task name: '), async (task) => {
                if (task.trim()) {
                    await showLoader('Saving to Memory');
                    tasks.push(task);
                }
                showMenu();
            });
            break;

        case '3':
            if (tasks.length === 0) {
                console.log(chalk.red('\nNothing to delete!'));
                await sleep(1000);
                showMenu();
            } else {
                rl.question(chalk.red('\nEnter task number to delete: '), async (index) => {
                    const idx = parseInt(index) - 1;
                    if (idx >= 0 && idx < tasks.length) {
                        await showLoader('Deleting Task');
                        tasks.splice(idx, 1);
                    } else {
                        console.log(chalk.red('Invalid entry!'));
                        await sleep(800);
                    }
                    showMenu();
                });
            }
            break;

        case '4':
            await typeWriter('Shutting down system...', chalk.gray, 50);
            process.exit();
            break;

        default:
            console.log(chalk.red('Invalid option!'));
            await sleep(800);
            showMenu();
            break;
    }
};

// অ্যাপ শুরু
showMenu();
