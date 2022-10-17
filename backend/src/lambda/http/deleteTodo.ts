import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo, getTodo } from '../../helpers/todosAcess'
import { createLogger } from '../../utils/logger'
// import { getUserId } from '../utils'

const logger = createLogger('DeleteTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    logger.info('DeleteTodo: ', event)
    // TODO: Remove a TODO item by id
    const todo = await getTodo(todoId)
    const result = await deleteTodo(todo)
    return {
      statusCode: 200,
      body: JSON.stringify({
        result
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
