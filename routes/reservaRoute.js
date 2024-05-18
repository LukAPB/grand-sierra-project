const express = require('express');
const ReservaController = require('../controllers/reservaController');

class ReservaRoute {
    
        #router;
    
        get router() {
            return this.#router;
        }
    
        set router(router) {
            this.#router = router;
        }
    
        constructor() {
            this.#router = express.Router();
    
            let ctrl = new ReservaController();
    
            this.#router.get('/', ctrl.reservaView);
            // this.#router.get('/reserva', ctrl.reservaView);
            // this.#router.get('/checkout', ctrl.checkoutView);
            this.#router.post('/gravarReserva', ctrl.gravarReserva);
            // this.#router.post('/checkout', ctrl.checkoutView);
        }
    }

module.exports = ReservaRoute;