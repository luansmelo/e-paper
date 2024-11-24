import { generateOpenApi } from '@ts-rest/open-api';
import { documentContract } from '../../application/contracts/document.contract';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const openApiDocument = generateOpenApi(documentContract, {
    info: {
        title: 'E-Paper API',
        version: '1.0.0',
    },
    servers: [
        {
            url: process.env.APP_URL || "http://localhost:3000",
            description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server',
        },
    ],
});
