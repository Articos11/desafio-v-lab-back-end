import { createMaterial, findMaterialById, findMaterials, updateMaterialById, deleteMaterialById } from "../models/Material.js";
import { findAuthorById } from "../models/Author.js";
import { createBook } from "../models/Book.js";
import { createVideo } from "../models/Video.js";
import { createArticle } from "../models/Article.js";
import connection  from "../config/database.js";

export const registerMaterial = async (req, res) =>{
    try {
        // Recebemos os dados do material e checamos se eles são válidos.
        const {title, description, status, author_id, material_type, extra} = req.body;
        const user_id = req.userId;

        // Como a descrição é opcional, ela não é cobrada nesse if.
        if(!title || !status || !author_id || !material_type) return res.status(400).json({message: "Todos os campos são obrigatórios."})
        
        const validStatus = ["rascunho", "publicado", "arquivado"];
        if(!validStatus.includes(status)) return res.status(400).json({message: "Status inválido."});
        
        // Criação da ID do material.
        const materialId = await createMaterial({title, description, status, author_id, user_id, material_type});

        // Inserindo o material em seu respectivo banco de dados.
        // Checamos se o material (livro, artigo ou video)foi devidamente enviado e o registramos na sua própria tabela.
        let extraId = null;
        try {
            if (material_type === "book") {
                const {isbn, pages} = extra || {};
                extraId = await createBook(materialId, isbn, pages);
            } else if (material_type === "article"){
                const {doi} = extra || {};
                extraId = await createArticle(materialId, doi);
            } else if (material_type === "video") {
                const {duration_minutes} = extra || {};
                extraId = await createVideo(materialId, duration_minutes);
            }
        } catch (error) {
            console.error("erro de validação: ", error);
            return res.status(400).json({message: error});
        }

        res.status(201).json({message: "Material cadastrado com sucesso.", materialId});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao cadastrar material"});
    }
};

// Encontrando o material por ID
export const getMaterialById = async (req, res) => {
    try {
        const {id} = req.params; 
        const material = await findMaterialById(id);

        if(!material) return res.status(404).json({message: "Material não encontrado"});

        res.json(material);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao buscar por material"})
    }
}

// Atualizando o material.
export const updateMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, author_id} = req.body;
        const user_id = req.userId;

        // Checando se o material existe 
        const material = await findMaterialById(id);
        if(!material) return res.status(404).json({message: "Material não encontrado"});

        // Impede outro usuário de alterar os materiais.
        if (material.user_id !== user_id) return res.status(403).json({message: "Apenas o criador pode alterar este material."})

        // Campos obrigatórios
        if (!title && !description && !status && !author_id) return res.status(400).json({message: "Nenhum campo válido para atualização"})

        // Verifica se o autor existe. 
        if (author_id){
            const authorExists = await findAuthorById(author_id);
            if(!authorExists)  return res.status(400).json({message: "Autor informado não existe"});
        }

        // Validação de status
        const validStatus = ["rascunho", "publicado", "arquivado"];
        if (status && !validStatus.includes(status)) return res.status(400).json({message: "Status inválido"});

        const updated = await updateMaterialById(id, {title, description, status, author_id});

        if (!updated) return res.status(500).json({message: "Erro ao atualizar material."});

        res.json({message: "Material atualizado com sucesso."});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro interno ao atualizar material."})
    }
}

// Deletando o material. 
export const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.userId;

        // O material existe?
        const material = await findMaterialById(id);
        if(!material) return res.status(404).json({message: "O material não existe"});

        // Só o usuário criador pode deletar suas criações.
        if (material.user_id !== user_id) return res.status(403).json({message: "Apenas o criador pode deletar esse material."});

        // Atualizando os respectivos bancos de dados (book, article e videos)
        await connection.beginTransaction();
        if (material.material_type === "book") {
            await connection.query("DELETE FROM books WHERE id = ?", [id]);
        } else if (material.material_type === "article") {
            await connection.query("DELETE FROM articles WHERE id = ?", [id]);
        } else if (material.material_type === "video") {
            await connection.query("DELETE FROM videos WHERE id = ?", [id]);
        } else {
            await connection.rollback();
            return res.status(400).json({ message: "Tipo de material inválido." });
        }

        // Deleta o material.
        const deleted = await deleteMaterialById(id);

        if(!deleted) return res.status(500).json({message: "Erro ao excluir material"});

        res.json({message: "Material excluído com sucesso."});

    } catch (error) {
        console.error(error);
        await connection.rollback();
        res.stats(500).json({message: "Erro interno ao excluir material"});
    }
}

export const listMaterials = async(req, res) => {
    try {
        // Procuramos os livros por título, id do autor, descrição, páginas (de armazenamento) e limite de páginas (de armazenamento);
        const {title, author_id, description, page, limit} = req.query;
        const filters = {title, author_id, description};
        const materials = await findMaterials(filters, Number(page) || 1, Number(limit) || 10);
        res.json(materials);


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao listar materiais."});
    }
};