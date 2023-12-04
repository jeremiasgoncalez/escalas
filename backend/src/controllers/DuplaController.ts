//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class DuplaController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const duplas = await prisma.dupla.findMany(
            // recupera todas os clientes
            {
                select: {
                    id_dupla: true,
                    nome_dupla: true,
                    anotacoes: true,
                    funcionarios: {
                        select: {
                            id_funcionario: true,
                            nome: true,
                        }
                    },
                    picture: {
                        select: {
                            id_picture: true,
                            path_url: true
                        }
                    },
                }
            }
        );
        res.status(200).json(duplas);
        await prisma.$disconnect();
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const dupla = await prisma.dupla.findUnique(
            {
                where: { id_dupla: Number(req.params.id) },
                select: {
                    id_dupla: true,
                    nome_dupla: true,
                    anotacoes: true,
                    funcionarios: {
                        select: {
                            id_funcionario: true,
                            nome: true
                        }
                    },
                    picture: {
                        select: {
                            id_picture: true,
                            path_url: true
                        }
                    },
                }
            }
        );
        res.status(200).json(dupla);
        await prisma.$disconnect();
    }


    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome_dupla, id_picture } = req.body; // Obter os dados nos parâmetros da rota
        const novaDupla = await prisma.dupla.create(
            {
                data: {
                    nome_dupla: nome_dupla,
                    id_picture: id_picture,
                },
                select: {
                    id_dupla: true,
                    nome_dupla: true,
                    anotacoes: true,
                    funcionarios: {
                        select: {
                            id_funcionario: true,
                            nome: true
                        }
                    },
                    picture: {
                        select: {
                            id_picture: true,
                            path_url: true
                        }
                    },
                }
            }
        );
        res.status(201).json(novaDupla);
        await prisma.$disconnect();
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, id_picture } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const duplaAlterada = await prisma.dupla.update(
            {
                where: { id_dupla: Number(req.params.id) },
                data: {
                    nome_dupla: nome,
                    id_picture: id_picture,
                },
                select: {
                    id_dupla: true,
                    nome_dupla: true,
                    anotacoes: true,
                    funcionarios: {
                        select: {
                            id_funcionario: true,
                            nome: true
                        }
                    },
                    picture: {
                        select: {
                            id_picture: true,
                            path_url: true
                        }
                    },
                }
            }
        );
        res.status(200).json(duplaAlterada);
        await prisma.$disconnect();
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.dupla.delete(
            {
                where: { id_dupla: Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
        await prisma.$disconnect();
    }
}
export default DuplaController;