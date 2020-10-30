import React, {useState} from 'react';
import EmployerList from "../../components/Employer/List/List";
import {gql, useQuery} from "@apollo/client";

const FIND_EMPLOYERS = gql`
    query findEmployers($page: Int = 1, $searchQuery: String, $trashed: Trashed = WITHOUT) {
        findEmployers(page: $page, searchQuery: $searchQuery, trashed: $trashed) {
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
    const [searchQuery, setSearchQuery] = useState('');
    const {data, loading, error, fetchMore} = useQuery(FIND_EMPLOYERS, {
        variables: {
            trashed: 'WITH',
            searchQuery
        },
        pollInterval: (1000 * 60),
    });

    async function onClickLoadMore() {
        await fetchMore({
            variables: {
                page: data.findEmployers.paginatorInfo.currentPage + 1
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    findEmployers: {
                        data: [...prev.findEmployers.data, ...fetchMoreResult.findEmployers.data],
                        paginatorInfo: {...prev.findEmployers.paginatorInfo, ...fetchMoreResult.findEmployers.paginatorInfo},
                    }
                });
            }
        })
    }

    function onInputSearchQuery(event) {
        setSearchQuery(event.target.value);
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
        employers={data.findEmployers.data}
        onInputSearchQuery={onInputSearchQuery}
        searchQuery={searchQuery}
        onClickLoadMore={onClickLoadMore}
        canClickLoadMore={data.findEmployers.paginatorInfo.hasMorePages && !loading}
    />;
}

export default List;
