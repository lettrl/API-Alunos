const alunoService = require("../services/AlunoService");

class AlunoController{
    
    async findMany(request, response){
        let {page, pageSize, orderBy, order} = request.query;
        page ||= 1;
        pageSize ||= 10;
        orderBy ||= "id";

        if(order !== "asc" && order !== "desc"){
            order = "asc";
        }

        const {alunos, total} = await alunoService.findMany(page, pageSize, orderBy, order);
        return response.status(200).json({alunos, total});
    }

    async findUnique(request, response){
        try{
            const id = Number(request.params.id);
            const aluno = await alunoService.findUnique(id);
            return response.status(200).json({aluno});
        }catch(error){
            return response.status(error.statusCode || 500).json({error: error.message});
        }
    }

    async update(request, response){
        try{
            const id = Number(request.params.id);
            const aluno = await alunoService.update(id, request.body);
            return response.status(200).json({aluno});
        }catch(error){
            return response.status(error.statusCode || 500).json({error: error.message});
        }
    }

    async create(request, response){
        try{
            const aluno = await alunoService.create(request.body);
            return response.status(201).json({aluno});
        }catch(error){
            return response.status(400).json({error: error.message});
        }
    }

}

module.exports = new AlunoController();