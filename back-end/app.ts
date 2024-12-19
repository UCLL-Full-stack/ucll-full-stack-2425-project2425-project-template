import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { submissionRouter } from './controller/Submission_form.routes';
import { raceRouter } from './controller/Race.routes';
import { authRouter } from './controller/Auth.routes';
import { crashRouter } from './controller/Crash.routes';
import { userRouter } from './controller/User.routes';
import { racecarRouter } from './controller/Racecar.routes';
import { driverRouter } from './controller/Driver.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/submission_forms', submissionRouter);
app.use('/races', raceRouter);
app.use('/crashes', crashRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/racecars', racecarRouter);
app.use('/drivers', driverRouter);

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                Race: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Grand Prix Silverstone'
                        },
                        type: {
                            type: 'string',
                            example: 'Formula 1'
                        },
                        description: {
                            type: 'string',
                            example: 'A historic race'
                        },
                        location: {
                            type: 'string',
                            example: 'Silverstone'
                        },
                        drivers: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Driver'
                            }
                        },
                        crashes: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Crash'
                            }
                        },
                        admin: {
                            $ref: '#/components/schemas/Admin'
                        }
                    }
                },
                Driver: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Max Verstappen'
                        },
                        team: {
                            type: 'string',
                            example: 'Red Bull'
                        },
                        description: {
                            type: 'string',
                            example: 'A competitive driver'
                        },
                        age: {
                            type: 'integer',
                            example: 24
                        },
                        racecar: {
                            $ref: '#/components/schemas/Racecar'
                        },
                        crash: {
                            $ref: '#/components/schemas/Crash'
                        }
                    }
                },
                Racecar: {
                    type: 'object',
                    properties: {
                        car_name: {
                            type: 'string',
                            example: 'Red Bull RB16B'
                        },
                        type: {
                            type: 'string',
                            example: 'Formula 1'
                        },
                        description: {
                            type: 'string',
                            example: 'A high-performance racecar'
                        }
                    }
                },
                Crash: {
                    type: 'object',
                    properties: {
                        severity: {
                            type: 'string',
                            example: 'High'
                        },
                        description: {
                            type: 'string',
                            example: 'A severe crash'
                        }
                    }
                },
                Admin: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        role: {
                            type: 'string',
                            example: 'Race Organizer'
                        }
                    }
                }
            }
        }
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(400).json({
        status: 'application error',
        message: err.message,
    });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
