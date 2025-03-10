import pool from "../db.js";

export const insertAndSaveResponse = async (combinations, itemNames) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const itemName = itemNames.join(',');

    // Insert items
    const [itemsResult] = await connection.execute(
      `INSERT INTO combinations_db.items (item_name) VALUES (?)`,
      [itemName]
    );
    const itemId = itemsResult.insertId;

    // Insert combinations
    const [combinationResult] = await connection.execute(
      `INSERT INTO combinations_db.combinations (combination, itemId) VALUES (?, ?)`,
      [JSON.stringify(combinations), itemId]
    );
    const combinationId = combinationResult.insertId;

    // Save response
    const responseData = { id: combinationId, combination: combinations };
    await connection.execute(
      `INSERT INTO combinations_db.responses (response) VALUES (?)`,
      [JSON.stringify(responseData)]
    );

    await connection.commit();
    return combinationId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export const getCombinations = async (itemNames) => {
  const item = await pool.query(
    `SELECT * FROM combinations_db.items WHERE item_name = '${itemNames.join(',')}';`
  );
  if (item[0][0]) {
    const combination = await pool.query(
      `SELECT id, combination FROM combinations_db.combinations WHERE itemId = '${item[0][0].id}';`
    );
    return combination[0][0]
  }
  return false;
}
