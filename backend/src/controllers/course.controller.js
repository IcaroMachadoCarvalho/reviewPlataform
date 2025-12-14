import { Course } from "../models/index.js";
import { CourseService } from "../services/index.js";
class CourseController {
  static async createCourse(req, res) {
    try {
      const data = await CourseService.postCourse({
        ...req.body,
        createdBy: req.user.id,
      });
      res.status(201).json({
        sucess: true,
        message: "Curso/Evento/Produto criado com sucesso!",
        data: data,
      });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      res.status(500).json({
        sucess: false,
        data: null,
        errors: "Internal Server Error",
      });
    }
  }

  static async getCourses(req, res) {
    try {
      // GET /courses?page=1&limit=10&title=JavaScript&category=Programação
      /*
      Localização	Uso Comum	Exemplo	Exemplo de Acesso
        req.body	Enviado no corpo da requisição (POST/PUT/PATCH)	Enviar dados complexos (JSON, formulário)	req.body.name, req.body.email
        req.query	Passado na query string da URL (GET)	Filtros, buscas, paginação	req.query.page, req.query.category
        req.params	Definido nas rotas da URL (GET/POST/PUT/DELETE)	Identificar recursos (IDs)	req.params.id, req.params.name
      */
      let { title, category, page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const skip = (page - 1) * limit;

      const data = await CourseService.filterCourse(
        title,
        category,
        skip,
        limit
      );

      const totalDocuments = await Course.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      return res.status(200).json({
        sucess: true,
        message: "Busca de Cursos/Produtos/Eventos realizada com sucesso!",
        data: data,
        totalDocuments: totalDocuments,
        totalPages: totalPages,
      });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      res.status(500).json({
        sucess: false,
        data: null,
        errors: "Internal Server Error",
      });
    }
  }

  static async getCourseById(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const data = await CourseService.findById(id);
        return res.status(200).json({
          sucess: true,
          message:
            "Busca de Curso/Produto/Evento por id realizada com sucesso!",
          data: data,
        });
      }
      res.status(400).json({
        // ver se faz sentido
        sucess: false,
        data: null,
        error: "Internal Server Error",
      });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      res.status(500).json({
        sucess: false,
        data: null,
        errors: "Internal Server Error",
      });
    }
  }

  static async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { title, description, category, imageUrl } = req.body;

      const updatedCourse = await CourseService.patchCourse(
        id,
        title,
        description,
        category,
        imageUrl
      );

      res.status(200).json({
        sucess: true,
        message: "Curso/Produto/Evento atualizada com sucesso",
        data: updatedCourse,
      });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      res.status(500).json({
        sucess: false,
        data: null,
        errors: "Internal Server Error",
      });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      await CourseService.removeCourse(id);
      // await Course.findByIdAndDelete(id);
      res.status(200).json({
        sucess: true,
        data: null,
        message: "Curso Apagado com sucesso!",
      });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      res.status(500).json({
        sucess: false,
        data: null,
        errors: "Internal Server Error",
      });
    }
  }
}

export default CourseController;
