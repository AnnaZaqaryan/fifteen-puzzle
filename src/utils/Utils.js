

export function getIndexOfElement(array, element) {

    const length = array.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (array[i][j].toString() === element.toString()) {
                return {
                    x: i,
                    y: j
                };
            }
        }
    }
    throw new Error("no element fount " + element);
}

export function getSiblings(array, x, y) {
    const leng = array.length;
    let coor = [{ x: x, y: y + 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x - 1, y: y }];
    coor = coor.filter(e => e.x >= 0 && e.x < leng);
    coor = coor.filter(e => e.y >= 0 && e.y < leng);
    return coor;
}

export function moveItems(arra, firstCoor, secondCoor) {

    const temp = arra[firstCoor.x][firstCoor.y];
    arra[firstCoor.x][firstCoor.y] = arra[secondCoor.x][secondCoor.y];
    arra[secondCoor.x][secondCoor.y] = temp;
}