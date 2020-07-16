import SocketIo from "socket.io-client";
class SocketPlugin {
  constructor({ url, options }) {
    this.io = SocketPlugin.connect(url, options);
  }
  install(Vue) {
    Vue.prototype.$socket = this.io;
  }
  static connect(connection, options) {
    const io = SocketIo(connection, options);
    // console.log(io);
    return io;
  }
}
export default SocketPlugin;
