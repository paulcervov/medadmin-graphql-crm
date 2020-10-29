import React from 'react';
import EmployerList from "../../components/Employer/List/List";

import {
    gql,
    useQuery
} from "@apollo/client";

const GET_EMPLOYERS = gql`
    query getEmployers($page: Int = 1, $trashed: Trashed = WITH) {
        getEmployers(page: $page, trashed: $trashed) {
            data {
                id
                last_name
                first_name
                middle_name
                email
                phone
                type
                percentage
                directions {
                    name
                }
                deleted_at
            }
            paginatorInfo {
                currentPage
                hasMorePages
            }
        }
    }
`;

function List() {
    const {data, loading, error, fetchMore} = useQuery(GET_EMPLOYERS);

    async function onClickLoadMore() {
        await fetchMore({
            variables: {
                page: data.getEmployers.paginatorInfo.currentPage + 1
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    getEmployers: {
                        data: [...prev.getEmployers.data, ...fetchMoreResult.getEmployers.data],
                        paginatorInfo: {...prev.getEmployers.paginatorInfo, ...fetchMoreResult.getEmployers.paginatorInfo},
                    }
                });
            }
        })
    }

    if (loading) {
        return <div className="alert alert-secondary">Загрузка...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Ошибка!</div>;
    }

    if (!data) {
        return <div className="alert alert-warning">Не найдено</div>;
    }


    return <EmployerList
        employers={data.getEmployers.data}
        onClickLoadMore={onClickLoadMore}
        canClickLoadMore={data.getEmployers.paginatorInfo.hasMorePages}
    />;
}

export default List;
