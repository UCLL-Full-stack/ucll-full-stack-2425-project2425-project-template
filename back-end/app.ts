import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { projectRouter } from './controller/project.routes'; // Adjusted path

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/projects', projectRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Project API',
        version: '1.0.0',
        description: 'API documentation for the Project API',
      },
      components: {
        schemas: {
            Project: {
                type: 'object',
                properties: {
                    project_Id: {
                        type: 'integer',
                        example: 1
                    },
                    name: {
                        type: 'string',
                        example: 'Project Name'
                    },
                    users: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/User'
                        }
                    },
                    tasks: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Task'
                        }
                    }
                }
            },
            ProjectInput: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'New Project'
                    },
                    users: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/User'
                        }
                    },
                    tasks: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Task'
                        }
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    user_Id: {
                        type: 'integer',
                        example: 1
                    },
                    firstName: {
                        type: 'string',
                        example: 'John'
                    },
                    lastName: {
                        type: 'string',
                        example: 'Doe'
                    },
                    email: {
                        type: 'string',
                        example: 'john.doe@example.com'
                    },
                    role: {
                        type: 'string',
                        example: 'admin'
                    }
                }
            },
            Task: {
                type: 'object',
                properties: {
                    task_Id: {
                        type: 'integer',
                        example: 1
                    },
                    name: {
                        type: 'string',
                        example: 'Task Name'
                    },
                    description: {
                        type: 'string',
                        example: 'Task Description'
                    },
                    due_date: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-10-25T00:00:00Z'
                    }
                }
            }
        }
    }
    },
    apis: ['./controller/*.routes.ts'],
  };

  const swaggerSpec = swaggerJsDoc(swaggerOpts);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url} | Method: ${req.method}`);
  next();
});