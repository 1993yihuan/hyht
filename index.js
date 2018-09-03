#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const componentPath = path.resolve(__dirname + '/components');
const templatePath = path.resolve(__dirname + '/template');
const textInfo = require('./info');
const chalk = require('chalk');
const infos = require('./src/info');
const server = require('./src/server');
class index {
    constructor() {
        infos();
        // 类型选择
        this.typeQuestionsList = [
            {
                type: 'list',
                name: 'selection',
                message: chalk.bold.green('---Please select the function---'),
                choices: [
                    {
                        name: 'Initial template',
                        value: 0
                    },
                    {
                        name: 'Component',
                        value: 1
                    },
                    {
                        name: 'Start local server',
                        value: 2
                    }
                ]
            }
        ];
        // 组件选择
        this.componentQuestionsList = [
            {
                type: 'checkbox',
                name: 'selection',
                message: chalk.bold.green('---Please select the component---'),
                choices: []
            }
        ];
        // 模板选择
        this.templateQuestionsList = [
            {
                type: 'list',
                name: 'selection',
                message: chalk.bold.green('---Please select the template---'),
                choices: []
            }
        ];
        this.httpPortInput = [
            {
                type: 'input',
                name: 'selection',
                message: chalk.bold.green('Please input port：')
            }
        ];
    }
    start() {
        const that = this;
        inquirer.prompt(this.typeQuestionsList).then(answers => {
            switch (answers.selection) {
                case 0:
                    this.getTemplateList(templatePath, that.templateQuestionsList, 0);
                    break;
                case 1:
                    this.getTemplateList(componentPath, that.componentQuestionsList, 1);
                    break;
                case 2:
                    inquirer.prompt(that.httpPortInput).then(answers => {
                        server(answers.selection);
                    });
                    break;
                default:
                    break;
            }
        });
    }
    // 获取模板列表
    getTemplateList(path, questions, type) {
        let templateList = [];
        let infoType = null;
        switch (type) {
            case 0:
                infoType = textInfo.template;
                break;
            case 1:
                infoType = textInfo.components;
                break;
            default:
                break;
        }
        fs.readdir(path, function(err, files) {
            templateList = files;
            for (let i in templateList) {
                let info = infoType[templateList[i]] ? chalk.magenta(infoType[templateList[i]]) : '';
                templateList[i] = {
                    name: templateList[i] + ' ' + info,
                    value: templateList[i]
                };
            }
            questions[0].choices = templateList;
            inquirer.prompt(questions).then(answers => {
                if (Array.isArray(answers.selection)) {
                    for (let j in answers.selection) {
                        fs.copy(`${__dirname}/components/${answers.selection[j]}`, `${process.cwd()}/${answers.selection[j]}`).then(() => {
                            console.log(`${chalk.bold.green(answers.selection[j])}${chalk.magenta('...Generated!')}`);
                        });
                    }
                } else {
                    fs.copy(`${__dirname}/template/${answers.selection}`, `${process.cwd()}/${answers.selection}`).then(() => {
                        console.log(`${chalk.bold.green(answers.selection)}${chalk.magenta('...Generated!')}`);
                    });
                }
            });
        });
    }
}

const cli = new index();
cli.start();
