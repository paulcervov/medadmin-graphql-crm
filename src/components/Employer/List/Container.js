import React from 'react';
import {
    gql,
    useQuery
} from "@apollo/client";

import List from "./List";

const GET_USERS = gql`
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

function Container() {
    const {data, loading, error, fetchMore} = useQuery(GET_USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

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

    return (<div>
        <List
            employers={data.getEmployers.data}
            canLoadMore={data.getEmployers.paginatorInfo.hasMorePages}
            onClickLoadMore={onClickLoadMore}
        />
    </div>)
}

export default Container;
