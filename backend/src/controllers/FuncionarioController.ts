//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class FuncionarioController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionarios = await prisma.funcionario.findMany(
            // recupera todas os clientes
            {
                select: {
                    id_funcionario: true,
                    nome: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                            anotacoes: true
                        }
                    },
                }
            }
        );
        res.status(200).json(funcionarios);
        await prisma.$disconnect();
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionario = await prisma.funcionario.findUnique(
            {
                where: { id_funcionario: Number(req.params.id) },
                select: {
                    id_funcionario: true,
                    nome: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                            anotacoes: true
                        }
                    },
                }
            }
        );
        res.status(200).json(funcionario);
        await prisma.$disconnect();
    }


    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome } = req.body; // Obter os dados nos parâmetros da rota
        const novoFuncionario = await prisma.funcionario.create(
            {
                data: {
                    nome: nome,
                },
                select: {
                    nome: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                            anotacoes: true
                        }
                    },
                }
            }
        );
        res.status(201).json(novoFuncionario);
        await prisma.$disconnect();
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const funcionarioAlterado = await prisma.funcionario.update(
            {
                where: { id_funcionario: Number(req.params.id) },
                data: {
                    nome: nome,
                },
                select: {
                    nome: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                            anotacoes: true
                        }
                    },
                }
            }
        );
        res.status(200).json(funcionarioAlterado);
        await prisma.$disconnect();
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.funcionario.delete(
            {
                where: { id_funcionario: Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
        await prisma.$disconnect();
    }

    async associarDupla(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { funcionarioId, duplaId } = req.body; // Obter os IDs do funcionário e da dupla nos parâmetros da rota
        try {
            // Verificar quantos funcionários já estão associados a essa dupla
            const funcionariosNaDupla = await prisma.funcionario.count({
                where: { id_dupla: parseInt(duplaId) },
            });

            if (funcionariosNaDupla >= 2) {
                return res.status(400).json({ error: 'A dupla já está completa, não é possível adicionar mais funcionários.' });
            }

            // Se ainda houver espaço na dupla, associe o novo funcionário
            const funcionarioAlterado = await prisma.funcionario.update({
                where: { id_funcionario: parseInt(funcionarioId) },
                data: {
                    id_dupla: parseInt(duplaId),
                },
            });

            res.status(200).json(funcionarioAlterado);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível associar o funcionário à dupla.' });
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default FuncionarioController;