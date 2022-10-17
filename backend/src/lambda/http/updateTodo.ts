import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createUpdateTodoItem } from '../../helpers/todos'
import { getUserId } from '../utils'
// import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    const user = getUserId(event)
    const result = await createUpdateTodoItem(todoId, updatedTodo, user)
    return {
      statusCode: 200,
      body: JSON.stringify({
        result
      })
    }
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object


    return undefined
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
