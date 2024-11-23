import { generateOpenApi } from '@ts-rest/open-api';
import { documentContract } from '../../application/contracts/document.contract';

export const openApiDocument = generateOpenApi(documentContract, {
    info: {
        title: 'E-Paper API',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Localhost Server',
        },
    ],
});
