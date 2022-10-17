// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { APIGatewayProxyEvent} from 'aws-lambda'
// import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { getUserId } from '../lambda/utils'
import { TodoItem } from '../models/TodoItem'
// import { APIGateway } from 'aws-sdk'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic

export  function createTodoItem(
  createTodoRequest: CreateTodoRequest,
  event: APIGatewayProxyEvent
): TodoItem {

  const todoId = uuid.v4()
  return {
    ...createTodoRequest,
    userId : getUserId(event),
    todoId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: ""
  } as TodoItem
}

