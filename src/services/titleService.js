// const { getManager } = require("typeorm");
// const Title = require("../models/Title");

// // Title service methods
// // Have to Implement title-related business logic here

const { getManager } = require("typeorm");
const Title = require("../models/Title");

// Get all titles
const getAllTitles = async () => {
  const entityManager = getManager();
  const titles = await entityManager.find(Title);
  return titles;
};

// Get title by employee number
const getTitleByEmpNo = async (empNo) => {
  const entityManager = getManager();
  const title = await entityManager.findOne(Title, { emp_no: empNo });
  return title;
};

// Create a new title
const createTitle = async (titleData) => {
  const entityManager = getManager();
  const title = entityManager.create(Title, titleData);
  await entityManager.save(title);
  return title;
};

// Update a title
const updateTitle = async (empNo, titleData) => {
  const entityManager = getManager();
  const title = await entityManager.findOne(Title, { emp_no: empNo });
  if (!title) {
    throw new Error("Title not found");
  }
  entityManager.merge(Title, title, titleData);
  await entityManager.save(title);
  return title;
};

// Delete a title
const deleteTitle = async (empNo) => {
  const entityManager = getManager();
  const title = await entityManager.findOne(Title, { emp_no: empNo });
  if (!title) {
    throw new Error("Title not found");
  }
  await entityManager.remove(title);
};

module.exports = {
  getAllTitles,
  getTitleByEmpNo,
  createTitle,
  updateTitle,
  deleteTitle,
};
