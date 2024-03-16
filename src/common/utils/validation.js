const validate = (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return errors;
  }
  return value;
};

export default validate;
