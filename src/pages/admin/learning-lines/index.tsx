import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { GET_ALL_LEARNINGLINES } from "../../../../graphql/learningLines";
import client from "../../../../apollo-client";
import { GET_ALL_COURSES } from "../../../../graphql/courses";
import Header from "../../../components/Admin/Header";
import LeftNavbar from "../../../components/Admin/LeftNavbar";
import Navigation from "../../../components/Admin/Navigation";
import Topbar from "../../../components/Admin/topbar/Topbar";
import Dashboard from "../../../components/dashboard/Dashboard";
import { tableColumns } from "../../../utils/constants";

// const colInfo = [
// 	{
// 		dataName: 'id',
// 		colName: 'id'
// 	},
// 	{
// 		dataName: 'name',
// 		colName: 'naam'
// 	},
// 	{
// 		dataName: 'color',
// 		colName: 'kleur'
// 	},
// ];


// AdminPanel.title = "Admin Panel!";
export default function AdminPanel({learningLines}: any) {
	// console.log(courses);
    return (
        <>
            <Head>
                <title>Admin Panel</title>
                {/* <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                /> */}
            </Head>
        <Container>
            <Navigation courses={learningLines} colInfo={tableColumns.learlingLines}/>
        </Container>
        </>
    )
    
}

const Container = styled.div`
    color: red;
  display: flex;
  background-color: #FFF;
  flex-direction: 'column';
  justify-content: 'center';
  align-items: 'center';
  height: 100vh;  
`;

// export default AdminPanel;

export async function getStaticProps() {
    const { data, error } = await client.query({
        query: GET_ALL_LEARNINGLINES
    });
	console.log('data....',data)

    if (error) {
        console.log(error);
    }

    return {
        props: {
            learningLines: data.learningLines,
        },
    };
}
