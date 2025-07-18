import { categoriaController } from "../views/categories/categoriasController";
import crearController from "../views/categories/create/crearController.js";
import editarController from "../views/categories/edit/editarController.js";
import { homeController } from "../views/home/homeController";
import { loginController } from "../views/login/loginController.js";
import { productController } from "../views/products/productController.js";
import { registroController } from "../views/registro/registroController.js";

export const routers = {
  inicio: {
    path: "home/index.html",
    controller: homeController,
    private: false,
  },
  categorias: {
    "/": {
      path: "categories/index.html",
      controller: categoriaController,
      private: false,
    },
    crear: {
      path: "categories/create/index.html",
      controller: crearController,
      private: false,
    },
    editar: {
      path: "categories/edit/index.html",
      controller: editarController,
      private: false,
    },
  },
  productos: {
    path: "products/index.html",
    controller: productController,
    private: false,
  },
  login: {
    path: "login/index.html",
    controller: loginController,
    private: false,
  },
  registro: {
    path: "registro/index.html",
    controller: registroController,
    private: false,
  },
};
