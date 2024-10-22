import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    _id: string;
    name: string;
    description: string;
}

export const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<Category>({
        _id: '',
        name: '',
        description: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({ name: false, description: false });

    useEffect(() => {
        fetch('http://localhost:8000/categories')
            .then((response) => response.json())
            .then((data: { data: Category[] }) => setCategories(data.data))
            .catch((error) =>
                console.error('Error fetching categories:', error)
            );
    }, []);

    const handleSubmitCategory = () => {
        if (!newCategory.name || !newCategory.description) {
            setErrors({
                name: !newCategory.name,
                description: !newCategory.description,
            });
            return;
        }

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing
            ? `http://localhost:8000/categories/${newCategory._id}`
            : 'http://localhost:8000/categories';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory),
        })
            .then((response) => response.json())
            .then((data) => {
                if (isEditing) {
                    setCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                            cat._id === newCategory._id ? data.data : cat
                        )
                    );
                } else {
                    setCategories([...categories, data.data]);
                }
                setNewCategory({ _id: '', name: '', description: '' });
                setIsModalOpen(false);
                setIsEditing(false);
            })
            .catch((error) =>
                console.error(
                    `Error ${isEditing ? 'editing' : 'adding'} category:`,
                    error
                )
            );
    };

    const handleEdit = (category: Category) => {
        setNewCategory(category);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        fetch(`http://localhost:8000/categories/${id}`, {
            method: 'DELETE',
        })
            .then(() =>
                setCategories(
                    categories.filter((category) => category._id !== id)
                )
            )
            .catch((error) => console.error('Error deleting category:', error));
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                setNewCategory({
                                    _id: '',
                                    name: '',
                                    description: '',
                                });
                                setIsEditing(false);
                                setErrors({ name: false, description: false });
                            }}
                        >
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditing ? 'Edit Category' : 'Add Category'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newCategory.name}
                                    onChange={(e) => {
                                        setNewCategory({
                                            ...newCategory,
                                            name: e.target.value,
                                        });
                                        setErrors({ ...errors, name: false });
                                    }}
                                    placeholder="Category name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        Name is required
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={newCategory.description}
                                    onChange={(e) => {
                                        setNewCategory({
                                            ...newCategory,
                                            description: e.target.value,
                                        });
                                        setErrors({
                                            ...errors,
                                            description: false,
                                        });
                                    }}
                                    placeholder="Category description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm">
                                        Description is required
                                    </p>
                                )}
                            </div>
                            <Button onClick={handleSubmitCategory}>
                                {isEditing ? 'Update Category' : 'Add Category'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell className="flex justify-start items-center gap-3">
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleEdit(category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(category._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>
                                No categories found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
