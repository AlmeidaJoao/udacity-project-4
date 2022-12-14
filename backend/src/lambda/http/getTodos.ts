import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllTodos } from '../../helpers/todosAcess'
const logger = createLogger('GetTodo')
// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    logger.info('GetTodo Event: ', event)
    const todos = await getAllTodos(getUserId(event))
    return {
      statusCode: 200,
      body: JSON.stringify({items: todos})
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)
