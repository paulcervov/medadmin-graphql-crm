import Enum from 'enum';

const Gender = new Enum({
    Male: 1,
    Female: 2,
});

const GenderLabel = new Map([
    [Gender.Male, 'Муж.'],
    [Gender.Female, 'Жен.'],
]);

export {Gender, GenderLabel};
