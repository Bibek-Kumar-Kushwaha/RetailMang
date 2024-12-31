import categoryModel from "../Models/category.model.js";
import Handler from "../Utils/handler.js";

// Add Category
const categoryAddController = async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        if (!categoryName || !description) {
            400,
                "Provide CategoryName and Description",
                true,
                false,
                res
        }

        const existingCategory = await categoryModel.findOne({ categoryName });

        if (existingCategory) {
            return Handler(
                400,
                "You have already Added this Category",
                true,
                false,
                res
            )
        }

        const newCategory = await categoryModel.create({
            categoryName,
            description
        })

        return Handler(
            200,
            "New Category Added",
            false,
            true,
            res,
            {
                newCategory
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || message,
            true,
            false,
            res
        )
    }
}

// Update Category
const categoryUpdateController = async (req, res) => {
    try {
        const { id } = req.params;

        const { categoryName, description } = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                ...(categoryName && { categoryName }),
                ...(description && { description })
            },
            { new: true }
        );

        if (!updateCategory) {
            return Handler(
                400,
                "Product Not Found",
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            "Updated Successfully",
            false,
            true,
            res,
            {
                updateCategory
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
}

// Get All Category
const getAllCategoryController = async (req, res) => {
    try {

        const allCategory = await categoryModel.find({});

        return Handler(
            200,
            "All Category Fetched : ",
            false,
            true,
            res,
            {
                allCategory
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }

}

// Delete Category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id);

        if (!deleteCategory) {
            return Handler(
                400,
                'Category Not Found',
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            'Category Found',
            false,
            true,
            res
        )
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
};

export {
    categoryAddController,
    categoryUpdateController,
    getAllCategoryController,
    deleteCategoryController
};