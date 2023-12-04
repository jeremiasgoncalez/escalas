//importar componentes necessarios do express
import { Router, Request, Response, json } from 'express';
//importar os controllers aqui
import TesteController from './controllers/TesteController';

//importar middlewares aqui
import ValidaTeste from './middlewares/ValidaTeste';
import FuncionarioController from './controllers/FuncionarioController';
import DuplaController from './controllers/DuplaController';
import PictureController from './controllers/PictureController';

//instanciar [Router]
const router = Router();


//modelo de Rota para requisicoes GET<POST<PUT<DELETE
router.get("/teste/:id", ValidaTeste, new TesteController().teste);

router.get("/funcionarios", new FuncionarioController().list);
router.get("/funcionarios/:id", new FuncionarioController().show);
router.post("/funcionarios", new FuncionarioController().store);
router.put("/funcionarios/:id", new FuncionarioController().update);
router.delete("/funcionarios/:id", new FuncionarioController().delete);
router.put("/funcionarios/:id_funcionario/join/:id_dupla", new FuncionarioController().associarDupla);
router.get("/duplas", new DuplaController().list);
router.get("/duplas/:id", new DuplaController().show);
router.post("/duplas", new DuplaController().store);
router.put("/duplas/:id", new DuplaController().update);
router.delete("/duplas/:id", new DuplaController().delete);
router.get("/pictures", new PictureController().list);
router.get("/pictures/:id", new PictureController().show);


export default router;