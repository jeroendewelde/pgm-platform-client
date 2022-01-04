import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Admin/Header";
import LeftNavbar from "../../components/Admin/LeftNavbar";
import Topbar from "../../components/Admin/topbar/Topbar";
import Dashboard from "../../components/dashboard/Dashboard";


// AdminPanel.title = "Admin Panel!";
export default function AdminPanel() {
    return (
        <div className="container">
            {/* <Topbar /> */}
            <Head>
                <title>Admin Panel</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            {/* <h1>Admin Panel</h1>
            <Link href="/">
                <a>Go back to home</a>
            </Link>
            <LeftNavbar/> */}
            <Dashboard/>







            

        </div>
    )
    
}

// export default AdminPanel;