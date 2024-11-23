import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export const AddDocumentSchema = z.object({
  origin: z.string().min(1).openapi({
    description: 'Origem do documento',
    example: 'sistema',
  }),
  type: z.string().min(1).openapi({
    description: 'Tipo do documento',
    example: 'relatório',
  }),
});

export const DocumentFilterSchema = z.object({
  type: z.string().optional().openapi({
    description: 'Tipo de documento para filtro',
    example: 'relatório',
  }),
  issuer: z.string().optional().openapi({
    description: 'Emitente do documento para filtro',
    example: 'Empresa X',
  }),
  createdAtStart: z.string().optional().openapi({
    description: 'Data inicial para filtro de criação do documento (ISO 8601)',
    example: '2024-01-01T00:00:00.000Z',
  }),
  createdAtEnd: z.string().optional().openapi({
    description: 'Data final para filtro de criação do documento (ISO 8601)',
    example: '2024-12-31T23:59:59.999Z',
  }),
  totalTaxValueMin: z.number().optional().openapi({
    description: 'Valor mínimo dos impostos para filtro',
    example: 100.0,
  }),
  totalTaxValueMax: z.number().optional().openapi({
    description: 'Valor máximo dos impostos para filtro',
    example: 1000.0,
  }),
  netValueMin: z.number().optional().openapi({
    description: 'Valor líquido mínimo para filtro',
    example: 500.0,
  }),
  netValueMax: z.number().optional().openapi({
    description: 'Valor líquido máximo para filtro',
    example: 5000.0,
  }),
  sortBy: z.string().optional().openapi({
    description: 'Campo pelo qual a ordenação será realizada',
    example: 'createdAt',
  }),
  sortOrder: z.enum(['asc', 'desc']).optional().openapi({
    description: 'Ordem de ordenação',
    example: 'asc',
  }),
  page: z
    .preprocess((val) => (val ? parseInt(val as string, 10) : 1), z.number().int().min(1).default(1))
    .openapi({
      description: 'Número da página',
      example: 1,
    }),
  pageSize: z
    .preprocess((val) => (val ? parseInt(val as string, 10) : 10), z.number().int().min(1).default(10))
    .openapi({
      description: 'Quantidade de itens por página',
      example: 10,
    }),
});

export const DocumentSchema = z.object({
  id: z.string().uuid({ message: 'ID deve ser um UUID válido' }).openapi({
    description: 'ID único do documento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),
  name: z.string().nullable().openapi({
    description: 'Nome do documento',
    example: 'Relatório Anual',
  }),
  origin: z.string().min(1, 'Origem é obrigatória').openapi({
    description: 'Origem do documento (ex: sistema ou usuário)',
    example: 'sistema',
  }),
  type: z.string().min(1, 'Tipo é obrigatório').openapi({
    description: 'Tipo do documento (ex: relatório, nota fiscal)',
    example: 'relatório',
  }),
  issuer: z.string().nullable().openapi({
    description: 'Emitente do documento',
    example: 'Empresa X',
  }),
  totalTaxValue: z.number().positive('Valor total dos impostos deve ser positivo').nullable().openapi({
    description: 'Valor total dos impostos',
    example: 200.5,
  }),
  netValue: z.number().positive('Valor líquido deve ser positivo').nullable().openapi({
    description: 'Valor líquido',
    example: 1800.0,
  }),
  fileUrl: z.string().url('URL do arquivo deve ser válida').nullable().openapi({
    description: 'URL do arquivo associado ao documento',
    example: 'http://localhost:9000/bucket/uploads/file.pdf',
  }),
  createdAt: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date({ invalid_type_error: 'Data de criação inválida' })
  ).openapi({
    description: 'Data de criação do documento',
    example: '2024-11-23T02:58:12.146Z',
  }),
  updatedAt: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date({ invalid_type_error: 'Data de última atualização inválida' })
  ).openapi({
    description: 'Data de última atualização do documento',
    example: '2024-11-23T03:58:12.146Z',
  }),
});

export const UpdateDocumentSchema = DocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  fileUrl: true,
}).partial().openapi({
  description: 'Esquema para atualizar documentos',
});
