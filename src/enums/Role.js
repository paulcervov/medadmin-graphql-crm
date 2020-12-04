import Enum from 'enum';

const Role = new Enum({
    Admin: 1,
    Manager: 2,
    Doctor: 3,
    Nurse: 4,
    Patient: 5,
});

const RoleLabel = new Map([
    [Role.Admin, 'Админ'],
    [Role.Manager, 'Менеджер'],
    [Role.Doctor, 'Доктор'],
    [Role.Nurse, 'Медсестра'],
    [Role.Patient, 'Пациент'],
]);

export {Role, RoleLabel};
