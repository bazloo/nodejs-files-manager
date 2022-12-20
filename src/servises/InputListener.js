export default class InputListener {
  static init(handler) {
    process.stdin.on('data', (input) => {
      handler(input.toString());
    });
  }
}
