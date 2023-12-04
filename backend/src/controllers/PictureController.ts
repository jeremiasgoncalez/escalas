//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class PictureController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const pictures = await prisma.picture.findMany(
            // recupera todas os clientes
            {
                select: {
                    id_picture: true,
                    path_url: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                        }
                    },
                }
            }
        );
        res.status(200).json(pictures);
        await prisma.$disconnect();
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const picture = await prisma.picture.findUnique(
            {
                where: { id_picture: Number(req.params.id) },
                select: {
                    id_picture: true,
                    path_url: true,
                    dupla: {
                        select: {
                            id_dupla: true,
                            nome_dupla: true,
                        }
                    },
                }
            }
        );
        res.status(200).json(picture);
        await prisma.$disconnect();
    }


}

export default PictureController;