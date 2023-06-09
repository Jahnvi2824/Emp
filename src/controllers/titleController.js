// const { getManager } = require("typeorm");
// const Title = require("../models/Title");

// // Title controller methods
// // Have to Implement  title-related operations here

const Title = require("../models/Title");
const AppDataSource = require("../../connection1");

// Get all titles
const getAllTitles = async (req, res) => {
  try {
    const titleRepository = AppDataSource.getRepository(Title);
    const titles = await titleRepository.find();
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get title by emp_no
const getTitleByEmpNo = async (req, res) => {
  try {
    const { empNo } = req.params;
    const titleRepository = AppDataSource.getRepository(Title);
    const title = await titleRepository.findOne(empNo);

    if (title) {
      res.json(title);
    } else {
      res.status(404).json({ error: "Title not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new title
const createTitle = async (req, res) => {
  try {
    const { empNo, title, fromDate, toDate } = req.body;

    const titleRepository = AppDataSource.getRepository(Title);

    // Check if title for the same empNo already exists
    const existingTitle = await titleRepository.findOne(empNo);
    if (existingTitle) {
      return res
        .status(400)
        .json({ error: "Title for the same empNo already exists" });
    }

    const newTitle = titleRepository.create({
      emp_no: empNo,
      title: title,
      from_date: fromDate,
      to_date: toDate,
    });

    await titleRepository.save(newTitle);
    res.status(201).json({ message: "Title created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing title
const updateTitle = async (req, res) => {
  try {
    const { empNo } = req.params;
    const { Title, fromDate, toDate } = req.body;

    const titleRepository = AppDataSource.getRepository(Title);
    const title = await titleRepository.findOne(empNo);

    if (title) {
      title.title = title;
      title.from_date = fromDate;
      title.to_date = toDate;

      await titleRepository.save(title);
      res.json({ message: "Title updated successfully" });
    } else {
      res.status(404).json({ error: "Title not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a title
const deleteTitle = async (req, res) => {
  try {
    const { empNo } = req.params;

    const titleRepository = AppDataSource.getRepository(Title);
    const title = await titleRepository.findOne(empNo);

    if (title) {
      await titleRepository.remove(title);
      res.json({ message: "Title deleted successfully" });
    } else {
      res.status(404).json({ error: "Title not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTitles,
  getTitleByEmpNo,
  createTitle,
  updateTitle,
  deleteTitle,
};
