import io from 'socket.io-client';

let orderSocket = null;

export function initializeOrderSocket(token, onOrderCreatedCallback) {
    if (orderSocket == null) {
        orderSocket = io(process.env.VUE_APP_SERVER_BASE_URL + '/order-ws', {
            query: {
                token,
            },
            transports: ['websocket'],
        });

        orderSocket.on('orderCreated', onOrderCreatedCallback);
    }
}

export function getOrderSocket() {
    return orderSocket;
}

export function closeOrderSocket() {
    if (orderSocket) {
        orderSocket.close();
        orderSocket = null;
    }
}
