import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const gradeModels = db.grade;

//feito
const create = async (req, res) => {
  try {
    const item = new gradeModels({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
    });

    const data = await item.save(item);

    res.status(200).send(data);
    logger.info(`POST /grade - ${JSON.stringify(data)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};
//feito
const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grade = await db.grade.find(condition);
    res.status(200).send(grade);

    res.send();
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const getAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grade = await db.grade.find();
    res.status(200).send(grade);

    res.send();
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const getAll2 = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grade = await db.grade.find();
    res.status(200).send(grade);

    res.send();
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

//Feito
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.grade.findById({ _id: id });

    res.send(data);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

//feito
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const id = req.params.id;

  const data = await gradeModels.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.send(data);

  try {
    res.send({ message: "Grade atualizado com sucesso" });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

//Feito
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.grade.findByIdAndDelete(id);
    //const data = db.grade.findById({ _id: id });

    res.send({ message: "Grade excluido com sucesso" });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

//Feito
const removeAll = async (req, res) => {
  try {
    const data = await db.grade.deleteMany();

    res.send({ message: "Grade excluido com sucesso" });

    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default {
  create,
  findAll,
  getAll,
  findOne,
  update,
  remove,
  removeAll,
};
