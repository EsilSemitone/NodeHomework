export function multiply(...args) {
    return args.reduce((a, b) => +a * +b);
}