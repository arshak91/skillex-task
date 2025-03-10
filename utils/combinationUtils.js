
export const generateCombinations = async (itemList, length) => {

  async function backtrack(start, path) {
    if (path.length === length) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < itemList.length; i++) {
      if (!path.some(item => item[0] === itemList[i][0])) {
        path.push(itemList[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    }
  }
  const result = [];
  await backtrack(0, []);
  return result;
}