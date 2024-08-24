export const API_URL = process.env.REACT_APP_BACKEND_SERVER;

export const SOCKET_CONFIG = { path: '/socket.io', 'transports': ['websocket', 'polling']}

export const decodeProcessStatus = {
    1 : 'Processing',
    2 : 'Sucessful',
    3 : 'Failed'
}