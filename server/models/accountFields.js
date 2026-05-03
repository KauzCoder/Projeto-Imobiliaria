const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createAccountFields(role) {
  return {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailPattern, "Email invalido."],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    document: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: [role],
      default: role,
      immutable: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  };
}
