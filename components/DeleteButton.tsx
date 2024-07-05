import { useRouter } from 'next/router';

interface Article {
    id: string;
}

const deleteArticle = async (id: string) => {
    try {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Article deleted successfully');
            return true;
        } else {
            alert('Failed to delete article');
            return false;
        }
    } catch (error) {
        console.error('Error deleting article:', error);
        alert('Error deleting article');
        return false;
    }
};

const DeleteButton = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const isDeleted = await deleteArticle(id);
        if (isDeleted) {
            router.push('/blog'); // Rediriger vers /blog après la suppression
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Article
        </button>
    );
};

export default DeleteButton;