import React from 'react';
import {useFormik} from 'formik';
import * as Yup from '../../../yup';
import {Role, RoleLabel} from "../../../enums/Role";
import {Gender, GenderLabel} from "../../../enums/Gender";

function Form({getEmployerData, loading, error, handleSubmit, messages}) {

    const formik = useFormik({
        initialValues: {
            lastName: getEmployerData?.getEmployer?.lastName || '',
            firstName: getEmployerData?.getEmployer?.firstName || '',
            middleName: getEmployerData?.getEmployer?.middleName || '',
            phone: getEmployerData?.getEmployer?.phone || '',
            genderId: getEmployerData?.getEmployer?.genderId || '',
            dateOfBirth: getEmployerData?.getEmployer?.dateOfBirth || '',
            roleId: getEmployerData?.getEmployer?.roleId || '',
            percentage: getEmployerData?.getEmployer?.percentage || '',
        },
        validationSchema: Yup.object({
            lastName: Yup.string()
                .max(255)
                .required()
                .label('Фамилия'),
            firstName: Yup.string()
                .max(255)
                .required()
                .label('Имя'),
            middleName: Yup.string()
                .max(255)
                .required()
                .label('Отчество'),
            phone: Yup.string()
                .max(255)
                .required()
                .label('Телефон'),
            genderId: Yup.number()
                .oneOf(Gender.enums.map(gender => gender.value))
                .required()
                .label('Пол'),
            dateOfBirth: Yup.date()
                .min(new Date('1930'))
                .max(new Date())
                .required()
                .label('Дата рождения'),
            roleId: Yup.number()
                .oneOf(Role.enums.map(role => role.value))
                .required()
                .label('Роль'),
            percentage: Yup.number()
                .oneOf([10, 20, 30, 40, 50])
                .required()
                .label('Процент от услуги'),
        }),
        onSubmit: (values) => {
            handleSubmit({
                ...values,
                genderId: parseInt(values.genderId),
                roleId: parseInt(values.roleId),
                percentage: parseInt(values.percentage),
            })
        },
        enableReinitialize: true,
    });

    return (
        <>
            {!!messages.length && messages.map((message, index) => <div
                    key={index}
                    className={`alert alert-${message.type} alert-dismissible fade show`}
                >
                    {message.text}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}

            {loading && <div className="alert alert-secondary">Загрузка...</div>}

            {error && <div className="alert alert-danger">Ошибка!</div>}

            <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

                <h2 className="border-bottom pb-sm-2 mb-sm-4">{getEmployerData ? 'Редактирование сотрудника' : 'Новый сотрудник'}</h2>

                <form onSubmit={formik.handleSubmit}>

                    <div className="row mb-sm-3">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="roleId">Роль</label>
                                <select
                                    className={`form-control ${formik.touched.roleId && formik.errors.roleId ? 'is-invalid' : ''}`}
                                    id="roleId"
                                    {...formik.getFieldProps('roleId')}
                                >
                                    <option value="">Выберите роль</option>
                                    {Role.enums.map(role => <option value={role.value}
                                                                    key={role.value}>{RoleLabel.get(role)}</option>)}
                                </select>
                                {formik.touched.roleId && formik.errors.roleId ? (
                                    <span className="invalid-feedback">{formik.errors.roleId}</span>
                                ) : null}
                            </div>
                        </div>
                        {formik.values.roleId === Role.Doctor.value && (<div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="percentage">Роль</label>
                                <select
                                    className={`form-control ${formik.touched.percentage && formik.errors.percentage ? 'is-invalid' : ''}`}
                                    id="percentage"
                                    {...formik.getFieldProps('percentage')}
                                >
                                    <option value="">Выберите значение</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40}>40</option>
                                    <option value={50}>50</option>

                                </select>
                                {formik.touched.percentage && formik.errors.percentage ? (
                                    <span className="invalid-feedback">{formik.errors.percentage}</span>
                                ) : null}
                            </div>
                        </div>)}
                    </div>

                    <div className="row mb-sm-3">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="lastName">Фамилия</label>
                                <input
                                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                                    id="lastName"
                                    type="text"
                                    {...formik.getFieldProps('lastName')}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <span className="invalid-feedback">{formik.errors.lastName}</span>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="firstName">Имя</label>
                                <input
                                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                                    id="firstName"
                                    type="text"
                                    {...formik.getFieldProps('firstName')}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <span className="invalid-feedback">{formik.errors.firstName}</span>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="middleName">Отчество</label>
                                <input
                                    className={`form-control ${formik.touched.middleName && formik.errors.middleName ? 'is-invalid' : ''}`}
                                    id="middleName"
                                    type="text"
                                    {...formik.getFieldProps('middleName')}
                                />
                                {formik.touched.middleName && formik.errors.middleName ? (
                                    <span className="invalid-feedback">{formik.errors.middleName}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-sm-3">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input
                                    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                                    id="phone"
                                    type="text"
                                    {...formik.getFieldProps('phone')}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <span className="invalid-feedback">{formik.errors.phone}</span>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="genderId">Пол</label>
                                <select
                                    className={`form-control ${formik.touched.genderId && formik.errors.genderId ? 'is-invalid' : ''}`}
                                    id="genderId"
                                    {...formik.getFieldProps('genderId')}
                                >
                                    <option value="">Выберите пол</option>
                                    {Gender.enums.map(gender => <option value={gender.value}
                                                                        key={gender.value}>{GenderLabel.get(gender)}</option>)}
                                </select>
                                {formik.touched.genderId && formik.errors.genderId ? (
                                    <span className="invalid-feedback">{formik.errors.genderId}</span>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Дата рождения</label>
                                <input
                                    className={`form-control ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
                                    id="dateOfBirth"
                                    type="date"
                                    {...formik.getFieldProps('dateOfBirth')}
                                />
                                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                                    <span className="invalid-feedback">{formik.errors.dateOfBirth}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            </div>
        </>
    );
}

export default Form;
