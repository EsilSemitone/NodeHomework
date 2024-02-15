export function mod(...args) {
    if (args.slice(1).includes('0')) {
        throw new Error('На ноль делить нельзя');
    }
    return args.reduce((a, b) => +a % +b);
}