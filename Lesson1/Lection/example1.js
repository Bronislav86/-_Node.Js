const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sum = numArray.reduce((a,b) => a += b, 0);
console.log(`Результаты сложения числе массива: ${sum}`);