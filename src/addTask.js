'use strict';
const { v4 } = require('uuid');
const AWS = require('aws-sdk');

module.exports.addTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(event.body);
    const id = v4();
    const createAt = new Date();
    const newTask = {
        id,
        title,
        description,
        createAt,
    }

    await dynamodb.put({
        TableName: 'taskTable',
        item: newTask
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(newTask),
    };
};
