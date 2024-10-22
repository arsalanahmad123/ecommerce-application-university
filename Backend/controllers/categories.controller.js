const Category = require('../models/categories.model');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Create and save the new category
        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating category',
            error: error.message,
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching categories',
            error: error.message,
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        res.status(200).json({
            message: 'Category retrieved successfully',
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching category',
            error: error.message,
        });
    }
};

exports.updateCategoryById = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Find the category and update it
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating category',
            error: error.message,
        });
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        res.status(200).json({
            message: 'Category deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting category',
            error: error.message,
        });
    }
};
