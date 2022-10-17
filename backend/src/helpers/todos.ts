import  {updateTodoItem} from './todosAcess' 
// import { AttachmentUtils } from './attachmentUtils';
import { APIGatewayProxyEvent} from 'aws-lambda'
// import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { getUserId } from '../lambda/utils'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
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

export async function createUpdateTodoItem(
  todoId: string,
  updateTodoRequest: UpdateTodoRequest,
  user: string
): Promise<TodoUpdate> {

  return await updateTodoItem({
    todoId: todoId,
    userId: user,
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    done: updateTodoRequest.done
  })
}

