import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
// import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')

const docClient = createDynamoDBClient()
const todosTable = process.env.TODOS_TABLE
const index = process.env.TODOS_CREATED_AT_INDEX

// TODO-DONE: Implement the dataLayer logic
export async function createTodo(todo: TodoItem): Promise<TodoItem> {
  await docClient.put({
    TableName: todosTable,
    Item: todo
  }).promise()

  return todo
}

export async function getAllTodos(userId: String): Promise<TodoItem[]> {
    const result = await docClient.query({
      TableName : todosTable,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
          ':userId': userId
      }
  }).promise()
  return result.Items as TodoItem []
}

export async function getTodo(todoId: String): Promise<TodoItem> {
  const result = await docClient.query({
    TableName : todosTable,
    IndexName: index,
    KeyConditionExpression: 'todoId = :todoId',
    ExpressionAttributeValues: {
        ':todoId': todoId
    }
}).promise()
  const items = result.Items
  if (items.length !== 0 ) return items[0] as TodoItem
  return null
}

export async function updateTodo(todo: TodoItem): Promise<TodoItem> {
  const result = await docClient.update({
    TableName : todosTable,
    Key: {
      userId: todo.userId,
      todoId: todo.todoId
    },
    IndexName: index,
    UpdateExpression: 'set attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
        ':attachmentUrl': todo.attachmentUrl
    }
}).promise()
return result.Attributes as TodoItem
}

export async function deleteTodo(todo: TodoItem): Promise<TodoItem> {
  const result = await docClient.delete({
    TableName : todosTable,
    Key: {
      userId: todo.userId,
      todoId: todo.todoId
    },
    IndexName: index,
    ConditionExpression: 'todoId = :todoId',
    ExpressionAttributeValues: {
      ':todoId': todo.todoId
    }
}).promise()
  return result
}


export async function updateTodoItem(todos: TodoUpdate): Promise<TodoUpdate> {
  await docClient.update({
      TableName: todosTable,
      Key: {
        userId: todos.userId,
        todoId: todos.todoId
      },
      UpdateExpression: 'set #nameId= :n, dueDate= :d, done= :dn',
      ExpressionAttributeNames: {
        '#nameId': 'name'
      },
      ExpressionAttributeValues: {
        ':n': todos.name,
        ':d': todos.dueDate,
        ':dn': todos.done
      }
    })
    .promise()
  return todos
}

//  export class TodoAcess {
//   constructor(
//     private readonly docClient: DocumentClient = createDynamoDBClient(),
//     private readonly groupsTable = process.env.GROUPS_TABLE) {
//   }
//  }

 function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}