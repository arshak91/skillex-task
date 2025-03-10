import { insertAndSaveResponse, getCombinations } from '../models/combinationModel.js'
import { generateCombinations } from '../utils/combinationUtils.js'

export const generate = async (req, res) => {
    const { items, length } = req.body;

    if (!Array.isArray(items) || isNaN(Number(length)) || typeof Number(length) !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const itemNames = items.flatMap((prefix, index) => {
      return Array.from({ length: prefix }, (_, i) => `${String.fromCharCode(65 + index)}${i + 1}`);
    });
    const combinations = await getCombinations(itemNames);
    if (combinations) {
      res.json(combinations);
      return
    }
    const genCombinations = await generateCombinations(itemNames, +length);

    try {
      const id = await insertAndSaveResponse(genCombinations, itemNames);
      res.json({ id, combination: genCombinations });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
}