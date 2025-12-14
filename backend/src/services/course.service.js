import { CourseRepository } from "../repository/index.js";

export class CourseService {
  static async postCourse(newCourse) {
    if (!newCourse) {
      throw new Error("Dados do curso inválidos");
    }
    return CourseRepository.create(newCourse);
    // return createCourse(newCourse);
  }

  static async filterCourse(title, category, skip, limit) {
    let filter = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Filtro para o título (case insensitive)
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Filtro exato para categoria
    }

    return CourseRepository.getCourses(filter, skip, limit);
    // return getCourses(filter, skip, limit);
  }

  static async findById(id) {
    return CourseRepository.getCourseById(id);
    // return getCourseById(id);
  }

  static async patchCourse(id, title, description, category, imageUrl) {
    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (category) updatedFields.category = category;
    if (imageUrl) updatedFields.imageUrl = imageUrl;

    if (Object.keys(updatedFields).length === 0) {
      throw new Error("Nenhum campo para atualizar foi enviado");
    }

    CourseRepository.update(id, updatedFields);
  }

  static async removeCourse(id) {
    return CourseRepository.delete(id);
    // return deleteCourse(id);
  }
}

export default CourseService;
