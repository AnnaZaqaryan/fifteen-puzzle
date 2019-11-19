import GameFrame from "../component/GameFrame";


export function getIndexOfElement(array, element) {
    
    const length = array.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (array[i][j] == element) {
                return {
                    x: i,
                    y: j
                };
            }
        }
    }
}

export function getSiblings(array, x, y) {
    const leng = array.length;
    let siblings = [{ x: x, y: y + 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x - 1, y: y }];
    siblings = siblings.filter(e => e.x >= 0 && e.x < leng);
    siblings = siblings.filter(e => e.y >= 0 && e.y < leng);
    return siblings;
}

export function moveItems(arra, firstCoor, secondCoor) {

    const temp = arra[firstCoor.x][firstCoor.y];
    arra[firstCoor.x][firstCoor.y] = arra[secondCoor.x][secondCoor.y];
    arra[secondCoor.x][secondCoor.y] = temp;
}