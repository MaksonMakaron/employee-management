export const validateEmployee = (employee) => {
  let error = '';

  if (!employee.lastName) {
    error = 'Введите фамилию';
  } else if (/\d/.test(employee.lastName)) {
    error += '\nФамилия не должна содержать цифры';
  }

  if (!employee.firstName) {
    error += '\nВведите имя';
  } else if (/\d/.test(employee.firstName)) {
    error += '\nИмя не должно содержать цифры';
  }

  if (!employee.patronymic && /\d/.test(employee.patronymic)) {
    error += '\nОтчество не должно содержать цифры';
  }

  if (!employee.dateOfEmployment) {
    error += '\nВведите дату принятия на работу';
  } else if (new Date(employee.dateOfEmployment) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
    error += '\nДата принятия на работу не может быть позднее, чем через 7 дней';
  }

  if (!employee.idPost) {
    error += '\nВыберите должность';
  }

  return error;
};
