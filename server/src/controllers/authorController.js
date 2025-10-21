import { createAuthor, findAuthorById, getAllAuthors } from "../models/Author.js";

// Registrando um autor no banco. 
export const registerAuthor = async (req, res) => {
    try {
        // Recebendo os dados do autor.
        const {name, author_type, birth_date, city} = req.body;
        if (!name || !author_type || !birth_date || !city) return res.status(400).json({message: "Há campos em branco"});

        // Checamos se o tipo de autor é válido
        const validTypes = ["person", "institution"];
        if(!validTypes.includes(author_type)) return res.status(400).json({message: "Tipo do autor inválido"});

        const authorId = await createAuthor({name, author_type, birth_date, city});
        res.status(201).json({message: "Autor cadastrado com sucesso.", authorId});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao cadastrar autor."});
    }
};

// Buscando o autor pelo Id.
export const getAuthorById = async(req, res) =>{
    try {
        const {id} = req.params;
        const author = await findAuthorById(id);

        if (!author) return res.status(404).json({message: "autor inexistente"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Erro ao buscar autor."})
    }
};

// Listando todos os autores.
export const listAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        res.json(authors);
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Erro ao listar os autores."});
    }
}