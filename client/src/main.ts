import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { ControladoraCliente } from "./controllers/controladora-cliente.ts";
import { ControladoraRotas } from './controllers/controladora-rotas.ts';

const c = new ControladoraRotas();
c.configurarRotas();

// const c = new ControladoraCliente();
// c.configurarBusca();