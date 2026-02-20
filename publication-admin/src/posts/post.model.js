import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const postSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    title: {
      type: String,
      required: [true, "El título de la publicación es obligatorio"],
      trim: true,
      maxLength: [150, "El título no puede exceder 150 caracteres"],
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: {
        values: ["TECNOLOGIA", "SALUD", "DEPORTES", "OTROS"],
        message: "La categoría no es válida",
      },
    },
    text: {
      type: String,
      required: [true, "El contenido de la publicación es obligatorio"],
      trim: true,
      minLength: [5, "El contenido debe tener al menos 5 caracteres"],
    },
    authorId: {
      type: String,
      required: [true, "El autor es obligatorio"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índices para búsquedas rápidas
postSchema.index({ isActive: 1 });
postSchema.index({ category: 1 });
postSchema.index({ authorId: 1, isActive: 1 });

export default model("Post", postSchema);