import { CourseRepository } from "../repository/index.js";

export class CourseService {
  static async postCourse(newCourse) {
    return CourseRepository.create(newCourse);
  }

  static async filterCourse(title, category, skip, limit, rating) {
    let filters = [];

    if (title) {
      filters.push({
        $match: {
          title: { $regex: title, $options: "i" },
        },
      });
    }
    if (category) {
      filters.push({
        $match: {
          category: { $regex: category, $options: "i" },
        },
      });
    }

    const queryGetCourses = [
      ...filters, // Copia filtros
      {
        $lookup: {
          // É basicamente um join
          from: "reviews", // pega da coleção reviews
          localField: "_id", // Compara com id
          foreignField: "courseId",
          as: "reviews", // Retorna uma lista de tudo *
        },
      },

      {
        $project: {
          // Define que dados vão retornar e diferente do $group retona uma lista não um
          title: 1, // 1 significa que vai trazer
          category: 1,
          averageRating: { $avg: "$reviews.rating" }, // Pega da lista "as" do reviews do lookup *
          totalReviews: { $size: "$reviews" },
        },
      },
    ];

    if (rating) {
      queryGetCourses.push({
        $match: { averageRating: { $gte: rating } },
      });
    }

    queryGetCourses.push({ $skip: parseInt(skip) }, { $limit: limit });

    return CourseRepository.getCourses(queryGetCourses);
  }

  static async listCourseRanking() {
    const queryCoursesRanking = [
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "courseId",
          as: "reviews",
        },
      },
      {
        $project: {
          title: 1,
          category: 1,
          averageRating: { $avg: "$reviews.rating" },
          totalReviews: { $size: "$reviews" },
        },
      },
      {
        $sort: {
          averageRating: -1, // Seria DESC Maior para menor
          totalReviews: -1, // ASC seria 1
        },
      },
      {
        $limit: 10,
      },
    ];

    return CourseRepository.getCourses(queryCoursesRanking);
  }

  static async findById(id) {
    return CourseRepository.getCourseById(id);
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
  }
}

export default CourseService;
