const agregarEspecialidad = (id) => {
  const yaExiste = form.especialidades.some((e) => e.id === id);
  if (!yaExiste) {
    setForm({
      ...form,
      especialidades: [...form.especialidades, { id, matricula: "", principal: false }]
    });
  }
};
