const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");

class AlunoService{

    async findMany(page, pageSize, orderBy, order){
        const alunos = await prisma.aluno.findMany({
            skip: (page-1)*pageSize,
            take: Number(pageSize),
            orderBy: {
                [orderBy]: order
            }
        });

        const total = await prisma.aluno.count();

        return { alunos, total };
    }

    async findUnique(id){
        const aluno = await prisma.aluno.findUnique({
            where: { id }
        });

        if(!aluno){
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }

    async update(id, dados){
        const {nome, email} = dados;
        if(!nome && !email){
            throw new AlunoInvalidoError("Informe nome e/ou email para atualizar");
        }

        try{
            const alunoAtualizado = await prisma.aluno.update({
                where: { id },
                data: dados
            });
            return alunoAtualizado;
        }catch(error){
            
            if(error.code === "P2025"){
                throw new AlunoNaoEncontradoError();
            }
            
            if(error.code === "P2002"){
                throw new AlunoInvalidoError("Esse email já está sendo usado por outro aluno");
            }
            throw error;
        }
    }

    async delete(id){
        try{
            await prisma.aluno.delete({ where: { id } });
        }catch(error){
            
            if(error.code === "P2025"){
                throw new AlunoNaoEncontradoError();
            }
            throw error;
        }
    }

    async create(aluno){
        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }

        const novoAluno = await prisma.aluno.create({data: aluno});

        return novoAluno;
    }
}

module.exports = new AlunoService();