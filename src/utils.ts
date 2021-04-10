export function isUnique(list: any[]) {
    return (item, index) => list.indexOf(item) === index;
}
