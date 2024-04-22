import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ControladoraCliente } from "./controllers/controladora-cliente.ts";

const c = new ControladoraCliente();
c.configurarBusca();