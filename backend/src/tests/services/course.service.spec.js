import { jest, describe, it, expect, afterEach } from "@jest/globals";

await jest.unstable_mockModule("../../repository/course.repository.js", () => ({
  CourseRepository: {
    create: jest.fn(),
    findByTitle: jest.fn(),
    getCourses: jest.fn(),
    getCourseById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const { CourseService } = await import("../../services/course.service.js");
const { CourseRepository } =
  await import("../../repository/course.repository.js");
import BaseError from "../../errors/baseError.js";

afterEach(() => {
  jest.resetAllMocks();
});

describe("CourseService.postCourse", () => {
  it("Deve chamar método postCourse", async () => {
    const createCourseMock = {
      title: "teste",
      description: "teste",
      category: "teste",
      imageUrl: "fake-url",
      createdBy: "fake-id",
    };

    CourseRepository.create.mockResolvedValue();
    CourseRepository.findByTitle.mockResolvedValue(null);
    await CourseService.postCourse(createCourseMock);
    expect(CourseRepository.create).toHaveBeenCalledWith(createCourseMock);
    expect(CourseRepository.create).toHaveBeenCalledTimes(1);
    expect(CourseRepository.findByTitle).toHaveBeenCalledWith(
      createCourseMock.title,
    );
    expect(CourseRepository.findByTitle).toHaveBeenCalledTimes(1);
  });

  it("Deve lançar erro no se encontrar curso com o título em uso", async () => {
    const createCourseMock = {
      title: "teste",
      description: "teste",
      category: "teste",
      imageUrl: "fake-url",
      createdBy: "fake-id",
    };

    CourseRepository.create.mockResolvedValue();
    CourseRepository.findByTitle.mockResolvedValue({
      _id: "fake-id",
      title: "fake-title",
    });
    await expect(
      CourseService.postCourse(createCourseMock),
    ).rejects.toThrowError(
      new BaseError("Curso com este título já existe", 400),
    );
    expect(CourseRepository.create).not.toHaveBeenCalled();
    expect(CourseRepository.findByTitle).toHaveBeenCalledWith(
      createCourseMock.title,
    );
  });
});

describe("CourseService.filterCourse", () => {
  it("Deve chamar método filterCourse e passar filtros corretos", async () => {
    const filterCourseDataMock = {
      title: "teste",
      category: "teste",
      skip: 0,
      limit: 10,
      rating: 4,
    };

    const getCoursesSpy = jest
      .spyOn(CourseRepository, "getCourses")
      .mockResolvedValue([{}]);

    await CourseService.filterCourse(
      filterCourseDataMock.title,
      filterCourseDataMock.category,
      filterCourseDataMock.skip,
      filterCourseDataMock.limit,
      filterCourseDataMock.rating,
    );

    const pipeline = getCoursesSpy.mock.calls[0][0];
    expect(pipeline).toEqual(
      expect.arrayContaining([
        { $match: { title: { $regex: "teste", $options: "i" } } },
        { $match: { category: { $regex: "teste", $options: "i" } } },
        { $lookup: expect.any(Object) },
        { $project: expect.any(Object) },
        { $match: { averageRating: { $gte: 4 } } },
        { $skip: 0 },
        { $limit: 10 },
      ]),
    );
    expect(getCoursesSpy).toHaveBeenCalledTimes(1);
  });

  it("Deve chamar método filterCourse e passar sem filtros", async () => {
    const filterCourseDataMock = {
      skip: 0,
      limit: 10,
    }; // Valores padrão que vem do controller via  ||

    const getCoursesSpy = jest
      .spyOn(CourseRepository, "getCourses")
      .mockResolvedValue([{}]);

    await CourseService.filterCourse(
      null,
      null,
      filterCourseDataMock.skip,
      filterCourseDataMock.limit,
      null,
    );

    const pipeline = getCoursesSpy.mock.calls[0][0];
    expect(pipeline).toEqual(
      expect.arrayContaining([
        { $lookup: expect.any(Object) },
        { $project: expect.any(Object) },
        { $skip: 0 },
        { $limit: 10 },
      ]),
    );
    expect(getCoursesSpy).toHaveBeenCalledTimes(1);
  });
});

describe("CourseService.listCourseRanking", () => {
  it("Deve chamar método e passar", async () => {
    const getCoursesSpy = jest
      .spyOn(CourseRepository, "getCourses")
      .mockResolvedValue([{}]);
    await CourseService.listCourseRanking();
    expect(getCoursesSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
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
      ]),
    );
    expect(getCoursesSpy).toHaveBeenCalledTimes(1);
  });
});

describe("CourseService.findById", () => {
  it("Deve localizar id", async () => {
    const courseIdMock = "fake-id";
    CourseRepository.getCourseById.mockResolvedValue({});
    await CourseService.findById(courseIdMock);
    expect(CourseRepository.getCourseById).toBeCalledWith(courseIdMock);
    expect(CourseRepository.getCourseById).toBeCalledTimes(1);
  });

  it("Deve lançar erro se não encontrar id do curso", async () => {
    const courseIdMock = "fake-id";
    CourseRepository.getCourseById.mockResolvedValue(null);
    await expect(CourseService.findById(courseIdMock)).rejects.toThrowError(
      new BaseError("Curso não encontrado", 404),
    );
  });
});

describe("CourseService.patchCourse", () => {
  it("Deve atualizar os dados do curso com todos os campos", async () => {
    const userIdMock = "fake-id";
    const updatedFieldsMock = {
      title: "teste",
      description: "teste",
      category: "teste",
      imageUrl: "fake-url",
    };
    CourseRepository.findByTitle.mockResolvedValue(null);
    CourseRepository.getCourseById.mockResolvedValue({});
    await CourseService.patchCourse(
      userIdMock,
      updatedFieldsMock.title,
      updatedFieldsMock.description,
      updatedFieldsMock.category,
      updatedFieldsMock.imageUrl,
    );
    expect(CourseRepository.update).toHaveBeenCalledWith(
      userIdMock,
      updatedFieldsMock,
    );
    expect(CourseRepository.getCourseById).toHaveBeenCalledTimes(1);
  });

  it("Deve lançar erro se o título já estiver em uso", async () => {
    const userIdMock = "fake-id";
    const updatedFieldsMock = {
      title: "teste",
      description: "teste",
      category: "teste",
      imageUrl: "fake-url",
    };

    CourseRepository.findByTitle.mockResolvedValue({
      _id: "outro-id",
      title: "teste",
    });

    await expect(
      CourseService.patchCourse(
        userIdMock,
        updatedFieldsMock.title,
        updatedFieldsMock.description,
        updatedFieldsMock.category,
        updatedFieldsMock.imageUrl,
      ),
    ).rejects.toThrowError(
      new BaseError("Título já está em uso em outro curso", 404),
    );

    expect(CourseRepository.update).not.toHaveBeenCalled();
  });

  it("Deve lançar erro se não tiver nenhum campo para atualizar", async () => {
    const userIdMock = "fake-id";

    CourseRepository.findByTitle.mockResolvedValue(null);

    await expect(
      CourseService.patchCourse(userIdMock, null, null, null, null),
    ).rejects.toThrowError(
      new BaseError("Nenhum campo para atualizar foi enviado", 404),
    );

    expect(CourseRepository.update).not.toHaveBeenCalled();
  });

  it("Deve lançar erro se não encontrar curso", async () => {
    const userIdMock = "fake-id";
    const updatedFieldsMock = {
      title: "teste",
      description: "teste",
      category: "teste",
      imageUrl: "fake-url",
    };

    CourseRepository.findByTitle.mockResolvedValue(null);
    CourseRepository.getCourseById.mockResolvedValue(null);

    await expect(
      CourseService.patchCourse(
        userIdMock,
        updatedFieldsMock.title,
        updatedFieldsMock.description,
        updatedFieldsMock.category,
        updatedFieldsMock.imageUrl,
      ),
    ).rejects.toThrowError(new BaseError("Curso não encontrado", 404));

    expect(CourseRepository.update).not.toHaveBeenCalled();
  });
});

describe("CourseService.removeCourse", () => {
  it("Deve localizar curso pelo id e remover curso", async () => {
    const courseIdMock = "fake-id";

    CourseRepository.getCourseById.mockResolvedValue({});
    CourseRepository.delete.mockResolvedValue({});
    await CourseService.removeCourse(courseIdMock);

    expect(CourseRepository.delete).toBeCalledWith(courseIdMock);
    expect(CourseRepository.delete).toBeCalledTimes(1);
  });

  it("Deve lançar erro se não encontrar curso", async () => {
    const courseIdMock = "fake-id";

    CourseRepository.getCourseById.mockResolvedValue(null);

    await expect(CourseService.removeCourse(courseIdMock)).rejects.toThrowError(
      new BaseError("Curso não encontrado", 404),
    );

    expect(CourseRepository.delete).not.toHaveBeenCalled();
  });
});
