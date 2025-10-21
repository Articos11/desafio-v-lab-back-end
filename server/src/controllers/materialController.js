import { createMaterial, findMaterialById, findMaterials } from "../models/Material.js";

export const registerMaterial = async (req, res) =>{
    try {
        // Recebemos os dados do material e checamos se eles são válidos.
        const {title, description, status, author_id, material_type} = req.body;
        const user_id = req.userId;

        // Como a descrição é opcional, ela não é cobrada nesse if.
        if(!title || !status || !author_id || !material_type) return res.status(400).json({message: "Todos os campos são obrigatórios."})
        
        const validStatus = ["rascunho", "publicado", "arquivado"];
        if(!validStatus.includes(status)) return res.status(400).json({message: "Status inválido."});
        
        // Criação da ID do material.
        const materialId = await createMaterial({title, description, status, author_id, user_id, material_type});

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