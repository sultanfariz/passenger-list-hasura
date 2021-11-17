import { gql } from "@apollo/client";

export const GET_PASSENGERS = gql`
    query GetPassengers {
        kampus_merdeka_passengers_aggregate(order_by: {id: asc}) {
            nodes {
            id
            name
            age
            sex
            }
        }
    }
`;

export const GET_PASSENGERS_BY_ID = gql`
    query GetPassengers($id: Int!) {
        kampus_merdeka_passengers(where: { id: { _eq: $id } }) {
            id
            name
            age
            sex
        }
    }
`;

export const POST_PASSENGER = gql`
    mutation PostPassenger($name: String!, $age: Int!, $sex: String!){
        insert_kampus_merdeka_passengers_one(object: {name: $name, age: $age, sex: $sex}){
                id
                name
                age
                sex
        }
    }
`;

export const UPDATE_PASSENGER = gql`
    mutation UpdatePassenger($id: Int!, $name: String!, $age: Int!, $sex: String!){
        update_kampus_merdeka_passengers_by_pk(pk_columns: { id: $id }, _set: { name: $name, age: $age, sex: $sex }){
            id
            name
            age
            sex
        }
    }
`;

export const DELETE_PASSENGER = gql`
    mutation DeletePassenger($id: Int!){
        delete_kampus_merdeka_passengers_by_pk(id: $id) {
            id
            name
            age
            sex
        }
    }
`;