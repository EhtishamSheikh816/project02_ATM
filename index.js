#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let cash = 10000;
let code = 8437;
console.log(chalk.magenta(`Pin code is: ${code}`));
let pinCode = await inquirer.prompt({
    type: "number",
    name: "codes",
    message: chalk.yellow("Please enter your PIN Code:"),
});
if (pinCode.codes === code) {
    console.log(`${chalk.greenBright("Correct Pin Code")}`);
    let atm = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            choices: ["Deposit money", "Withdraw money", "Check balance", "Exit ATM"],
            message: chalk.cyan("What would you like to do?"),
        },
    ]);
    if (atm.action === "Deposit money") {
        let deposits = await inquirer.prompt({
            type: "number",
            name: "money",
            message: chalk.cyan("How much would you like to Deposit amount?"),
        });
        if (deposits.money <= 50000) {
            cash += deposits.money;
            console.log(chalk.blueBright(`You have successfully deposited $${deposits.money}.Your current balance is $${cash}`));
        }
        else {
            console.log(chalk.red("Sorry, the maximum amount that can be deposited in one time is $50,000."));
        }
    }
    else if (atm.action === "Withdraw money") {
        let withdrawal = await inquirer.prompt([
            {
                type: "input",
                name: "amount",
                message: chalk.cyan(`How much would you like to withdraw?`),
            },
        ]);
        if (withdrawal.amount <= cash) {
            cash -= withdrawal.amount;
            console.log(chalk.blueBright(`Your Withdrawal of $${withdrawal.amount} was successfull.`));
        }
        else {
            console.log(chalk.red("Sorry, your are Insufficient funds"));
        }
    }
    else {
        console.log(chalk.blueBright(`Your current balance is: $${cash}`));
    }
}
else {
    console.log(chalk.red("Pin code is incorrect,Please try again."));
}
