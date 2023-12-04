import { NextFunction, Request, Response } from 'express';


//funcao para verificar se o parametro da req eh valido
function ValidaTeste(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (Number(id) <= 0) {
        //retornar codigo 400 indicando um bad request :/
        res.status(400).send("Parametro Inválido");
    }
    //trigger para a proxima funcao na rota e resposta [!IMPORTANT]
    return next();
}

export default ValidaTeste;