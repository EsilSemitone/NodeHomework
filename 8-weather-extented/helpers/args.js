export function getArgs(args) {
    const res = {};
    const COMMANDS = ['-s', '-h', '-t', '-reset', '-lang'];

    args.slice(2).forEach((el, index, array) => {
        if (COMMANDS.includes(el)) {
            if (index == array.length - 1 || COMMANDS.includes(array[index + 1])) {
                res[el[1]] = true;
            }
            else {
                res[el[1]] = array[index + 1]
            }
        }
    });
    return res;
}