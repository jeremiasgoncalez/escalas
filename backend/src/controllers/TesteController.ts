//importar componentes do [express]
import { Request, Response } from 'express';

//declaracao do [controlador]
class TesteController {
    //funcoes a serem executadas ou nao
    teste(req: Request, res: Response) {
        //obtem query param
        const x = req.params.id;
        //enviar resposta para o client
        return res.send(`O ID enviado como param foi: ${Number(x)}`);
    }
}

export default TesteController;